'use client';
import { useEffect, useRef, useState } from 'react';

const Hyperplexed = ({ onAnimationEnd = () => {} }) => {
  const h1Ref = useRef(null);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [isAnimating, setIsAnimating] = useState(true);
  const [backgroundVisible, setBackgroundVisible] = useState(true);
  const originalText = "WELCOME TO HACKERZ DASHBOARD";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      if (!h1Ref.current) return;

      h1Ref.current.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);

        setTimeout(() => {
          setIsAnimating(false);
          setTimeout(() => {
            setBackgroundVisible(false);
            onAnimationEnd();
          }, 1500);
        }, 1000);
      }

      iteration += 1 / 4;
    }, 80);

    return () => clearInterval(interval);
  }, [onAnimationEnd]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden transition-opacity duration-1500 ${
        backgroundVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url('/Loading.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center justify-center h-full w-full transition-opacity duration-1000">
        <h1
          ref={h1Ref}
          className={`font-mono text-gradient p-4 md:p-6 lg:p-8 xl:p-12 rounded-lg shadow-lg transition-transform duration-1000 ${
            isAnimating ? '' : 'animate-zoomOut'
          }`}
          style={{
            fontSize: 'clamp(2rem, 6vw, 8rem)',
            textAlign: 'center',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {originalText}
        </h1>
        <style jsx>{`
          .text-gradient {
            background: linear-gradient(90deg, rgba(218,218,218,1) 0%, rgba(61,61,61,1) 100%, rgba(0,212,255,1) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          @keyframes zoomOut {
            0% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            60% {
              opacity: 0.7;
              transform: scale(1.2) translateY(-20%);
            }
            100% {
              opacity: 0;
              transform: scale(1.5) translateY(-100%);
            }
          }
          .animate-zoomOut {
            animation: zoomOut 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Hyperplexed;
