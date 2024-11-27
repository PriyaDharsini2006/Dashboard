'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './Login.module.css';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleUserLogin = async () => {
      if (session?.user?.email) {
        try {
          // First, check user and get admin status
          const checkUserResponse = await fetch('/api/check-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({
              email: session.user.email,
            }),
          });

          const { isAdmin, redirect } = await checkUserResponse.json();

          // Update login count
          const updateCountResponse = await fetch('/api/update-login-count', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session.user.email,
            }),
          });

          if (!updateCountResponse.ok) {
            console.error('Failed to update login count');
          }

          // Continue with existing redirect logic
          setTimeout(() => {
            if (isAdmin) {
              router.push('/Navbar');
            } 

            
          }, 3000);

        } catch (error) {
          console.error('Error handling user data:', error);
          setError('An error occurred while processing your request.');
          
          

          setTimeout(() => {
            router.push('/Navbar');
          }, 1000);
        }
      } else {
        setIsProcessing(false);
      }
    };

    if (status === 'authenticated') {
      handleUserLogin();
    } else {
      setIsProcessing(false);
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
            {session && (
              <h1 className={`${styles.header} text-2xl font-grotesk text-center text-green-400`}>
                YOUR SIGN IN IS BEING PROCESSED PLEASE WAIT
              </h1>
            )}
            
            <div className="space-y-4 text-center">
              {!session && !isProcessing && (
                <>
                  <h1 className={`${styles.header} text-2xl font-grotesk text-center text-green-400`}>
                    USE COLLEGE MAIL ID
                  </h1>
                  <button 
                    onClick={() => signIn("google", { callbackUrl: "/Navbar" })} 
                    className="w-[200px] py-3 text-black text-xl bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Sign in with Google
                  </button>
                </>
              )}
              {error && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}