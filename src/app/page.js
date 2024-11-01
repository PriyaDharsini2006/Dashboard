'use client';
import { useEffect, useRef } from 'react';

const Hyperplexed = () => {
  const h1Ref = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval = null;

  useEffect(() => {
    const handleMouseOver = (event) => {
      let iteration = 0;
      const originalText = event.target.dataset.value; // Get the original text
      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = originalText
          .split("")
          .map((letter, index) => {
            // Flicker effect: display random letter for a moment
            if (index < iteration) {
              return originalText[index]; // Show the actual character
            }
            return letters[Math.floor(Math.random() * 26)]; // Show a random letter
          })
          .join("");

        // Increase iteration until we reveal the entire text
        if (iteration >= originalText.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3; // Adjust speed of revealing characters
      }, 30); // Adjust interval speed
    };

    const h1Element = h1Ref.current;
    h1Element.addEventListener('mouseover', handleMouseOver);

    return () => {
      h1Element.removeEventListener('mouseover', handleMouseOver);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <h1
        ref={h1Ref}
        data-value="WELCOME TO HACKERZ DASHBOARD"
        className="font-mono text-white text-[clamp(3rem,10vw,10rem)] p-[clamp(1rem,2vw,3rem)] rounded-[clamp(0.4rem,0.75vw,1rem)] shadow-lg hover:bg-white hover:text-black transition-colors duration-300"
      >
        WELCOME TO HACKERZ DASHBOARD
      </h1>

     
    </div>
  );
};

export default Hyperplexed;
