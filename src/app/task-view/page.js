'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ChevronRight, LogOut, Shield, Home, Folder, FileText } from 'lucide-react';
import Link from 'next/link';
import debounce from 'lodash.debounce';

const TaskView = () => {
  const [isRequestPageVisible, setRequestPageVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showMainContent, setShowMainContent] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredFolders, setFilteredFolders] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    fetchGroups();
  }, [session]);

  useEffect(() => {
    filterGroups();
  }, [searchQuery]);

  useEffect(() => {
    if (selectedGroup) {
      filterFolders();
    } else {
      setFilteredFolders([]);
    }
  }, [selectedGroup, searchQuery]);

  useEffect(() => {
    if (selectedFolder) {
      filterTasks();
    } else {
      setFilteredTasks([]);
    }
  }, [selectedFolder, searchQuery]);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
      setFilteredGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const filterGroups = debounce(() => {
    const lowerSearch = searchQuery.toLowerCase();
    const filtered = groups.filter(group =>
      group.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredGroups(filtered);
  }, 300);

  const filterFolders = debounce(() => {
    const lowerSearch = searchQuery.toLowerCase();
    const filtered = selectedGroup.folders?.filter(folder =>
      folder.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredFolders(filtered);
  }, 300);

  const filterTasks = debounce(() => {
    const lowerSearch = searchQuery.toLowerCase();
    const filtered = selectedFolder.tasks?.filter(task =>
      task.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredTasks(filtered);
  }, 300);

  const handleRequestOpen = () => {
    setRequestPageVisible(true);
    setShowMainContent(false);
    router.push('/login');
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setSelectedFolder(null);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="./Navbar" className="flex items-center">
              <Home className="h-6 w-6 text-gray-400" />
              <span className="ml-2 font-semibold text-gray-200">Task Manager</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button onClick={handleRequestOpen} className="bg-green-600 text-white px-4 py-2 rounded-md flex flex-row">
                <Shield className="mr-2 h-4 w-4 mt-1" />
                Admin Portal
              </button>
              <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded-md flex flex-row">
                <LogOut className="mr-2 h-4 w-4 mt-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Input */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <input
          type="text"
          placeholder="Search Groups, Folders, or Tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button
                onClick={handleBackToGroups}
                className="text-gray-400 hover:text-gray-200"
              >
                Groups
              </button>
            </li>
            {selectedGroup && (
              <>
                <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-500" />
                <li>
                  <button
                    onClick={handleBackToFolders}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    {selectedGroup.name}
                  </button>
                </li>
              </>
            )}
            {selectedFolder && (
              <>
                <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-500" />
                <li className="text-gray-200 font-medium">{selectedFolder.name}</li>
              </>
            )}
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {showMainContent && (
          <div>
            {!selectedGroup && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map(group => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className="bg-gray-800 rounded-lg p-6 shadow-sm text-left"
                  >
                    <Folder className="h-6 w-6 text-blue-500" />
                    <h3 className="text-gray-200">{group.name}</h3>
                    <p className="text-gray-400">{group.folders?.length || 0} folders</p>
                  </button>
                ))}
              </div>
            )}
            {selectedGroup && !selectedFolder && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFolders.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className="bg-gray-800 rounded-lg p-6 shadow-sm text-left"
                  >
                    <FileText className="h-6 w-6 text-blue-500" />
                    <h3 className="text-gray-200">{folder.name}</h3>
                    <p className="text-gray-400">{folder.tasks?.length || 0} tasks</p>
                  </button>
                ))}
              </div>
            )}
            {selectedFolder && (
              <div className="space-y-6">
                {filteredTasks.map(task => (
                  <div key={task.id} className="bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h3 className="text-gray-200">{task.name}</h3>
                    <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      View Link <ChevronRight />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskView;
