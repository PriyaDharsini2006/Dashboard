

// app/api/create-user/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request , Request) {
  try {
    const { email, name } = await request.json();
    
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}