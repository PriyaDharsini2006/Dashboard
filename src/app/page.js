'use client'
import { useState } from 'react';
import Hyperplexed from "./Hyperplexed";
import Navbar from './Navbar';

const Page = () => {
  const [showContent, setShowContent] = useState(false);

  const handleAnimationEnd = () => {
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <Hyperplexed onAnimationEnd={handleAnimationEnd} />
      <div 
        className={`transition-opacity duration-1000 
          ${showContent ? 'opacity-100' : 'opacity-0'}`}
      >
        <Navbar/>
        <h1 className='text-white text-center font-redhat text-4xl'>
        </h1>
      </div>
    </div>
  );
};

export default Page;  