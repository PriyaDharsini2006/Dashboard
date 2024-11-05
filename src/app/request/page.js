'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRequestPage({ onClose, onSuccess }) {
  const { data: session } = useSession();
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleAdminRequest = async () => {
    try {
      const response = await fetch('/api/request-admin-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session?.user?.email,
          name: session?.user?.name,
        }),
      });

      if (response.ok) {
        setMessage('Admin access request submitted successfully. Please wait for approval.');
        
        // Set a timeout to redirect after 5 seconds
        setTimeout(() => {
          onSuccess(); // Call the onSuccess callback to redirect back to TaskView
        }, 5000); // Redirect after 5000 milliseconds (5 seconds)

      } else {
        const { message } = await response.json();
        setMessage(message);
      }
    } catch (error) {
      console.error('Error handling admin access request:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Request Admin Access</h1>
        {session ? (
          <div className="space-y-4">
            <p className="text-center">Your email: <strong>{session.user.email}</strong></p>
            <button
              onClick={handleAdminRequest}
              className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
            >
              Request Admin Access
            </button>
            {message && <p className="text-green-500 text-center mt-2">{message}</p>}
          </div>
        ) : (
          <p className="text-center">Please sign in to request admin access.</p>
        )}
      </div>
      <button onClick={onClose} className="mt-4 text-gray-600 underline">
        Cancel
      </button>
    </div>
  );
}
