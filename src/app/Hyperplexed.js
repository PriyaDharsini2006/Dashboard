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

      iteration += 1;
    }, 80);

    return () => clearInterval(interval);
  }, [onAnimationEnd]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden transition-opacity duration-1500 ${
        backgroundVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center justify-center h-full transition-opacity duration-1000">
        <div className="hackerzContainer glitch-wrapper glitch">
          <img src="/NewHackerzWhite.png" alt="logo" loading="lazy" className="hackerz-logo" />
        </div>

        <h1
          ref={h1Ref}
          className={`font-redhat text-gradient p-4 md:p-6 lg:p-8 xl:p-12 rounded-lg transition-transform duration-1000 ${
            isAnimating ? '' : 'animate-zoomOut'
          }`}
          style={{
            fontSize: 'clamp(1rem, 4vw, 6rem)',
            textAlign: 'center',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            top: '-20px',
            margin: '20px 0',
            position: 'relative',
            fontFamily: "'Red Hat Display', sans-serif",
          }}
        >
          {originalText}
        </h1>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500;700&display=swap');

          .text-gradient {
            background: white;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-family: 'Red Hat Display', sans-serif;
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

          /* New Styles for Hackerz Container */
          .hackerzContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
          }

          .hackerz-logo {
            width: 800px;
            height: auto;
            margin-bottom: 20px;
          }

          .glitch-wrapper {
            position: relative;
            overflow: hidden;
            margin-top: 20px;
          }

          .glitch {
            position: relative;
            color: #fff;
            text-shadow: 
              2px 0 #ff3d00, 
              -2px 0 #ff3d00, 
              0 2px #00ff0e, 
              0 -2px #00ff0e;
            animation: glitch-animation 1s infinite;
          }

          @keyframes glitch-animation {
            0% { transform: translate(3px, 0); }
            20% { transform: translate(-3px, 3px); }
            40% { transform: translate(-2px, -3px); }
            60% { transform: translate(3px, 0); }
            80% { transform: translate(0, 3px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Hyperplexed;