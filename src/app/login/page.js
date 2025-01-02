'use client';

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './Login.module.css';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

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

          const { isAdmin } = await response.json();

          if (isAdmin) {
            router.push('/task');
          } else {
            setTimeout(() => {
              router.push('/task-view'); 
            }, 3000);
          }
        } catch (error) {
          console.error('Error handling user data:', error);
        }
      }
    };

    if (status === 'authenticated') {
      handleUserLogin();
    } else {
      setIsProcessing(false); 
    }
  }, [session, status, router]);

  // Common layout component for both states
  const PageLayout = ({ children }) => (
    <div className={styles.pageContainer}>
      <section className={styles.section}>
        {Array.from({ length: 625 }).map((_, index) => (
          <span key={index} className={styles.gridBox}></span>
        ))}
        <div className={styles.signin}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </section>
    </div>
  );

  if (status === "loading" || isProcessing) {
    return (
      <PageLayout>
        <h2 className={`${styles.header} text-2xl font-grotesk text-center text-green-400`}>
          Your sign in is being processed...
        </h2>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <h1 className={`${styles.header} text-2xl font-grotesk text-center text-green-400`}>
        USE COLLEGE MAIL ID
      </h1>
      <div className="space-y-4">
        {!session && (
          <button 
            onClick={() => signIn("google")} 
            className="w-[200px] py-3 text-black text-xl bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign in with Google
          </button>
        )}
      </div>
    </PageLayout>
  );
}