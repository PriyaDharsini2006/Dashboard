// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AdminRequestPage from '../request/page'; // Ensure the path is correct
// import { signOut, useSession } from 'next-auth/react'; // Import signOut and useSession from next-auth

// const TaskView = () => {
//   const [isRequestPageVisible, setRequestPageVisible] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false); // State to store admin status
//   const router = useRouter();
//   const [groups, setGroups] = useState([]);
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [selectedFolder, setSelectedFolder] = useState(null);
//   const [showMainContent, setShowMainContent] = useState(true); // State to control main content visibility
//   const { data: session } = useSession(); // Get session data from NextAuth

//   useEffect(() => {
//     if (session?.user?.email) {
//       checkIfUserIsAdmin(session.user.email); // Check if the user is an admin when session is available
//     }
//     fetchGroups();
//   }, [session]); // Re-run when session changes

//   // Check if the logged-in user is an admin
//   const checkIfUserIsAdmin = async (email) => {
//     try {
//       const response = await fetch(`/api/check-admin?email=${email}`);
//       const data = await response.json();
//       if (data.isAdmin) {
//         setIsAdmin(true); // User is an admin
//       }
//     } catch (error) {
//       console.error('Error checking admin status:', error);
//     }
//   };

//   const fetchGroups = async () => {
//     try {
//       const response = await fetch('/api/groups');
//       const data = await response.json();
//       setGroups(data);
//     } catch (error) {
//       console.error('Error fetching groups:', error);
//     }
//   };

//   const handleRequestOpen = () => {
//     setRequestPageVisible(true); // Open the request page
//     setShowMainContent(false); // Hide the main content
//     router.push('/task');
//   };

//   const handleClose = () => {
//     setRequestPageVisible(false); // Close the request page
//     setShowMainContent(true); // Show the main content again
//   };

//   const handleRedirect = () => {
//     setRequestPageVisible(false); // Close the request page
//     setShowMainContent(true); // Show the main content again
//     router.push('/task-view');
//   };

//   // Sign out handler
//   const handleSignOut = () => {
//     signOut({ callbackUrl: '/' }); // Redirect to login page after sign-out
//   };

//   return (
//     <>
//       {/* Show Admin Portal button only if the user is an admin */}
//       {isAdmin && !isRequestPageVisible && (
//         <div
//           className="fixed top-4 right-4 bg-green-500 text-white p-4 w-48 rounded-lg shadow-lg cursor-pointer animate-bounce"
//           title="Request Admin Access"
//           onClick={handleRequestOpen}
//         >
//           <p className="text-center font-semibold">ADMIN PORTAL</p>
//         </div>
//       )}

//       {/* Admin Request Page */}
//       {isRequestPageVisible && <AdminRequestPage onClose={handleClose} onSuccess={handleRedirect} />}

//       {/* Sign Out Button */}
//       <div className="fixed top-4 left-4 bg-red-500 text-white p-4 w-48 rounded-lg shadow-lg cursor-pointer animate-bounce" onClick={handleSignOut}>
//         <p className="text-center font-semibold">Sign Out</p>
//       </div>

//       <div className="p-8">
//         {showMainContent && (
//           <>
//             <h1 className="text-2xl font-bold">Task View</h1>
//             <p className="mt-2">View-only task details below.</p>

//             {/* Groups Section */}
//             <div className="w-64 bg-white shadow-lg text-gray-900 mt-4">
//               <div className="p-4">Groups</div>
//               <div className="space-y-2">
//                 {groups.map((group) => (
//                   <div
//                     key={group.id}
//                     className={`p-3 cursor-pointer hover:bg-gray-100 ${
//                       selectedGroup?.id === group.id ? 'bg-gray-200' : ''
//                     } flex justify-between items-center`}
//                     onClick={() => setSelectedGroup(group)}
//                   >
//                     <span>{group.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Folders Section */}
//             {selectedGroup && (
//               <div className="grid grid-cols-3 gap-4 mt-6">
//                 {selectedGroup.folders?.map((folder) => (
//                   <div
//                     key={folder.id}
//                     className={`p-4 bg-white rounded-lg shadow cursor-pointer ${
//                       selectedFolder?.id === folder.id ? 'ring-2 ring-blue-500' : ''
//                     } flex justify-between items-center`}
//                     onClick={() => setSelectedFolder(folder)}
//                   >
//                     <span>{folder.name}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Tasks Section */}
//             {selectedFolder && (
//               <div className="mt-8">
//                 <div className="space-y-4">
//                   {selectedFolder.tasks?.map((task) => (
//                     <div
//                       key={task.id}
//                       className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
//                     >
//                       <div>
//                         <h3 className="font-medium">{task.name}</h3>
//                         <a
//                           href={task.link}
//                           className="text-blue-500 hover:underline"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           View Link
//                         </a>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default TaskView;
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { ChevronRight, LogOut, Shield, Home, Folder, FileText } from 'lucide-react';
import login from '../login/page'
const TaskView = () => {
  const [isRequestPageVisible, setRequestPageVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showMainContent, setShowMainContent] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    
    fetchGroups();
  }, [session]);
  


  

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
                {groups.map((group) => (
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
                {selectedGroup.folders?.map((folder) => (
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
                {selectedFolder.tasks?.map((task) => (
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