import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(request, { params }) {
  try {
    const taskId = parseInt(params.taskId);
    
    // First check if task exists and get its relationships
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        folder: true,  // Include folder relationship if it exists
        // Add other relationships that might cause deletion constraints
      }
    });

    if (!task) {
      console.log(`Task ${taskId} not found`);
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    console.log(`Found task ${taskId} in folder ${task.folder?.id}`);

    try {
      // Attempt deletion with explicit error catching
      await prisma.task.delete({
        where: { id: taskId }
      });
      
      return NextResponse.json({ 
        success: true,
        message: 'Task deleted successfully'
      });

    } catch (deleteError) {
      // Log the specific delete error
      console.error('Specific delete error:', {
        code: deleteError.code,
        message: deleteError.message,
        meta: deleteError.meta
      });

      // Handle specific Prisma error codes
      switch (deleteError.code) {
        case 'P2025':
          return NextResponse.json(
            { error: 'Task no longer exists' },
            { status: 404 }
          );
        case 'P2003':
          return NextResponse.json(
            { error: 'Task cannot be deleted due to existing relationships' },
            { status: 400 }
          );
        default:
          throw deleteError; // Re-throw for general error handling
      }
    }

  } catch (error) {
    // Log detailed error information
    console.error('Error in task deletion:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack?.split('\n'),
      taskId: params.taskId
    });

    return NextResponse.json(
      { 
        error: 'Error deleting task',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}