import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const groupId = parseInt(params.groupId);

    // First delete all related tasks and folders
    // This assumes cascade deletion is not set up in the database
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        folders: {
          include: {
            tasks: true
          }
        }
      }
    });

    if (!group) {
      return NextResponse.json(
        { error: 'Group not found' },
        { status: 404 }
      );
    }

    // Delete all tasks in all folders
    for (const folder of group.folders) {
      await prisma.task.deleteMany({
        where: { folderId: folder.id }
      });
    }

    // Delete all folders in the group
    await prisma.folder.deleteMany({
      where: { groupId }
    });

    // Finally delete the group
    await prisma.group.delete({
      where: { id: groupId }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting group:', error);
    return NextResponse.json(
      { error: 'Error deleting group' },
      { status: 500 }
    );
  }
}