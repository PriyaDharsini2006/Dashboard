
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ChevronRight, LogOut, Shield, Home, Folder, FileText } from 'lucide-react';

const TaskView = () => {
  const [isRequestPageVisible, setRequestPageVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showMainContent, setShowMainContent] = useState(true);
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredFolders, setFilteredFolders] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, [session]);

  useEffect(() => {
    filterResults();
  }, [searchQuery, groups, selectedGroup]);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // Filter the groups, folders, and tasks based on the search query
  const filterResults = () => {
    const filteredGroups = groups.filter(group =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGroups(filteredGroups);

    if (selectedGroup) {
      const filteredFolders = selectedGroup.folders?.filter(folder =>
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFolders(filteredFolders);

      if (selectedFolder) {
        const filteredTasks = selectedFolder.tasks?.filter(task =>
          task.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filteredTasks);
      }
    }
  };

  const handleRequestOpen = () => {
    setRequestPageVisible(true);
    setShowMainContent(false);
    router.push('/login');
  };

  const handleClose = () => {
    setRequestPageVisible(false);
    setShowMainContent(true);
  };

  const handleRedirect = () => {
    setRequestPageVisible(false);
    setShowMainContent(true);
    router.push('/task-view');
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
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Home className="h-6 w-6 text-gray-500" />
              <span className="ml-2 font-semibold text-gray-900">Task Manager</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRequestOpen}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin Portal
              </button>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <input
          type="text"
          placeholder="Search Groups, Folders, or Tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button
                onClick={handleBackToGroups}
                className="text-gray-600 hover:text-gray-900"
              >
                Groups
              </button>
            </li>
            {selectedGroup && (
              <>
                <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
                <li>
                  <button
                    onClick={handleBackToFolders}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {selectedGroup.name}
                  </button>
                </li>
              </>
            )}
            {selectedFolder && (
              <>
                <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
                <li className="text-gray-900 font-medium">{selectedFolder.name}</li>
              </>
            )}
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showMainContent && (
          <div className="space-y-8">
            {/* Groups View */}
            {!selectedGroup && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredGroups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group)}
                    className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <Folder className="h-6 w-6 text-blue-500" />
                      <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {group.folders?.length || 0} folders
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* Folders View */}
            {selectedGroup && !selectedFolder && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder)}
                    className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-blue-500" />
                      <h3 className="text-lg font-medium text-gray-900">{folder.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {folder.tasks?.length || 0} tasks
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* Tasks View */}
            {selectedFolder && (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{task.name}</h3>
                    <div className="mt-4">
                      <a
                        href={task.link}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="underline">View Link</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
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
