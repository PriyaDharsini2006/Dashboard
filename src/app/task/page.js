'use client'
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, X, Menu, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-black/80 backdrop-blur-lg text-gray-200 rounded-lg p-6 w-full max-w-md relative border border-gray-800">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-200">
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-grotesk font-semibold mb-4">{title}</h2>
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
    <div className="relative z-50">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="text-[#00f5d0] mr-2"
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
            className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
          />
          <button type="submit" className="w-full px-4 py-2 bg-[#00f5d0] text-black rounded hover:bg-opacity-90">
            Update
          </button>
        </form>
      </Modal>
    </div>
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
    <div className="relative z-50">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="text-[#00f5d0] mr-2"
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
            className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
          />
          <button type="submit" className="w-full px-4 py-2 bg-[#00f5d0] text-black rounded hover:bg-opacity-90">
            Update
          </button>
        </form>
      </Modal>
    </div>
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
    <div className="relative z-50">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }} 
        className="text-[#00f5d0] ml-2"
      >
        Edit
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Update Task">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
          />
          <input
            type="url"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
          />
          <button type="submit" className="w-full px-4 py-2 bg-[#00f5d0] text-black rounded hover:bg-opacity-90">
            Update
          </button>
        </form>
      </Modal>
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
      <button className="w-[] flex items-center justify-center px-4 py-2 bg-[#00f5d0] text-black rounded hover:bg-[#00f5d0]-600" onClick={() => setIsOpen(true)}>
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
            className="w-full px-4 py-2 border rounded bg-gray-800 text-white"
          />
          <button type="submit" className="w-full px-4 py-2 bg-[#00f5d0] text-white rounded hover:bg-[#00f5d0]-600">Create</button>
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
      <button className="flex items-center justify-center px-4 py-2 bg-[#00f5d0] text-black rounded hover:bg-[#00f5d0]-600" onClick={() => setIsOpen(true)}>
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
          <button type="submit" className="w-full px-4 py-2 bg-[#00f5d0] text-white rounded hover:bg-[#00f5d0]-600">Create</button>
        </form>
      </Modal>
    </>
  );
};

const TaskManager = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    if (status === 'loading') return; // Wait for session check

    if (!session) {
      router.replace('/sign'); // Redirect to sign-in if no session
      return;
    }

    // Check for authorized email domain
    if (!session.user?.email?.endsWith('@citchennai.net')) {
      router.replace('/sign');
      return;
    }

    // If authenticated, fetch groups
    fetchGroups();
  }, [session, status, router]);
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
    }
  };

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

  const [filteredGroups, setFilteredGroups] = useState([]);
  const [folderSearchTerm, setFolderSearchTerm] = useState('');
  const [taskSearchTerm, setTaskSearchTerm] = useState('');

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredGroups(groups);
    } else {
      const filtered = groups.filter((group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGroups(filtered);
    }
  }, [searchTerm, groups]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFolderSearch = (e) => {
    setFolderSearchTerm(e.target.value);
  };
  const handleTaskSearch = (e) => {
    setTaskSearchTerm(e.target.value);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);


  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Header - visible on all screen sizes */}
      <div className="fixed top-0 w-full z-30 flex items-center justify-between p-4 bg-black/40 backdrop-blur-xl">
        <button
          onClick={toggleSidebar}
          className="p-3 hover:bg-white/10 rounded-xl transition-all lg:hidden"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="font-grotesk text-2xl font-bold text-[#00f5d0]">
          Task Administration
        </h1>
        <Link href="./task-view" className="p-3 bg-[#00f5d0] transition-all">
          <ChevronLeft size={24} className="text-black" />
        </Link>
      </div>
  
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] pt-16">
        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-0 z-20 bg-black/60 backdrop-blur-2xl
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:transform-none transition-transform duration-300 ease-in-out
          w-80 lg:w-96
        `}>
          <div className="h-full flex flex-col">
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Search groups..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-3.5 bg-white/5 backdrop-blur-xl rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f5d0]-500/50 transition-all"
              />
              <div className="flex items-center space-x-2">
                <AddItemDialog 
                  title="Add Group" 
                  onSubmit={handleAddGroup}
                  className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl font-grotesk text-lg"
                />
              </div>
            </div>
  
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3">
              {filteredGroups?.map(group => (
                <div
                key={group.id}
                className="p-4 rounded-xl cursor-pointer transition-all duration-200 relative"
                onClick={() => {
                  setSelectedGroup(group);
                  setSelectedFolder(null);
                  setTaskSearchTerm('');
                  setIsSidebarOpen(false);
                }}
              >
                  <div className="flex justify-between items-center relative z-40">
                    <span className="font-grotesk text-lg text-gray-200">{group.name}</span>
                    <div className="flex items-center gap-2">
                      <UpdateGroupDialog group={group} onUpdate={handleUpdateGroup} />
                      <button
                        className="p-2 hover:bg-white/10 rounded-xl transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteGroup(group.id, e);
                        }}
                      >
                        <Trash2 size={20} className="text-gray-400 hover:text-red-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-black p-6 lg:p-8">
          {selectedGroup && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search folders..."
                  value={folderSearchTerm}
                  onChange={handleFolderSearch}
                  className="flex-1 px-4 py-3.5 bg-white/5 backdrop-blur-xl rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00f5d0]500/50 transition-all"
                />
                <AddItemDialog 
                  title="Add Folder" 
                  onSubmit={handleAddFolder}
                   className="w-full sm:w-1/4 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl font-grotesk text-base whitespace-nowrap transition-all"
                />
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedGroup.folders
                  ?.filter(folder => folder.name.toLowerCase().includes(folderSearchTerm.toLowerCase()))
                  .map(folder => (
                    <div
                      key={folder.id}
                      className={`p-5 rounded-xl cursor-pointer transition-all duration-200 hover:transform hover:scale-[1.02]
                        ${selectedFolder?.id === folder.id 
                          ? 'bg-indigo-500/20 backdrop-blur-xl' 
                          : 'bg-white/5 hover:bg-white/10 backdrop-blur-xl'}
                      `}
                      onClick={() => setSelectedFolder(folder)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-grotesk text-lg text-gray-200">{folder.name}</span>
                        <div className="flex items-center gap-2">
                          <UpdateFolderDialog folder={folder} onUpdate={handleUpdateFolder} />
                          <button
                            className="p-2 hover:bg-white/10 rounded-xl transition-all"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFolder(folder.id, e);
                            }}
                          >
                            <Trash2 size={20} className="text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
  
  {selectedGroup && selectedFolder && (
            <div className="mt-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={taskSearchTerm}
                  onChange={handleTaskSearch}
                  className="flex-1 px-4 py-3.5 bg-white/5 backdrop-blur-xl rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all w-full sm:w-3/4"
                />
                <AddTaskDialog 
                  onSubmit={handleAddTask}
                  className="w-full sm:w-1/4 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl font-grotesk text-base whitespace-nowrap transition-all"
                />
              </div>
  
              <div className="space-y-4">
                {selectedFolder.tasks
                  ?.filter(task => task.name.toLowerCase().includes(taskSearchTerm.toLowerCase()))
                  .map(task => (
                    <div
  key={task.id}
  className="p-5 rounded-xl bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-200 relative"
>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-40">
                        <div className="space-y-2">
                          <h3 className="font-grotesk font-medium text-lg text-gray-200">
                            {task.name}
                          </h3>
                          <a
                            href={task.link}
                            className="text-[#00f5d0] hover:underline transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Link
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <UpdateTaskDialog task={task} onUpdate={handleUpdateTask} />
                          <button
                            className="p-2 hover:bg-white/10 rounded-xl transition-all"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Trash2 size={20} className="text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskManager;



