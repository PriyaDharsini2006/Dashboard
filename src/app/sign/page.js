'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './Login.module.css';

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const handleUserLogin = async () => {
      setIsProcessing(true);

      if (session?.user?.email) {
        try {
          if (!session.user.email.endsWith('@citchennai.net')) {
            setError('Access Denied, please use College Mail to Login');
            setAccessDenied(true);
            setIsProcessing(false);
            await signOut({ redirect: false });
            return;
          }

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

          setTimeout(() => {
            router.push('/Navbar');
          }, 3000);

        } catch (error) {
          console.error('Error handling user data:', error);
          setError('An error occurred while processing your request.');
          setIsProcessing(false);
        }
      } else {
        setIsProcessing(false);
      }
    };

    if (status === 'authenticated') {
      handleUserLogin();
    } else if (status === 'unauthenticated') {
      setIsProcessing(false);
    }
  }, [session, status, router]);

  if (status === "loading" || isProcessing) {
    return (
      <div className={styles.pageContainer}>
        <section className={styles.section}>
          {Array.from({ length: 625 }).map((_, index) => (
            <span key={index} className={styles.gridBox}></span>
          ))}
          <div className={styles.signin}>
            <div className={styles.content}>
              <h1 className={`${styles.header} text-2xl font-grotesk text-center text-green-400`}>
                YOUR SIGN IN IS BEING PROCESSED PLEASE WAIT
              </h1>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <section className={styles.section}>
        {Array.from({ length: 625 }).map((_, index) => (
          <span key={index} className={styles.gridBox}></span>
        ))}
        <div className={styles.signin}>
          <div className={styles.content}>
            <div className="space-y-4 text-center">
              {!session && (
                <>
                  <h1 className={`${styles.header} text-2xl font-grotesk text-center ${accessDenied ? 'text-red-500' : 'text-green-400'}`}>
                    {accessDenied ? 'Access Denied, please use College Mail to Login' : 'USE COLLEGE MAIL ID'}
                  </h1>
                  <button 
                    onClick={() => {
                      setAccessDenied(false);
                      setError(null);
                      signIn("google", { callbackUrl: "/Navbar" });
                    }}
                    className="w-[200px] py-3 text-black text-xl bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {accessDenied ? 'Login Again' : 'Sign in with Google'}
                  </button>
                </>
              )}
              {error && !accessDenied && <p className="text-red-500 text-center">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}