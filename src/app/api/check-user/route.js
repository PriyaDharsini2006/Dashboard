// // app/api/check-user/route.ts
// import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

// export async function POST(request, Request) {
//   try {
//     const { email } = await request.json();
    
//     const user = await prisma.user.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     return NextResponse.json({ exists: !!user });
//   } catch (error) {
//     return NextResponse.json({ error: 'Error checking user' }, { status: 500 });
//   }
// }
// app/api/check-user/route.ts
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

    if (admin) {
      return NextResponse.json({ isAdmin: true, redirect: '/task' });
    } else {
      // Check if user is a regular user
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        // Create a new user if they don't exist
        await prisma.user.create({
          data: {
            email: email,
            name: '',
          },
        });
      }

      return NextResponse.json({ isAdmin: false, redirect: '/task-view' });
    }
  } catch (error) {
    console.error('Error handling user data:', error);
    return NextResponse.json({ error: 'Error checking user' }, { status: 500 });
  }
}

