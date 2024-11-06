// src/app/api/tasks/route.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, link, folderId } = body

    if (!name || !link || !folderId) {
      return NextResponse.json(
        { error: 'Name, link, and folderId are required' },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        name,
        link,
        folderId: parseInt(folderId)
      }
    })

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}