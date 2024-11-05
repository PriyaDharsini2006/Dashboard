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

    // If there are no approved requests, respond accordingly
    if (approvedRequests.length === 0) {
      return NextResponse.json({ message: 'No approved requests found' }, { status: 404 });
    }

    // Loop over each approved request
    for (const request of approvedRequests) {
      // Create a new admin entry from the approved request
      await prisma.admin.create({
        data: {
          email: request.email,
          name: request.name,
        },
      });

      // Delete the corresponding request from the AdminRequest table
      await prisma.adminRequest.delete({
        where: { id: request.id },
      });
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
