// src/app/api/folders/route.js
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, groupId } = body

    if (!name || !groupId) {
      return NextResponse.json(
        { error: 'Name and groupId are required' },
        { status: 400 }
      )
    }

    const folder = await prisma.folder.create({
      data: {
        name,
        groupId: parseInt(groupId)
      },
      include: {
        tasks: true
      }
    })

    return NextResponse.json(folder)
  } catch (error) {
    console.error('Error creating folder:', error)
    return NextResponse.json(
      { error: 'Failed to create folder' },
      { status: 500 }
    )
  }
}