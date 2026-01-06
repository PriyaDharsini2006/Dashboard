// src/app/api/individual-task/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request) {
  try {
    const { email, tasks, deadlines, statuses } = await request.json()

    // Validate input
    if (!email || !tasks.length || tasks.length !== deadlines.length || tasks.length !== statuses.length) {
      return NextResponse.json({ message: 'Invalid input' }, { status: 400 })
    }

    // Create individual task
    const individualTask = await prisma.individualTask.create({
      data: {
        email,
        tasks,
        deadlines,
        statuses,
      },
    })

    return NextResponse.json(individualTask, { status: 201 })
  } catch (error) {
    console.error('Error creating individual task:', error)
    return NextResponse.json({ message: 'Failed to create task' }, { status: 500 })
  }
}