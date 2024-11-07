'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminRequestPage from '../request/page'; // Ensure the path is correct
import { signOut, useSession } from 'next-auth/react'; // Import signOut and useSession from next-auth

const TaskView = () => {
  const [isRequestPageVisible, setRequestPageVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to store admin status
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showMainContent, setShowMainContent] = useState(true); // State to control main content visibility
  const { data: session } = useSession(); // Get session data from NextAuth

  useEffect(() => {
    if (session?.user?.email) {
      checkIfUserIsAdmin(session.user.email); // Check if the user is an admin when session is available
    }
    fetchGroups();
  }, [session]); // Re-run when session changes

  // Check if the logged-in user is an admin
  const checkIfUserIsAdmin = async (email) => {
    try {
      const response = await fetch(`/api/check-admin?email=${email}`);
      const data = await response.json();
      if (data.isAdmin) {
        setIsAdmin(true); // User is an admin
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleRequestOpen = () => {
    setRequestPageVisible(true); // Open the request page
    setShowMainContent(false); // Hide the main content
    router.push('/task');
  };

  const handleClose = () => {
    setRequestPageVisible(false); // Close the request page
    setShowMainContent(true); // Show the main content again
  };

  const handleRedirect = () => {
    setRequestPageVisible(false); // Close the request page
    setShowMainContent(true); // Show the main content again
    router.push('/task-view');
  };

  // Sign out handler
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Redirect to login page after sign-out
  };

  return (
    <>
      {/* Show Admin Portal button only if the user is an admin */}
      {isAdmin && !isRequestPageVisible && (
        <div
          className="fixed top-4 right-4 bg-green-500 text-white p-4 w-48 rounded-lg shadow-lg cursor-pointer animate-bounce"
          title="Request Admin Access"
          onClick={handleRequestOpen}
        >
          <p className="text-center font-semibold">ADMIN PORTAL</p>
        </div>
      )}

      {/* Admin Request Page */}
      {isRequestPageVisible && <AdminRequestPage onClose={handleClose} onSuccess={handleRedirect} />}

      {/* Sign Out Button */}
      <div className="fixed top-4 left-4 bg-red-500 text-white p-4 w-48 rounded-lg shadow-lg cursor-pointer animate-bounce" onClick={handleSignOut}>
        <p className="text-center font-semibold">Sign Out</p>
      </div>

      <div className="p-8">
        {showMainContent && (
          <>
            <h1 className="text-2xl font-bold">Task View</h1>
            <p className="mt-2">View-only task details below.</p>

            {/* Groups Section */}
            <div className="w-64 bg-white shadow-lg text-gray-900 mt-4">
              <div className="p-4">Groups</div>
              <div className="space-y-2">
                {groups.map((group) => (
                  <div
                    key={group.id}
                    className={`p-3 cursor-pointer hover:bg-gray-100 ${
                      selectedGroup?.id === group.id ? 'bg-gray-200' : ''
                    } flex justify-between items-center`}
                    onClick={() => setSelectedGroup(group)}
                  >
                    <span>{group.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Folders Section */}
            {selectedGroup && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {selectedGroup.folders?.map((folder) => (
                  <div
                    key={folder.id}
                    className={`p-4 bg-white rounded-lg shadow cursor-pointer ${
                      selectedFolder?.id === folder.id ? 'ring-2 ring-blue-500' : ''
                    } flex justify-between items-center`}
                    onClick={() => setSelectedFolder(folder)}
                  >
                    <span>{folder.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tasks Section */}
            {selectedFolder && (
              <div className="mt-8">
                <div className="space-y-4">
                  {selectedFolder.tasks?.map((task) => (
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TaskView;
