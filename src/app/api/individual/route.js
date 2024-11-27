import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// GET individual tasks
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  const tasks = await prisma.individualTask.findMany({
    where: { email }  // Changed from name to email
  });

  return Response.json(tasks);
}

export async function POST(request) {
  const data = await request.json();

  const task = await prisma.individualTask.create({
    data: {
      email: data.email,  // Use email instead of name
      tasks: [data.task],
      statuses: [-1],  // Default to pending
      deadlines: [data.deadline]
    }
  });

  return Response.json(task);
}

// POST new individual task
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const data = await request.json();

  const task = await prisma.individualTask.create({
    data: {
      name: data.name,
      tasks: [data.task],
      statuses: [-1],  // Default to pending
      deadlines: [data.deadline]
    }
  });

  return Response.json(task);
}