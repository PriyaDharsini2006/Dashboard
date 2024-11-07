import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const groupId = parseInt(params.groupId);

    // Check if group exists along with its relationships (folders and tasks)
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        folders: {
          include: {
            tasks: true // Include tasks within folders
          }
        }
      }
    });

    if (!group) {
      console.log(`Group ${groupId} not found`);
      return NextResponse.json(
        { error: 'Group not found' },
        { status: 404 }
      );
    }

    console.log(`Found group ${groupId} with ${group.folders.length} folders`);

    // Attempt to delete all tasks inside the group’s folders
    for (const folder of group.folders) {
      console.log(`Deleting tasks in folder ${folder.id}`);
      await prisma.task.deleteMany({
        where: { folderId: folder.id }
      });
    }

    // Now delete all folders
    console.log(`Deleting folders for group ${groupId}`);
    await prisma.folder.deleteMany({
      where: { groupId }
    });

    // Finally delete the group
    console.log(`Deleting group ${groupId}`);
    await prisma.group.delete({
      where: { id: groupId }
    });

    return NextResponse.json({
      success: true,
      message: 'Group and related data deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting group:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack?.split('\n'),
      groupId: params.groupId
    });

    return NextResponse.json(
      { 
        error: 'Error deleting group',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const groupId = parseInt(params.groupId);
    const { name, description } = await request.json(); // Expecting these properties in the body

    // Check if the group exists
    const group = await prisma.group.findUnique({
      where: { id: groupId }
    });

    if (!group) {
      console.log(`Group ${groupId} not found`);
      return NextResponse.json(
        { error: 'Group not found' },
        { status: 404 }
      );
    }

    // Update the group properties
    const updatedGroup = await prisma.group.update({
      where: { id: groupId },
      data: {
        name: name || group.name,  // Keep existing values if not provided
        description: description || group.description // Keep existing values if not provided
      }
    });

    return NextResponse.json({
      success: true,
      updatedGroup
    });

  } catch (error) {
    console.error('Error updating group:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack?.split('\n'),
      groupId: params.groupId
    });

    return NextResponse.json(
      { 
        error: 'Error updating group',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
