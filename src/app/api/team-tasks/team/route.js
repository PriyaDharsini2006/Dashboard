import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// GET team tasks
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  const tasks = await prisma.teamTask.findMany({
    where: { 
      assignees: {
        has: email  // Check if email is in the assignees array
      }
    }
  });

  return Response.json(tasks);
}

// POST new team task
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const data = await request.json();

  const task = await prisma.teamTask.create({
    data: {
      teamName: data.teamName,
      tasks: data.tasks,
      assignees: data.assignees,
      statuses: Array(data.tasks.length).fill(-1),  // Default to pending
      deadlines: data.deadlines
    }
  });

  return Response.json(task);
}