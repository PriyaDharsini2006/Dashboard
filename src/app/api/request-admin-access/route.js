// app/api/request-admin-access/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request , Request) {
  try {
    const { email, name } = await request.json();

    const admin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (admin) {
      return NextResponse.json({ message: 'User is already an admin' }, { status: 400 });
    }

    await prisma.adminRequest.create({
      data: {
        email,
        name,
        approved: false,
      },
    });

    return NextResponse.json({ message: 'Admin access request submitted' });
  } catch (error) {
    console.error('Error handling admin access request:', error);
    return NextResponse.json({ message: 'Error submitting admin access request' }, { status: 500 });
  }
}