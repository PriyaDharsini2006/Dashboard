
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ChevronRight, LogOut, Shield, Home, Folder, FileText } from 'lucide-react';
import Link from 'next/link';
import debounce from 'lodash.debounce';

const TaskView = () => {
  // Session management
  const { data: session, status } = useSession();
  const router = useRouter();

  // State management
  const [isRequestPageVisible, setRequestPageVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showMainContent, setShowMainContent] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filteredFolders, setFilteredFolders] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Authentication check effect
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

  // Protected API call
  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups', {
        headers: {
          'Authorization': `Bearer ${session?.user?.id}` // Add auth header
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          router.replace('/sign');
          return;
        }
        throw new Error('Failed to fetch groups');
      }
      
      const data = await response.json();
      setGroups(data);
      setFilteredGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  // Search filtering effects
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
    // Check authentication before allowing admin access
    if (!session?.user?.email?.endsWith('@citchennai.net')) {
      router.push('/access-denied');
      return;
    }
    setRequestPageVisible(true);
    setShowMainContent(false);
    router.push('/login');
  };

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/sign',
        redirect: true
      });
    } catch (error) {
      console.error('Error signing out:', error);
      router.push('/sign');
    }
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setSelectedFolder(null);
  };

  const handleBackToFolders = () => {
    setSelectedFolder(null);
  };

  // Show loading state while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render content if not authenticated
  if (!session || !session.user?.email?.endsWith('@citchennai.net')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-30 bg-black backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/Navbar" className="flex items-center">
              <Home className="h-6 w-6 text-gray-400" />
              <span className="ml-2 font-grotesk text-xl font-bold text-[#00f5d0]">
                Task Manager
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleRequestOpen} 
                className="bg-[#00f5d0] font-grotesk text-black px-4 py-2 rounded-xl flex flex-row items-center hover:opacity-90 transition-all"
              >
                <Shield className="mr-2 h-4 w-4" />
                Admin Portal
              </button>
              <button 
                onClick={handleSignOut} 
                className="bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl flex flex-row items-center transition-all"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Input */}
      <div className="max-w-7xl mx-auto px-4 py-4 mt-16">
        <input
          type="text"
          placeholder="Search Groups, Folders, or Tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3.5 bg-white/5 backdrop-blur-xl rounded-xl text-gray-300 placeholder-gray-500 border border-[#00f5d0] focus:outline-none focus:ring-2 focus:ring-[#00f5d0] transition-all"
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <button
                onClick={handleBackToGroups}
                className="text-gray-400 hover:text-gray-200 transition-colors"
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
                    className="text-gray-400 hover:text-gray-200 transition-colors"
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
                    className="p-6 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-xl transition-all duration-200 text-left hover:transform hover:scale-[1.02]"
                  >
                    <Folder className="h-6 w-6 text-[#00f5d0]" />
                    <h3 className="mt-2 font-grotesk text-lg text-gray-200">{group.name}</h3>
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
                    className="p-6 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-xl transition-all duration-200 text-left hover:transform hover:scale-[1.02]"
                  >
                    <FileText className="h-6 w-6 text-[#00f5d0]" />
                    <h3 className="mt-2 font-grotesk text-lg text-gray-200">{folder.name}</h3>
                    <p className="text-gray-400">{folder.tasks?.length || 0} tasks</p>
                  </button>
                ))}
              </div>
            )}
            {selectedFolder && (
              <div className="space-y-4">
                {filteredTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="p-5 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    <h3 className="font-grotesk font-medium text-lg text-gray-200">{task.name}</h3>
                    <a 
                      href={task.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#00f5d0] hover:underline transition-colors inline-flex items-center mt-2"
                    >
                      View Link <ChevronRight className="ml-1 h-4 w-4" />
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