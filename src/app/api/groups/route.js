// src/app/api/groups/route.js

import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export async function GET() {
  try {
    const groups = await prisma.group.findMany({
      include: {
        folders: {
          include: {
            tasks: true,
          },
        },
      },
    })
    return NextResponse.json(groups)
  } catch (error) {
    console.error('Error fetching groups:', {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { error: 'Failed to fetch groups' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Valid name is required' },
        { status: 400 }
      )
    }

    const group = await prisma.group.create({
      data: { name },
      include: {
        folders: {
          include: {
            tasks: true,
          },
        },
      },
    })

    return NextResponse.json(group)
  } catch (error) {
    console.error('Error creating group:', {
      message: error.message,
      stack: error.stack,
    })
    return NextResponse.json(
      { error: 'Failed to create group' },
      { status: 500 }
    )
  }
}
