import { pool } from "@/lib/db";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    // Update the login count for the user
    const result = await pool.query(
      'UPDATE "User" SET count = COALESCE(count, 0) + 1 WHERE email = $1 RETURNING count',
      [email]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Login count updated successfully',
      newCount: result.rows[0].count
    });

  } catch (error) {
    console.error('Error updating login count:', error);
    return NextResponse.json(
      { error: 'Failed to update login count', details: error.message },
      { status: 500 }
    );
  }
}