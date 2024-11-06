// // // 'use client'

// // // import { useSession, signIn, signOut } from "next-auth/react";
// // // import { useRouter } from "next/navigation";
// // // import { useEffect } from "react";


// // // export default function Login() {
// // //   const { data: session, status } = useSession();
// // //   const router = useRouter()

// // //   useEffect(() => {
// // //     if (status === 'authenticated') {
// // //       // router.push('/')
// // //     }
// // //   }, [session, status, router])

// // //   if (status === "loading") {
// // //     return <p>Loading...</p>; // Show loading while session loads
// // //   }

// // //   if (session) {
// // //     return (
// // //       <div>
// // //         <p>Welcome, {session.user.name}</p>
// // //         <p>Email: {session.user.email}</p>
// // //         <button onClick={() => signOut()}>Sign out</button>
// // //       </div>
// // //     );
// // //   } else {
// // //     return (
// // //       <div>
// // //         <button onClick={() => signIn("google", { callbackUrl: '/' })}>Sign in with Google</button>
// // //       </div>
// // //     );
// // //   }
// // // }
// // 'use client';

// // import { useSession, signIn, signOut } from "next-auth/react";
// // import { useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import '../globals.css'; // Ensure to import your CSS file here

// // export default function Login() {
// //   const { data: session, status } = useSession();
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (status === 'loading') return; // Don't redirect while loading
// //     // if (status === 'authenticated') {
// //     //   // Navigate to the desired page after authentication
// //     //   router.push('/');
// //     // } else {
// //     //   // If not authenticated, you can keep the user on the login page
// //     //   // You can also display a message or prompt for sign-in if desired
// //     // }
// //   }, [status, router]);

// //   if (status === "loading") {
// //     return <p className="text-center text-white">Loading...</p>;
// //   }

// //   return (
// //     <section>
// //       {/* Grid of Animated Boxes */}
// //       {Array.from({ length: 625 }).map((_, index) => (
// //         <span key={index}></span>
// //       ))}
      

// //       {/* Sign-in Form */}
// //       <div className="signin">
// //         <div className="content">
          
// //           <h1 className="text-2xl font-bold text-center text-green-400">USE COLLEGE MAIL ID</h1>
// //           {session ? (
// //             <div className="text-center">
// //               <p className="text-lg text-white">Welcome, {session.user.name}</p>
// //               <p className="text-sm text-gray-500">{session.user.email}</p>
// //               <button 
// //                 onClick={() => signOut()} 
// //                 className="w-full py-2 mt-4 text-white bg-green-900 rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
// //               >
// //                 Sign out
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="space-y-4">
// //               <button 
// //                 onClick={() => signIn("google", { callbackUrl: '/' })} 
// //                 className="w-[200px] py-3 text-black  text-xl  bg-green-600  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
// //               >
// //                 Sign in with Google
// //               </button>
// //               </div>
// //           )}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }
// 'use client';

// import { useSession, signIn, signOut } from "next-auth/react";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import '../globals.css';

// // Create a new file named `/lib/prisma.ts` and add this code:
// // import { PrismaClient } from '@prisma/client'
// // const prisma = new PrismaClient()
// // export default prisma

// // Import the Prisma client
// import prisma from '@/lib/prisma';

// export default function Login() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const addUserToDatabase = async () => {
//       if (session?.user?.email) {
//         try {
//           // Check if user already exists
//           const existingUser = await fetch('/api/check-user', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               email: session.user.email,
//             }),
//           });

//           const { exists } = await existingUser.json();

//           if (!exists) {
//             // If user doesn't exist, create new user
//             const response = await fetch('/api/create-user', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 email: session.user.email,
//                 name: session.user.name || '',
//               }),
//             });

//             if (!response.ok) {
//               throw new Error('Failed to create user');
//             }
//           }

//           // Redirect to task-view page after successful authentication and database operation
//           router.push('/task-view');
//         } catch (error) {
//           console.error('Error handling user data:', error);
//           // Handle error appropriately
//         }
//       }
//     };

//     if (status === 'authenticated') {
//       addUserToDatabase();
//     }
//   }, [session, status, router]);

//   if (status === "loading") {
//     return <p className="text-center text-white">Loading...</p>;
//   }

//   return (
//     <section>
//       {/* Grid of Animated Boxes */}
//       {Array.from({ length: 625 }).map((_, index) => (
//         <span key={index}></span>
//       ))}

//       {/* Sign-in Form */}
//       <div className="signin">
//         <div className="content">
//           <h1 className="text-2xl font-bold text-center text-green-400">USE COLLEGE MAIL ID</h1>
//           {session ? (
//             <div className="text-center">
//               <p className="text-lg text-white">Welcome, {session.user.name}</p>
//               <p className="text-sm text-gray-500">{session.user.email}</p>
//               <button 
//                 onClick={() => signOut()} 
//                 className="w-full py-2 mt-4 text-white bg-green-900 rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 Sign out
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               <button 
//                 onClick={() => signIn("google")} 
//                 className="w-[200px] py-3 text-black text-xl bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 Sign in with Google
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import '../globals.css';

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
            // Redirect to the task page if the user is an admin
            router.push('/task');
          } else {
            // Redirect to the task-view page for regular users
            router.push(redirect);
          }
        } catch (error) {
          console.error('Error handling user data:', error);
          // Handle error appropriately
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
              {/* <button 
                onClick={() => signOut()} 
                className="w-full py-2 mt-4 text-white bg-green-900 rounded hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Sign out
              </button> */}
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
  );
}