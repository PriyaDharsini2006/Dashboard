import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Fetch all approved requests from the AdminRequest table
      const approvedRequests = await tx.AdminRequest.findMany({
        where: { approved: true },
      });

      if (approvedRequests.length === 0) {
        return {
          message: 'No approved requests found',
          count: 0,
        };
      }

      // Create array to store all operations
      const operations = approvedRequests.map(async (request) => {
        // Add to Admin table
        await tx.Admin.create({
          data: {
            email: request.email,
            name: request.name,
          },
        });

        // Delete from AdminRequest table
        await tx.AdminRequest.delete({
          where: { id: request.id },
        });
      });

      // Execute all operations
      await Promise.all(operations);

      return {
        message: 'Approved requests processed successfully',
        count: approvedRequests.length,
      };
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error processing approved requests:', error);
    return NextResponse.json(
      { message: 'Error processing approved requests', error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}