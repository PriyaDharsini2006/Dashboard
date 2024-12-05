// src/app/individual-task/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function IndividualTaskPage() {
  const [email, setEmail] = useState('')
  const [tasks, setTasks] = useState([])
  const [deadlines, setDeadlines] = useState([])
  const router = useRouter()

  const addTask = () => {
    setTasks([...tasks, ''])
    setDeadlines([...deadlines, ''])
  }

  const updateTask = (index, value) => {
    const newTasks = [...tasks]
    newTasks[index] = value
    setTasks(newTasks)
  }

  const updateDeadline = (index, value) => {
    const newDeadlines = [...deadlines]
    newDeadlines[index] = value
    setDeadlines(newDeadlines)
  }

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    const newDeadlines = deadlines.filter((_, i) => i !== index)
    setTasks(newTasks)
    setDeadlines(newDeadlines)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/individual-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tasks,
          deadlines,
          statuses: tasks.map(() => 0) // Initial status is 0 (not started)
        }),
      })

      if (response.ok) {
        router.push('/tasks')
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit tasks')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Create Individual Tasks</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        {tasks.map((task, index) => (
          <div key={index} className="mb-4 p-4 border rounded-md">
            <div className="mb-2">
              <label htmlFor={`task-${index}`} className="block mb-1">Task {index + 1}</label>
              <input
                type="text"
                id={`task-${index}`}
                value={task}
                onChange={(e) => updateTask(index, e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-2">
              <label htmlFor={`deadline-${index}`} className="block mb-1">Deadline</label>
              <input
                type="date"
                id={`deadline-${index}`}
                value={deadlines[index]}
                onChange={(e) => updateDeadline(index, e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="button"
              onClick={() => removeTask(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove Task
            </button>
          </div>
        ))}

        <div className="flex justify-between mb-4">
          <button
            type="button"
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Create Individual Tasks
        </button>
      </form>
    </div>
  )
}