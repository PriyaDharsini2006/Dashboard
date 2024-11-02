'use client'
import { useState, useEffect } from 'react';
import Hyperplexed from "./Hyperplexed";

const Page = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 4000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div>
      <Hyperplexed />
      {/* {showContent && (
        <div className="content">
          <h2>Welcome to the Main Content!</h2>
          <p>This content appears after the cinematic intro finishes.</p>
        </div>
      )} */}
    </div>
  );
};

export default Page;
