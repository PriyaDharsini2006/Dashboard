'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './Login.module.css'; // Import the CSS module

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

          if (isAdmin) {
            // If admin, redirect to access-granted page first
            setTimeout(() => {
              router.push('/acess-granted'); // Show access-granted page
              
              // After 5 seconds, redirect to the task page
              setTimeout(() => {
                router.push('/task'); // Redirect to task page
              }, 5000); // Delay for 5 seconds
            }, 1000); // Delay to show access-granted page
          } else {
            // If not admin, redirect to access-denied page immediately
            router.push('/acess-denied');
          }
        } catch (error) {
          console.error('Error handling user data:', error);
        }
      }
    };
    if (status === 'authenticated') {
      handleUserLogin();
    }
  }, [session, status, router]);

  if (status === "loading") {
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
            <h1 className={`${styles.header} text-2xl font-bold text-center text-green-400`}>USE COLLEGE MAIL ID</h1>
            
              <div className="space-y-4">
                <button 
                  onClick={() => signIn("google")} 
                  className="w-[200px] py-3 text-black text-xl bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Sign in with Google
                </button>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
