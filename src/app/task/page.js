// pages/task.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function TaskPage() {
  const router = useRouter();

  // Placeholder logic for checking if the user is authenticated
  const isAuthenticated = false; // Replace with actual auth logic

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Task Page</h1>
      <p className="mt-4">Welcome to the Task page! You are logged in.</p>
    </div>
  );
}
