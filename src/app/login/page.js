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
            router.push('/task');
          } else {
            router.push('/error');
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
            {session ? (
              <div className="text-center">
                <p className="text-lg text-white">Welcome, {session.user.name}</p>
                <p className="text-sm text-gray-500">{session.user.email}</p>
                <button 
                  onClick={() => signOut()} 
                  className="w-full py-2 mt-4 text-white bg-green-900 rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={() => signIn("google")} 
                  className="w-[200px] py-3 text-black text-xl bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Sign in with Google
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
