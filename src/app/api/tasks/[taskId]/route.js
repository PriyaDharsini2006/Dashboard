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

    // Attempt deletion with explicit error catching
    await prisma.task.delete({
      where: { id: taskId }
    });
    
    return NextResponse.json({ 
      success: true,
      message: 'Task deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting task:', {
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

export async function PUT(request, { params }) {
  try {
    const taskId = parseInt(params.taskId);
    const { name, description, dueDate } = await request.json(); // Expecting these properties in the body

    // Check if task exists
    const task = await prisma.task.findUnique({
      where: { id: taskId }
    });

    if (!task) {
      console.log(`Task ${taskId} not found`);
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Update the task properties
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        name: name || task.name, // Keep existing values if not provided
        description: description || task.description, // Keep existing values if not provided
        dueDate: dueDate || task.dueDate // Keep existing values if not provided
      }
    });

    return NextResponse.json({
      success: true,
      updatedTask
    });

  } catch (error) {
    console.error('Error updating task:', {
      error: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack?.split('\n'),
      taskId: params.taskId
    });

    return NextResponse.json(
      { 
        error: 'Error updating task',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
