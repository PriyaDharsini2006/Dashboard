import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany({
    select: { email: true }
  });

  return Response.json(users);
}