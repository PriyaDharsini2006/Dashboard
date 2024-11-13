import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Add error handling for database connection
    if (!pool) {
      console.error('Database connection not established');
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Modify query to handle null values and ensure proper type conversion
    const result = await pool.query(`
      SELECT COALESCE(SUM(count), 0) AS total_count 
      FROM "User"
      WHERE count IS NOT NULL
    `);

    const totalCount = parseInt(result.rows[0]?.total_count) || 0;

    return NextResponse.json({ totalCount });
  } catch (error) {
    console.error('Error fetching traffic count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch traffic count' },
      { status: 500 }
    );
  }
}