// // src/app/api/team-task/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'

// export async function POST(request) {
//   try {
//     const { teamName, tasks, assignees, deadlines, statuses } = await request.json()

//     // Validate input
//     if (!teamName || !tasks.length || 
//         tasks.length !== assignees.length || 
//         tasks.length !== deadlines.length || 
//         tasks.length !== statuses.length) {
//       return NextResponse.json({ message: 'Invalid input' }, { status: 400 })
//     }

//     // Create team task
//     const teamTask = await prisma.teamTask.create({
//       data: {
//         teamName,
//         tasks,
//         assignees,
//         deadlines,
//         statuses,
//       },
//     })

//     return NextResponse.json(teamTask, { status: 201 })
//   } catch (error) {
//     console.error('Error creating team task:', error)
//     return NextResponse.json({ message: 'Failed to create team task' }, { status: 500 })
//   }
// }
// src/app/api/team-task/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json()
    
    console.log('Received body:', JSON.stringify(body, null, 2))

    const { teamName, tasks, assignees, deadlines, statuses } = body

    // Detailed validation with specific error messages
    if (!teamName) {
      return NextResponse.json({ 
        message: 'Team name is required',
        details: { teamName, tasks, assignees, deadlines, statuses }
      }, { status: 400 })
    }

    if (!tasks || !Array.isArray(tasks) || tasks.length === 0) {
      return NextResponse.json({ 
        message: 'Tasks array is required and must not be empty',
        details: { teamName, tasks, assignees, deadlines, statuses }
      }, { status: 400 })
    }

    // Validate array lengths
    if (tasks.length !== assignees.length) {
      return NextResponse.json({ 
        message: 'Number of tasks must match number of assignees',
        details: { 
          taskCount: tasks.length, 
          assigneeCount: assignees.length 
        }
      }, { status: 400 })
    }

    if (tasks.length !== deadlines.length) {
      return NextResponse.json({ 
        message: 'Number of tasks must match number of deadlines',
        details: { 
          taskCount: tasks.length, 
          deadlineCount: deadlines.length 
        }
      }, { status: 400 })
    }

    if (tasks.length !== statuses.length) {
      return NextResponse.json({ 
        message: 'Number of tasks must match number of statuses',
        details: { 
          taskCount: tasks.length, 
          statusCount: statuses.length 
        }
      }, { status: 400 })
    }

    // Create team task
    const teamTask = await prisma.teamTask.create({
      data: {
        teamName,
        tasks,
        assignees,
        deadlines,
        statuses,
      },
    })

    return NextResponse.json(teamTask, { status: 201 })
  } catch (error) {
    console.error('Full error details:', error)

    // More detailed error response
    return NextResponse.json({ 
      message: 'Failed to create team task',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}