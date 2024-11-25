// app/api/checkAdmin/route.js
import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log('Admin check API called');
  
  try {
    // Log the incoming request
    const body = await request.json();
    console.log('Received request body:', body);
    
    const { email } = body;
    
    if (!email) {
      console.log('No email provided in request');
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Checking admin status for email:', email);

    // Test database connection first
    try {
      await pool.query('SELECT NOW()');
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection test failed:', dbError);
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Query the Admin table
    const query = 'SELECT EXISTS (SELECT 1 FROM "Admin" WHERE email = $1)';
    console.log('Executing query:', query, 'with email:', email);
    
    const result = await pool.query(query, [email]);
    console.log('Query result:', result.rows[0]);

    const isAdmin = result.rows[0].exists;
    console.log('Admin check result for', email, ':', isAdmin);

    return NextResponse.json({ isAdmin });
    
  } catch (error) {
    console.error('Detailed error in admin check:', {
      message: error.message,
      stack: error.stack,
      code: error.code, // PostgreSQL error code if it's a database error
      detail: error.detail // Additional PostgreSQL error details
    });

    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    );
  }
}