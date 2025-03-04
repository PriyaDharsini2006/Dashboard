import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const prisma = new PrismaClient();

async function processApprovedRequests() {
  try {
    const result = await prisma.$transaction(async (tx) => {
      const approvedRequests = await tx.AdminRequest.findMany({
        where: { approved: true },
      });

      if (approvedRequests.length === 0) {
        console.log('No approved requests found');
        return;
      }

      const operations = approvedRequests.map(async (request) => {
        await tx.Admin.create({
          data: {
            email: request.email,
            name: request.name,
          },
        });

        await tx.AdminRequest.delete({
          where: { id: request.id },
        });
      });

      await Promise.all(operations);

      console.log('Approved requests processed successfully');
    });

  } catch (error) {
    console.error('Error processing approved requests:', error);
  }
}

// Schedule the cron job to run every 10 seconds (adjust as needed)
cron.schedule('*/10 * * * * *', () => {
  console.log('Running background task to process approved requests');
  processApprovedRequests();
});

export async function POST() {
  return NextResponse.json({
    message: 'Processing of approved requests is scheduled to run automatically.',
  });
}
