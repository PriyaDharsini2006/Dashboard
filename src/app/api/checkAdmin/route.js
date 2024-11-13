// app/api/checkAdmin/route.js
import { pool } from '@/lib/db';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Query the Admin table to check if the email exists using the pool
    const query = 'SELECT EXISTS (SELECT 1 FROM "Admin" WHERE email = $1)';
    const result = await pool.query(query, [email]);

    const isAdmin = result.rows[0].exists;

    return new Response(JSON.stringify({ isAdmin }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    // No need to release the client since we're using a pool
  }
}