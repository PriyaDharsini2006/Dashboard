'use client'

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      // router.push('/')
    }
  }, [session, status, router])

  if (status === "loading") {
    return <p>Loading...</p>; // Show loading while session loads
  }

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => signIn("google", { callbackUrl: '/' })}>Sign in with Google</button>
      </div>
    );
  }
}
