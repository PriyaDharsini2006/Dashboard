// app/api/process-approved-requests/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Fetch all approved requests from the AdminRequest table
    const approvedRequests = await prisma.adminRequest.findMany({
      where: { approved: true },
    });

    if (approvedRequests.length === 0) {
      return NextResponse.json({ message: 'No approved requests found' });
    }

    // Loop over each approved request
    for (const request of approvedRequests) {
      // Add the approved request to the Admin table
      await prisma.admin.create({
        data: {
          email: request.email,
          name: request.name,
        },
      });

      // Delete the request from AdminRequest table after adding to Admin
    //   await prisma.adminRequest.delete({
    //     where: { id: request.id },
    //   });
    }

    return NextResponse.json({
      message: 'Approved requests processed successfully',
      count: approvedRequests.length,
    });
  } catch (error) {
    console.error('Error processing approved requests:', error);
    return NextResponse.json(
      { message: 'Error processing approved requests', error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Ensure the database connection is closed
  }
}
