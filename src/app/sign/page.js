// 'use client'

// import { useSession, signIn, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";


// export default function Login() {
//   const { data: session, status } = useSession();
//   const router = useRouter()

//   useEffect(() => {
//     if (status === 'authenticated') {
//       // router.push('/')
//     }
//   }, [session, status, router])

//   if (status === "loading") {
//     return <p>Loading...</p>; // Show loading while session loads
//   }

//   if (session) {
//     return (
//       <div>
//         <p>Welcome, {session.user.name}</p>
//         <p>Email: {session.user.email}</p>
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <button onClick={() => signIn("google", { callbackUrl: '/' })}>Sign in with Google</button>
//       </div>
//     );
//   }
// }
'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import '../globals.css'; // Ensure to import your CSS file here

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Don't redirect while loading
    // if (status === 'authenticated') {
    //   // Navigate to the desired page after authentication
    //   router.push('/');
    // } else {
    //   // If not authenticated, you can keep the user on the login page
    //   // You can also display a message or prompt for sign-in if desired
    // }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <section>
      {/* Grid of Animated Boxes */}
      {Array.from({ length: 625 }).map((_, index) => (
        <span key={index}></span>
      ))}
      

      {/* Sign-in Form */}
      <div className="signin">
        <div className="content">
          
          <h1 className="text-2xl font-bold text-center text-green-400">USE COLLEGE MAIL ID</h1>
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
                onClick={() => signIn("google", { callbackUrl: '/' })} 
                className="w-[200px] py-3 text-black  text-xl  bg-green-600  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign in with Google
              </button>
              </div>
          )}
        </div>
      </div>
    </section>
  );
}
