'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './Login.module.css'; // Import the CSS module

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true); // Track if user login is being processed

  useEffect(() => {
    const handleUserLogin = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/check-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session.user.email,
            }),
          });

          const { isAdmin, redirect } = await response.json();

          // Simulate a delay before redirecting to "access-granted"
          setTimeout(() => {
            if (isAdmin) {
              router.push('/access-granted');
            } else {
              router.push('/access-granted');
            }

            // After a brief delay, redirect back to normal page (e.g., /Navbar)
            setTimeout(() => {
              router.push('/Navbar'); // Redirect to your normal page
            }, 5000); // Delay before redirecting back (5 seconds)
          }, 5000); // Delay before showing the "access-granted" page (5 seconds)

        } catch (error) {
          console.error('Error handling user data:', error);
          setError('An error occurred while processing your request.');
          
          // If error occurs, redirect to access-denied page
          setTimeout(() => {
            router.push('/access-denied');
          }, 1000); // Delay before redirecting to access-denied (1 second)

          // After a brief period, redirect back to normal page (e.g., /Navbar)
          setTimeout(() => {
            router.push('/Navbar'); // Redirect to your normal page after error
          }, 3000); // Delay before redirecting back (3 seconds)
        }
      } else {
        setIsProcessing(false); // If user email is not present, allow sign-in
      }
    };

    if (status === 'authenticated') {
      handleUserLogin();
    } else {
      setIsProcessing(false); // Allow sign-in button if not authenticated
    }
  }, [session, status, router]);

  if (status === "loading" || isProcessing) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.section}>
        {Array.from({ length: 625 }).map((_, index) => (
          <span key={index} className={styles.gridBox}></span>
        ))}
        <div className={styles.signin}>
          <div className={styles.content}>
            <h1 className={`${styles.header} text-2xl font-bold text-center text-green-400`}>
              USE COLLEGE MAIL ID
            </h1>
            
            <div className="space-y-4">
              {!session && !isProcessing && (
                <button 
                  onClick={() => signIn("google", { callbackUrl: "/Navbar" })} 
                  className="w-[200px] py-3 text-black text-xl bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Sign in with Google
                </button>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
