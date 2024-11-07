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

const UpdateGroupDialog = ({ group, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(group?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(group.id, name);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }} 
        className="text-blue-500 mr-2"
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Update Group">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update
          </button>
        </form>
      </Modal>
    </>
  );
};

const UpdateFolderDialog = ({ folder, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(folder?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(folder.id, name);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }} 
        className="text-blue-500 mr-2"
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Update Folder">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Folder Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update
          </button>
        </form>
      </Modal>
    </>
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

const TaskManager = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setSelectedFolder(null); // Clear selected folder when switching groups
  };

  const handleUpdateGroup = async (groupId, name) => {
    try {
      // Optimistic update
      const updatedGroups = groups.map(group =>
        group.id === groupId ? { ...group, name } : group
      );
      setGroups(updatedGroups);
      
      if (selectedGroup?.id === groupId) {
        setSelectedGroup({ ...selectedGroup, name });
      }

      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      
      if (!response.ok) {
        // Revert on failure
        await fetchGroups();
      }
    } catch (error) {
      console.error('Error updating group:', error);
      await fetchGroups();
    }
  };

  const handleUpdateFolder = async (folderId, name) => {
    if (!selectedGroup) return;
    try {
      // Optimistic update
      const updatedGroup = {
        ...selectedGroup,
        folders: selectedGroup.folders.map(folder =>
          folder.id === folderId ? { ...folder, name } : folder
        )
      };
      
      setSelectedGroup(updatedGroup);
      setGroups(groups.map(group =>
        group.id === selectedGroup.id ? updatedGroup : group
      ));

      if (selectedFolder?.id === folderId) {
        setSelectedFolder({ ...selectedFolder, name });
      }

      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      
      if (!response.ok) {
        // Revert on failure
        await fetchGroups();
      }
    } catch (error) {
      console.error('Error updating folder:', error);
      await fetchGroups();
    }};
  
  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
      
      // Update selectedGroup with fresh data if one is selected
      if (selectedGroup) {
        const updatedSelectedGroup = data.find(group => group.id === selectedGroup.id);
        setSelectedGroup(updatedSelectedGroup);
        
        // Update selectedFolder with fresh data if one is selected
        if (selectedFolder && updatedSelectedGroup) {
          const updatedSelectedFolder = updatedSelectedGroup.folders.find(
            folder => folder.id === selectedFolder.id
          );
          setSelectedFolder(updatedSelectedFolder);
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setLoading(false);
    }
  };

  // Updated delete handlers with optimistic updates
  const handleDeleteGroup = async (groupId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this group?')) {
      try {
        // Optimistic update
        const updatedGroups = groups.filter(group => group.id !== groupId);
        setGroups(updatedGroups);
        
        if (selectedGroup?.id === groupId) {
          setSelectedGroup(null);
          setSelectedFolder(null);
        }

        const response = await fetch(`/api/groups/${groupId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          // Revert on failure
          await fetchGroups();
        }
      } catch (error) {
        console.error('Error deleting group:', error);
        await fetchGroups();
      }
    }
  };

  const handleDeleteFolder = async (folderId, e) => {
    e.stopPropagation();
    if (!selectedGroup) return;
    if (window.confirm('Are you sure you want to delete this folder?')) {
      try {
        // Optimistic update
        const updatedGroup = {
          ...selectedGroup,
          folders: selectedGroup.folders.filter(folder => folder.id !== folderId)
        };
        
        setSelectedGroup(updatedGroup);
        setGroups(groups.map(group => 
          group.id === selectedGroup.id ? updatedGroup : group
        ));

        if (selectedFolder?.id === folderId) {
          setSelectedFolder(null);
        }

        const response = await fetch(`/api/folders/${folderId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          // Revert on failure
          await fetchGroups();
        }
      } catch (error) {
        console.error('Error deleting folder:', error);
        await fetchGroups();
      }
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!selectedFolder) return;
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        // Optimistic update
        const updatedFolder = {
          ...selectedFolder,
          tasks: selectedFolder.tasks.filter(task => task.id !== taskId)
        };
        
        const updatedGroup = {
          ...selectedGroup,
          folders: selectedGroup.folders.map(folder =>
            folder.id === selectedFolder.id ? updatedFolder : folder
          )
        };
        
        setSelectedFolder(updatedFolder);
        setSelectedGroup(updatedGroup);
        setGroups(groups.map(group =>
          group.id === selectedGroup.id ? updatedGroup : group
        ));

        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          // Revert on failure
          await fetchGroups();
        }
      } catch (error) {
        console.error('Error deleting task:', error);
        await fetchGroups();
      }
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
        const newGroup = await response.json();
        setGroups([...groups, newGroup]);
      }
    } catch (error) {
      console.error('Error adding group:', error);
      await fetchGroups();
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
        const newFolder = await response.json();
        const updatedGroup = {
          ...selectedGroup,
          folders: [...(selectedGroup.folders || []), newFolder]
        };
        setSelectedGroup(updatedGroup);
        setGroups(groups.map(group =>
          group.id === selectedGroup.id ? updatedGroup : group
        ));
      }
    } catch (error) {
      console.error('Error adding folder:', error);
      await fetchGroups();
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
        const newTask = await response.json();
        const updatedFolder = {
          ...selectedFolder,
          tasks: [...(selectedFolder.tasks || []), newTask]
        };
        const updatedGroup = {
          ...selectedGroup,
          folders: selectedGroup.folders.map(folder =>
            folder.id === selectedFolder.id ? updatedFolder : folder
          )
        };
        setSelectedFolder(updatedFolder);
        setSelectedGroup(updatedGroup);
        setGroups(groups.map(group =>
          group.id === selectedGroup.id ? updatedGroup : group
        ));
      }
    } catch (error) {
      console.error('Error adding task:', error);
      await fetchGroups();
    }
  };

  const handleUpdateTask = async (taskId, name, link) => {
    try {
      // Optimistic update
      const updatedFolder = {
        ...selectedFolder,
        tasks: selectedFolder.tasks.map(task =>
          task.id === taskId ? { ...task, name, link } : task
        )
      };
      
      const updatedGroup = {
        ...selectedGroup,
        folders: selectedGroup.folders.map(folder =>
          folder.id === selectedFolder.id ? updatedFolder : folder
        )
      };
      
      setSelectedFolder(updatedFolder);
      setSelectedGroup(updatedGroup);
      setGroups(groups.map(group =>
        group.id === selectedGroup.id ? updatedGroup : group
      ));

      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, link })
      });
      
      if (!response.ok) {
        // Revert on failure
        await fetchGroups();
      }
    } catch (error) {
      console.error('Error updating task:', error);
      await fetchGroups();
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
              } flex justify-between items-center`}
              onClick={() => handleGroupSelect(group)}
            >
              <span>{group.name}</span>
              <div className="flex items-center">
                <UpdateGroupDialog
                  group={group}
                  onUpdate={handleUpdateGroup}
                />
                <button
                  className="text-gray-500 hover:text-red-500"
                  onClick={(e) => handleDeleteGroup(group.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
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
                  } flex justify-between items-center`}
                  onClick={() => setSelectedFolder(folder)}
                >
                  <span>{folder.name}</span>
                  <div className="flex items-center">
                    <UpdateFolderDialog
                      folder={folder}
                      onUpdate={handleUpdateFolder}
                    />
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={(e) => handleDeleteFolder(folder.id, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedGroup && selectedFolder && (
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
                    <UpdateTaskDialog
                      task={task}
                      onUpdate={handleUpdateTask}
                    />
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

export default TaskManager;



