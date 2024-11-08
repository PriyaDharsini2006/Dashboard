// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//   faClipboardList, 
//   faCog, 
//   faDatabase, 
//   faArrowUpRightFromSquare, 
//   faListCheck, 
//   faCheckCircle,
//   faHome,
// } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   const navLinks = [
//     { name: 'External OD', href: '#', icon: faArrowUpRightFromSquare },
//     { name: 'Internal OD', href: '#', icon: faClipboardList },
//     { name: 'Workspace', href: '#', icon: faCog },
//     { name: 'Database', href: '#', icon: faDatabase },
//   ];

//   const nav = [
//     { name: 'Tasks', href: '/task', icon: faListCheck },
//     { name: 'PR Mail', href: '#', icon: faCheckCircle },
//     { name: 'Treasury', href: 'https://hackerz-treasury.vercel.app', icon: faHome }, // Update here
//   ];

//   function calculateTimeLeft() {
//     const now = new Date();
//     const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
//     const difference = targetDate.getTime() - now.getTime();

//     if (difference < 0) {
//       return {
//         days: 0,
//         hours: 0,
//         minutes: 0,
//         seconds: 0
//       };
//     }

//     return {
//       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//       minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
//       seconds: Math.floor((difference % (1000 * 60)) / 1000)
//     };
//   }

//   useEffect(() => {
//     setTimeLeft(calculateTimeLeft());
//     const timer = setInterval(() => {
//       const newTimeLeft = calculateTimeLeft();
//       setTimeLeft(newTimeLeft);

//       if (Object.values(newTimeLeft).every(value => value === 0)) {
//         clearInterval(timer);
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleNavigation = (link) => {
//     if (link.name === 'Tasks' && !isAuthenticated) {
//       router.push('/task-view');
//     } else {
//       // For external links like Treasury, just open the link in a new tab
//       window.open(link.href, '_blank');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-black text-center p-10">
//       <div className="text-6xl text-white font-bold mb-8">DASHBOARD</div>

//       <div className="flex flex-col items-center mb-6">
//         <div className="flex flex-row p-4">
//           <h1 className="glitch text-5xl font-bold text-teal-400 mr-1">Count</h1>
//           <h1 className="glitch text-5xl font-bold text-red-300">Down</h1>
//         </div>

//         <div className="flex space-x-4 mt-4">
//           {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
//             <div key={unit} className="relative w-40 h-28 px-2 perspective">
//               <div className="flip-card-inner">
//                 <div className="flip-card-front bg-gray-800 text-teal-300 text-3xl font-bold flex justify-center items-center rounded-md">
//                   <span>{String(timeLeft[unit]).padStart(2, '0')}</span>
//                 </div>
//                 <div className="flip-card-back bg-gray-900 text-teal-300 text-3xl font-bold flex justify-center items-center rounded-md rotate-y-180">
//                   <span>{unit.charAt(0).toUpperCase() + unit.slice(1)} Left</span>
//                 </div>
//               </div>
//               <span className="text-white text-sm font-medium uppercase">{unit}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex w-full justify-center lg:justify-between">
//         <div className="text-xl pt-12 font-redhat relative">
//           <div className="font-semibold mb-2"></div>
//           <div className="font-semibold text-center mb-2"></div>
//           <div className='flex flex-1 space-x-80'>
//             <div className="flex flex-col item-center justify-center space-y-24">
//               {navLinks.map((link) => (
//                 <div key={link.name} className="relative w-full ">
//                   <button
//                     onClick={() => handleNavigation(link)}
//                     className="button w-full text-xl text-white bg-gray-800 transition-colors duration-200 rounded-md px-28 py-24 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-teal-400 flex items-center"
//                   >
//                     <FontAwesomeIcon icon={link.icon} className="mr-2 size-11" />
//                     {link.name}
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex flex-col  space-y-24">
//               {nav.map((link) => (
//                 <div key={link.name} className="relative w-full">
//                   <button
//                     onClick={() => handleNavigation(link)}
//                     className="button w-full text-xl text-white bg-gray-800 transition-colors duration-200 rounded-md px-28 py-24 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-teal-400 flex items-center"
//                   >
//                     <FontAwesomeIcon icon={link.icon} className="mr-2 size-11" />
//                     {link.name}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="text-xl font-redhat ">
//           <div className='flex flex-row justify-center space-x-96'>
//             <div className="font-semibold text-white mb-2">REFERENCE</div>
//             <div></div>
//           </div>
//           <p className="text-white">Add reference content here.</p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Navbar;
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClipboardList, 
  faCog, 
  faDatabase, 
  faArrowUpRightFromSquare, 
  faListCheck, 
  faCheckCircle,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const navLinks = [
    { name: 'External OD', href: '#', icon: faArrowUpRightFromSquare },
    { name: 'Internal OD', href: '#', icon: faClipboardList },
    { name: 'Workspace', href: '#', icon: faCog },
    { name: 'Database', href: '#', icon: faDatabase },
  ];

  const nav = [
    { name: 'Tasks', href: '/task', icon: faListCheck },
    { name: 'PR Mail', href: '#', icon: faCheckCircle },
    { name: 'Treasury', href: 'https://hackerz-treasury.vercel.app', icon: faHome },
  ];

  function calculateTimeLeft() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const difference = targetDate.getTime() - now.getTime();

    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (Object.values(newTimeLeft).every(value => value === 0)) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (link) => {
    if (link.name === 'Tasks' && !isAuthenticated) {
      router.push('/task-view');
    } else {
      window.open(link.href, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center bg-black  text-center p-4 md:p-6 lg:p-10">
      <div className="text-3xl md:text-4xl lg:text-6xl text-white font-serif font-bold mb-4 md:mb-6 lg:mb-8">DASHBOARD</div>

      <div className="flex flex-col items-center mb-4 md:mb-6">
        <div className="flex flex-row p-2 md:p-4">
          <h1 className="glitch text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-teal-400 mr-1">Count</h1>
          <h1 className="glitch text-3xl md:text-4xl lg:text-5xl font-bold font-serif text-red-300">Down</h1>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:space-x-4 mt-4">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="relative w-24 md:w-32 lg:w-40 h-20 md:h-24 lg:h-28 px-1 md:px-2 perspective">
              <div className="flip-card-inner">
                <div className="flip-card-front bg-gray-800 text-teal-300 text-xl md:text-2xl lg:text-3xl font-bold flex justify-center items-center rounded-md">
                  <span>{String(timeLeft[unit]).padStart(2, '0')}</span>
                </div>
                <div className="flip-card-back bg-gray-900 text-teal-300 text-xl md:text-2xl lg:text-3xl font-bold flex justify-center items-center rounded-md rotate-y-180">
                  <span className="text-sm md:text-base">{unit.charAt(0).toUpperCase() + unit.slice(1)} Left</span>
                </div>
              </div>
              <span className="text-white text-xs md:text-sm font-medium uppercase">{unit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full justify-center lg:justify-between gap-6">
        <div className="text-base md:text-lg lg:text-xl pt-4 md:pt-8 lg:pt-12 font-redhat relative">
          <div className="flex flex-col lg:flex-row gap-6 lg:space-x-6 xl:space-x-20 2xl:space-x-80">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 lg:gap-8 xl:gap-24">
              {navLinks.map((link) => (
                <div key={link.name} className="relative w-full">
                  <button
                    onClick={() => handleNavigation(link)}
                    className="button w-full text-base md:text-lg lg:text-xl text-white bg-gray-800 transition-colors duration-200 rounded-md p-4 md:p-6 lg:px-16 lg:py-12 xl:px-28 xl:py-24 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-teal-400 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={link.icon} className="mr-2 w-6 h-6 md:w-8 md:h-8 lg:size-11" />
                    <span className="whitespace-nowrap">{link.name}</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6 lg:gap-8 xl:gap-24">
              {nav.map((link) => (
                <div key={link.name} className="relative w-full">
                  <button
                    onClick={() => handleNavigation(link)}
                    className="button w-full text-base md:text-lg lg:text-xl text-white bg-gray-800 transition-colors duration-200 rounded-md p-4 md:p-6 lg:px-16 lg:py-12 xl:px-28 xl:py-24 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-teal-400 flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={link.icon} className="mr-2 w-6 h-6 md:w-8 md:h-8 lg:size-11" />
                    <span className="whitespace-nowrap">{link.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-base md:text-lg lg:text-xl font-redhat w-full lg:w-auto">
          <div className="text-center lg:text-left mb-2">
            <div className="font-bold font-serif text-white">REFERENCE</div>
            <p className="text-white">Add reference content here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;