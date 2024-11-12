import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const folderId = parseInt(params.folderId);

    if (isNaN(folderId)) {
      return NextResponse.json({ error: 'Invalid folder ID' }, { status: 400 });
    }

    // Check if folder exists along with its tasks
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
      include: {
        tasks: true, // Include tasks within the folder
      },
    });

    if (!folder) {
      console.log(`Folder ${folderId} not found`);
      return NextResponse.json(
        { error: 'Folder not found' },
        { status: 404 }
      );
    }

    console.log(`Found folder ${folderId} with ${folder.tasks.length} tasks`);

    // Delete tasks in the folder before deleting the folder itself
    await Promise.all(
      folder.tasks.map((task) =>
        prisma.task.delete({
          where: { id: task.id },
        })
      )
    );

    // Now delete the folder
    console.log(`Deleting folder ${folderId}`);
    await prisma.folder.delete({
      where: { id: folderId },
    });

    return NextResponse.json({
      success: true,
      message: 'Folder and related tasks deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting folder:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack?.split('\n'),
      folderId: params.folderId,
    });

    return NextResponse.json(
      {
        error: 'Error deleting folder',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const folderId = parseInt(params.folderId);

    if (isNaN(folderId)) {
      return NextResponse.json({ error: 'Invalid folder ID' }, { status: 400 });
    }

    const { name, description } = await request.json(); // Expecting these properties in the body

    // Check if the folder exists
    const folder = await prisma.folder.findUnique({
      where: { id: folderId },
    });

    if (!folder) {
      console.log(`Folder ${folderId} not found`);
      return NextResponse.json(
        { error: 'Folder not found' },
        { status: 404 }
      );
    }

    // Update the folder properties
    const updatedFolder = await prisma.folder.update({
      where: { id: folderId },
      data: {
        name: name || folder.name, // Keep existing values if not provided
        description: description || folder.description, // Keep existing values if not provided
      },
    });

    return NextResponse.json({
      success: true,
      updatedFolder,
    });
  } catch (error) {
    console.error('Error updating folder:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack?.split('\n'),
      folderId: params.folderId,
    });

    return NextResponse.json(
      {
        error: 'Error updating folder',
        details:
          process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
