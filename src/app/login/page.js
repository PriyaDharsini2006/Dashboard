// components/LoginForm.js
import React from 'react';

export default function LoginForm() {
  return (
    <section className="relative flex justify-center items-center w-screen h-screen bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-green-500 to-black animate-slide"></div>
      
      {/* Grid of spans for animated effect */}
      {[...Array(200)].map((_, i) => (
        <span key={i} className="relative block w-[6.25vw] h-[6.25vw] bg-[#181818] hover:bg-green-500 transition-colors duration-0"></span>
      ))}
      
      {/* Sign-in Form */}
      <div className="absolute w-96 bg-[#222] p-10 rounded-lg shadow-lg z-10">
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-2xl font-bold text-green-500 uppercase">Sign In</h2>
          
          <form className="flex flex-col gap-6 w-full">
            <div className="relative">
              <input type="text" required className="w-full bg-[#333] border-none outline-none py-4 px-2 rounded-lg text-white" />
              <i className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">Username</i>
            </div>
            
            <div className="relative">
              <input type="password" required className="w-full bg-[#333] border-none outline-none py-4 px-2 rounded-lg text-white" />
              <i className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">Password</i>
            </div>

            <div className="flex justify-between text-white">
              <a href="#" className="hover:underline">Forgot Password</a>
              <a href="#" className="text-green-500 font-semibold hover:underline">Signup</a>
            </div>

            <button type="submit" className="py-2 bg-green-500 text-black font-semibold rounded-lg text-lg">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}
