'use client'
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const TaskManager = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setLoading(false);
    }
  };
  const handleDeleteGroup = async (groupId) => {
    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };
  
  const handleDeleteFolder = async (folderId) => {
    if (!selectedGroup) return;
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (!selectedFolder) return;
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  const handleUpdateGroup = async (groupId, name) => {
    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error updating group:', error);
    }
  };
  
  const handleUpdateFolder = async (folderId, name) => {
    if (!selectedGroup) return;
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error updating folder:', error);
    }
  };
  
  const handleUpdateTask = async (taskId, name, link) => {
    if (!selectedFolder) return;
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, link }),
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddGroup = async (name) => {
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  const handleAddFolder = async (name) => {
    if (!selectedGroup) return;
    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, groupId: selectedGroup.id })
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error adding folder:', error);
    }
  };

  const handleAddTask = async (name, link) => {
    if (!selectedFolder) return;
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, link, folderId: selectedFolder.id })
      });
      if (response.ok) {
        fetchGroups();
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg text-gray-900">
        <div className="p-4">
          <AddItemDialog
            title="Add Group"
            onSubmit={handleAddGroup}
          />
        </div>
        <div className="space-y-2">
          {groups.map(group => (
            <div
              key={group.id}
              className={`p-3 cursor-pointer hover:bg-gray-100 ${
                selectedGroup?.id === group.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              {group.name}
            </div>
          ))}
         

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {selectedGroup && (
          <div>
            <div className="mb-4">
              <AddItemDialog
                title="Add Folder"
                onSubmit={handleAddFolder}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {selectedGroup.folders?.map(folder => (
                <div
                  key={folder.id}
                  className={`p-4 bg-white rounded-lg shadow cursor-pointer ${
                    selectedFolder?.id === folder.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedFolder(folder)}
                >
                  {folder.name}
                </div>
              ))}
              

            </div>
          </div>
        )}

        {selectedFolder && (
          <div className="mt-8">
            <div className="mb-4">
              <AddTaskDialog onSubmit={handleAddTask} />
            </div>
            <div className="space-y-4">
              {selectedFolder.tasks?.map(task => (
                <div
                  key={task.id}
                  className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{task.name}</h3>
                    <a
                      href={task.link}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Link
                    </a>
                  </div>
                  <button
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AddItemDialog = ({ title, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
    setIsOpen(false);
  };

  return (
    <>
      <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setIsOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {title}
      </button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
        </form>
      </Modal>
    </>
  );
};
const UpdateTaskDialog = ({ task, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(task?.name || '');
  const [link, setLink] = useState(task?.link || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task.id, name, link);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-blue-500 ml-2">Edit</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Update Task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="url"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Update</button>
        </form>
      </Modal>
    </>
  );
};


const AddTaskDialog = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, link);
    setName('');
    setLink('');
    setIsOpen(false);
  };

  return (
    <>
      <button className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setIsOpen(true)}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Task
      </button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="url"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create</button>
        </form>
      </Modal>
    </>
  );
};

export default TaskManager;
