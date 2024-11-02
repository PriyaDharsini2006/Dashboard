// 'use client';
// import { useEffect, useRef, useState } from 'react';

// const Hyperplexed = ({ onAnimationEnd = () => {} }) => {
//   const h1Ref = useRef(null);
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [backgroundVisible, setBackgroundVisible] = useState(true);
//   const originalText = "WELCOME TO HACKERZ DASHBOARD";

//   useEffect(() => {
//     let iteration = 0;
//     const interval = setInterval(() => {
//       if (!h1Ref.current) return;

//       h1Ref.current.innerText = originalText
//         .split("")
//         .map((letter, index) => {
//           if (index < iteration) return originalText[index];
//           return letters[Math.floor(Math.random() * 26)];
//         })
//         .join("");

//       if (iteration >= originalText.length) {
//         clearInterval(interval);

//         setTimeout(() => {
//           setIsAnimating(false);
//           setTimeout(() => {
//             setBackgroundVisible(false);
//             onAnimationEnd();
//           }, 1500);
//         }, 1000);
//       }

//       iteration += 1 ;
//     }, 80);

//     return () => clearInterval(interval);
//   }, [onAnimationEnd]);

//   return (
//     <div
//       className={`fixed inset-0 overflow-hidden transition-opacity duration-1500 ${
//         backgroundVisible ? 'opacity-100' : 'opacity-0'
//       }`}
//       style={{
//         // backgroundImage: `url('/Loading.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="flex flex-col items-center justify-center h-full w-full transition-opacity duration-1000">
//         <h1
//           ref={h1Ref}
//           className={`font-mono text-gradient p-4 md:p-6 lg:p-8 xl:p-12 rounded-lg shadow-lg transition-transform duration-1000 ${
//             isAnimating ? '' : 'animate-zoomOut'
//           }`}
//           style={{
//             fontSize: 'clamp(2rem, 6vw, 8rem)',
//             textAlign: 'center',
//             WebkitBackgroundClip: 'text',
//             color: 'transparent',
//           }}
//         >
//           {originalText}
//         </h1>
//         <style jsx>{`
//           .text-gradient {
//             background: linear-gradient(90deg, rgba(218,218,218,1) 0%, rgba(61,61,61,1) 100%, rgba(0,212,255,1) 100%);
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//           }
//           @keyframes zoomOut {
//             0% {
//               opacity: 1;
//               transform: scale(1) translateY(0);
//             }
//             60% {
//               opacity: 0.7;
//               transform: scale(1.2) translateY(-20%);
//             }
//             100% {
//               opacity: 0;
//               transform: scale(1.5) translateY(-100%);
//             }
//           }
//           .animate-zoomOut {
//             animation: zoomOut 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default Hyperplexed;
// 'use client';
// import { useEffect, useRef, useState } from 'react';

// const Hyperplexed = ({ onAnimationEnd = () => {} }) => {
//   const h1Ref = useRef(null);
//   const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [backgroundVisible, setBackgroundVisible] = useState(true);
//   const originalText = "WELCOME TO HACKERZ DASHBOARD";

//   useEffect(() => {
//     let iteration = 0;
//     const interval = setInterval(() => {
//       if (!h1Ref.current) return;

//       h1Ref.current.innerText = originalText
//         .split("")
//         .map((letter, index) => {
//           if (index < iteration) return originalText[index];
//           return letters[Math.floor(Math.random() * 26)];
//         })
//         .join("");

//       if (iteration >= originalText.length) {
//         clearInterval(interval);

//         setTimeout(() => {
//           setIsAnimating(false);
//           setTimeout(() => {
//             setBackgroundVisible(false);
//             onAnimationEnd();
//           }, 1500);
//         }, 1000);
//       }

//       iteration += 1;
//     }, 80);

//     return () => clearInterval(interval);
//   }, [onAnimationEnd]);

//   return (
//     <div
//       className={`fixed inset-0 overflow-hidden transition-opacity duration-1500 ${
//         backgroundVisible ? 'opacity-100' : 'opacity-0'
//       }`}
//       style={{
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     >
//       <div className="hackerzContainer flex flex-col items-center justify-center">
//           <img src="/hackerz.webp" alt="logo" loading="lazy" className="hackerz-logo" />
//         </div>

//       <div className="flex flex-col items-center justify-center h-full w-full transition-opacity duration-1000">
//         <h1
//           ref={h1Ref}
//           className={`font-mono text-gradient p-4 md:p-6 lg:p-8 xl:p-12 rounded-lg shadow-lg transition-transform duration-1000 ${
//             isAnimating ? '' : 'animate-zoomOut'
//           }`}
//           style={{
//             fontSize: 'clamp(2rem, 6vw, 8rem)',
//             textAlign: 'center',
//             WebkitBackgroundClip: 'text',
//             color: 'transparent',
//           }}
//         >
//           {originalText}
//         </h1>

//         {/* Hackerz Container with Image and Glitch Text */}
//         <div className="hackerzContainer">
//           <div className="glitch-wrapper">
//             <div className="glitch" data-text="HACKERZ">HACKERZ</div>
//           </div>
//         </div>

//         <style jsx>{`
//           .text-gradient {
//             background: linear-gradient(90deg, rgba(218,218,218,1) 0%, rgba(61,61,61,1) 100%, rgba(0,212,255,1) 100%);
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//           }
//           @keyframes zoomOut {
//             0% {
//               opacity: 1;
//               transform: scale(1) translateY(0);
//             }
//             60% {
//               opacity: 0.7;
//               transform: scale(1.2) translateY(-20%);
//             }
//             100% {
//               opacity: 0;
//               transform: scale(1.5) translateY(-100%);
//             }
//           }
//           .animate-zoomOut {
//             animation: zoomOut 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
//           }

//           /* New Styles for Hackerz Container */
//           .hackerzContainer {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             margin-top: 20px; /* Adjust as needed */
//           }

//           .hackerz-logo {
//             width: 150px; /* Adjust size as needed */
//             height: auto;
//             margin-bottom: 10px; /* Spacing between the logo and text */
//           }

//           .glitch-wrapper {
//             position: relative;
//             font-size: 3rem; /* Adjust font size as needed */
//             color: #00d4ff; /* Glitch text color */
//             overflow: hidden;
//           }

//           .glitch {
//             position: relative;
//             color: #fff; /* Glitch text color */
//             text-shadow: 
//               1px 0 #ff3d00, 
//               -1px 0 #ff3d00, 
//               0 1px #00ff0e, 
//               0 -1px #00ff0e; /* Glitch effect shadows */
//             animation: glitch-animation 1.5s infinite;
//           }

//           @keyframes glitch-animation {
//             0% { transform: translate(2px, 0); }
//             20% { transform: translate(-2px, 2px); }
//             40% { transform: translate(-2px, -2px); }
//             60% { transform: translate(2px, 0); }
//             80% { transform: translate(0, 2px); }
//             100% { transform: translate(0, 0); }
//           }
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default Hyperplexed;
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
        {/* Hackerz Container with Image */}
        <div className="hackerzContainer">
          <img src="/hackerz.webp" alt="logo" loading="lazy" className="hackerz-logo" />
        </div>

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
            margin: '20px 0', // Add margin to separate from logo
          }}
        >
          {originalText}
        </h1>

        {/* Glitch Text */}
        <div className="glitch-wrapper">
          <div className="glitch" data-text="HACKERZ">HACKERZ</div>
        </div>

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

          /* New Styles for Hackerz Container */
          .hackerzContainer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px; /* Adjust as needed */
          }

          .hackerz-logo {
            width: 300px; /* Increased size for logo */
            height: auto;
            margin-bottom: 20px; /* Spacing between the logo and main text */
          }

          .glitch-wrapper {
            position: relative;
            font-size: 6rem; /* Increased font size for glitch text */
            color: #00d4ff; /* Glitch text color */
            overflow: hidden;
            margin-top: 20px; /* Adjust spacing as needed */
          }

          .glitch {
            position: relative;
            color: #fff; /* Glitch text color */
            text-shadow: 
              1px 0 #ff3d00, 
              -1px 0 #ff3d00, 
              0 1px #00ff0e, 
              0 -1px #00ff0e; /* Glitch effect shadows */
            animation: glitch-animation 1.5s infinite;
          }

          @keyframes glitch-animation {
            0% { transform: translate(2px, 0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 0); }
            80% { transform: translate(0, 2px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Hyperplexed;
