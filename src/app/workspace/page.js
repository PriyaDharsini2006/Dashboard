'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function TasksPage() {
  const { data: session } = useSession();
  const [individualTasks, setIndividualTasks] = useState([]);
  const [teamTasks, setTeamTasks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    task: '',
    deadline: new Date().toISOString().split('T')[0],
    assignedTo: ''
  });
  const [teamTask, setTeamTask] = useState({
    teamName: '',
    task: '',
    assignees: [],
    deadline: new Date().toISOString().split('T')[0]
  });

  // Fetch tasks and users on component mount
  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.email) return;

      try {
        // Fetch individual tasks for the current user's email
        const individualResponse = await fetch(`/api/tasks/individual?email=${session.user.email}`);
        const individualData = await individualResponse.json();
        setIndividualTasks(individualData);

        // Fetch team tasks where the current user's email is in assignees
        const teamResponse = await fetch(`/api/tasks/team?email=${session.user.email}`);
        const teamData = await teamResponse.json();
        setTeamTasks(teamData);

        // Fetch all users (emails)
        const usersResponse = await fetch('/api/users');
        const usersData = await usersResponse.json();
        setAllUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [session]);

  // Update task status handler
  const updateTaskStatus = async (taskId, isIndividual, newStatus) => {
    try {
      const endpoint = isIndividual 
        ? `/api/tasks/individual/${taskId}` 
        : `/api/tasks/team/${taskId}`;
      
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Refresh tasks after update
        await fetchData();
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Add individual task handler
  const handleAddIndividualTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks/individual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newTask.assignedTo || session.user.email, // Use assigned email or current user's email
          task: newTask.task,
          deadline: newTask.deadline
        })
      });

      if (response.ok) {
        // Reset form and refresh tasks
        setNewTask({ task: '', deadline: new Date().toISOString().split('T')[0], assignedTo: '' });
        await fetchData();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Add team task handler
  const handleAddTeamTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamName: teamTask.teamName,
          tasks: [teamTask.task],
          assignees: teamTask.assignees,
          deadlines: [teamTask.deadline]
        })
      });

      if (response.ok) {
        // Reset form and refresh tasks
        setTeamTask({ 
          teamName: '', 
          task: '', 
          assignees: [], 
          deadline: new Date().toISOString().split('T')[0] 
        });
        await fetchData();
      }
    } catch (error) {
      console.error('Error adding team task:', error);
    }
  };

  // Helper function to get status label
  const getStatusLabel = (status) => {
    switch(status) {
      case -1: return 'Pending';
      case 0: return 'In Progress';
      case 1: return 'Completed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Individual Tasks Section */}
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <h2 className="text-xl font-semibold mb-2">My Individual Tasks</h2>
        {individualTasks.length === 0 ? (
          <p>No individual tasks found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Task</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {individualTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border p-2">{task.tasks[0]}</td>
                  <td className="border p-2">{getStatusLabel(task.statuses[0])}</td>
                  <td className="border p-2">{new Date(task.deadlines[0]).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <select 
                      value={task.statuses[0]} 
                      onChange={(e) => updateTaskStatus(task.id, true, parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    >
                      <option value="-1">Pending</option>
                      <option value="0">In Progress</option>
                      <option value="1">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Individual Task Section */}
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <h2 className="text-xl font-semibold mb-2">Add Individual Task</h2>
        <form onSubmit={handleAddIndividualTask} className="space-y-2">
          <input 
            type="text"
            placeholder="Task Description"
            value={newTask.task}
            onChange={(e) => setNewTask({...newTask, task: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input 
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <select 
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">Assign to (optional)</option>
            {allUsers.map(user => (
              <option key={user.email} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
      </div>

      {/* Team Tasks Section */}
      <div className="bg-white shadow-md rounded-lg mb-4 p-4">
        <h2 className="text-xl font-semibold mb-2">Team Tasks</h2>
        {teamTasks.length === 0 ? (
          <p>No team tasks found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Team</th>
                <th className="border p-2">Task</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Deadline</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="border p-2">{task.teamName}</td>
                  <td className="border p-2">{task.tasks[0]}</td>
                  <td className="border p-2">{getStatusLabel(task.statuses[0])}</td>
                  <td className="border p-2">{new Date(task.deadlines[0]).toLocaleDateString()}</td>
                  <td className="border p-2">
                    <select 
                      value={task.statuses[0]} 
                      onChange={(e) => updateTaskStatus(task.id, false, parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    >
                      <option value="-1">Pending</option>
                      <option value="0">In Progress</option>
                      <option value="1">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Team Task Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Create Team Task</h2>
        <form onSubmit={handleAddTeamTask} className="space-y-2">
          <input 
            type="text"
            placeholder="Team Name"
            value={teamTask.teamName}
            onChange={(e) => setTeamTask({...teamTask, teamName: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input 
            type="text"
            placeholder="Task Description"
            value={teamTask.task}
            onChange={(e) => setTeamTask({...teamTask, task: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <select 
            multiple
            value={teamTask.assignees}
            onChange={(e) => {
              const selectedUsers = Array.from(e.target.selectedOptions, option => option.value);
              setTeamTask({...teamTask, assignees: selectedUsers});
            }}
            className="w-full p-2 border rounded h-24"
            required
          >
            {allUsers.map(user => (
              <option key={user.email} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
          <input 
            type="date"
            value={teamTask.deadline}
            onChange={(e) => setTeamTask({...teamTask, deadline: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Create Team Task
          </button>
        </form>
      </div>
    </div>
  );
}