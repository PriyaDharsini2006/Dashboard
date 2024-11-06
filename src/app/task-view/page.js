// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import AdminRequestPage from '../request/page'; // Ensure the path is correct

// const AdminRequestBox = ({ onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="fixed top-4 right-4 bg-blue-500 text-white p-4 w-48 rounded-lg shadow-lg cursor-pointer animate-bounce"
//       title="Request Admin Access"
//     >
//       <p className="text-center font-semibold">Request Admin Access</p>
//     </div>
//   );
// };

// export default function TaskView() {
//   const [isRequestPageVisible, setRequestPageVisible] = useState(false);
//   const router = useRouter();

//   const handleRequestOpen = () => {
//     setRequestPageVisible(true);
//   };

//   const handleClose = () => {
//     setRequestPageVisible(false);
//   };

//   const handleRedirect = () => {
//     setRequestPageVisible(false);
//     router.push('/task-view'); // Ensure this matches your route
//   };

//   return (
//     <>
//       <AdminRequestBox onClick={handleRequestOpen} />
//       <div className="p-8">
//         <h1 className="text-2xl font-bold">Hello</h1>
//         <p className="mt-2">This is the main content of the task view page.</p>

//         {/* Render Admin Request Page when triggered */}
//         {isRequestPageVisible && (
//           <AdminRequestPage onClose={handleClose} onSuccess={handleRedirect} />
//         )}
//       </div>
//     </>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminRequestPage from '../request/page'; // Ensure the path is correct

export default function TaskView() {
  const [isRequestPageVisible, setRequestPageVisible] = useState(false);
  const router = useRouter();
  const [showMainContent, setShowMainContent] = useState(true); // State to control main content visibility

  const handleRequestOpen = () => {
    setRequestPageVisible(true); // Open the request page
    setShowMainContent(false);
    router.push('/sign'); // Hide the main content
  };

  const handleClose = () => {
    setRequestPageVisible(false); // Close the request page
  };

  const handleRedirect = () => {
    setRequestPageVisible(false); // Close the request page
    setShowMainContent(true); // Show the main content again after redirection
    router.push('/task-view'); // Redirect to task-view
  };

  return (
    <>
      {!isRequestPageVisible ? ( // Show the request button if the request page is not visible
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 w-48 rounded-lg shadow-lg cursor-pointer animate-bounce" title="Request Admin Access" onClick={handleRequestOpen}>
          <p className="text-center font-semibold">Request Admin Access</p>
        </div>
      ) : (
        <AdminRequestPage onClose={handleClose} onSuccess={handleRedirect} /> // Render Admin Request Page
      )}
      <div className="p-8">
        {showMainContent && ( // Show main content only if showMainContent is true
          <>
            <h1 className="text-2xl font-bold">Hello</h1>
            <p className="mt-2">This is the main content of the task view page.</p>
          </>
        )}
      </div>
    </>
  );
}
