// app/api/check-admin-access/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request , Request) {
  try {
    const { email } = await request.json();

    // Check if user is an admin
    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    return NextResponse.json({ isAdmin: !!admin });
  } catch (error) {
    console.error('Error checking admin access:', error);
    return NextResponse.json({ error: 'Error checking admin access' }, { status: 500 });
  }
}