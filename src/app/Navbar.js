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
//   faHome,// Replace with a valid icon if needed
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
//     { name: 'PR Mail', href: '#', icon: faCheckCircle }, // Use a valid icon here
//     { name: 'Treasury', href: '#', icon: faHome }, // Use a valid icon here
//   ];

//   function calculateTimeLeft() {
//     const targetDate = new Date();
//     targetDate.setMonth(targetDate.getMonth() + 1);
//     const difference = targetDate - new Date();

//     return {
//       days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / 1000 / 60) % 60),
//       seconds: Math.floor((difference / 1000) % 60),
//     };
//   }

//   useEffect(() => {
//     setTimeLeft(calculateTimeLeft());

//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleNavigation = (link) => {
//     if (link.name === 'Tasks' && !isAuthenticated) {
//       router.push('/sign');
//     } else {
//       router.push(link.href);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center text-center p-10">
//       <div className="text-6xl font-bold mb-8">DASHBOARD</div>

//       {/* Countdown Timer */}
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
//                   <span>{timeLeft[unit]}</span>
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
//         >
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
//        >
//                     <FontAwesomeIcon icon={link.icon} className="mr-2 size-11" />
//                     {link.name}
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className='text-black'>space</div>
//         <div className='text-black'>space</div>
//         <div className='text-black'>space</div>
//         <div className='text-black'>space</div>
//         <div className="text-xl font-redhat ">
//           <div className='flex flex-row justify-center space-x-96'>
//             <div className="font-semibold mb-2">REFERENCE</div>
//             <div></div>
//           </div>
//           <p className="text-white">Add reference content here.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

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
    { name: 'Treasury', href: '#', icon: faHome },
  ];

  function calculateTimeLeft() {
    // Get current date
    const now = new Date();
    
    // Set target date to the last day of next month
    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    
    // Calculate the difference
    const difference = targetDate.getTime() - now.getTime();

    // Return 0 if the difference is negative
    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    // Calculate the time units
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }

  useEffect(() => {
    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // If countdown is finished, clear the interval
      if (Object.values(newTimeLeft).every(value => value === 0)) {
        clearInterval(timer);
      }
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (link) => {
    if (link.name === 'Tasks' && !isAuthenticated) {
      router.push('/sign');
    } else {
      router.push(link.href);
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-10">
      <div className="text-6xl font-bold mb-8">DASHBOARD</div>

      {/* Countdown Timer */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-row p-4">
          <h1 className="glitch text-5xl font-bold text-teal-400 mr-1">Count</h1>
          <h1 className="glitch text-5xl font-bold text-red-300">Down</h1>
        </div>

        <div className="flex space-x-4 mt-4">
          {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
            <div key={unit} className="relative w-40 h-28 px-2 perspective">
              <div className="flip-card-inner">
                <div className="flip-card-front bg-gray-800 text-teal-300 text-3xl font-bold flex justify-center items-center rounded-md">
                  <span>{String(timeLeft[unit]).padStart(2, '0')}</span>
                </div>
                <div className="flip-card-back bg-gray-900 text-teal-300 text-3xl font-bold flex justify-center items-center rounded-md rotate-y-180">
                  <span>{unit.charAt(0).toUpperCase() + unit.slice(1)} Left</span>
                </div>
              </div>
              <span className="text-white text-sm font-medium uppercase">{unit}</span>
            </div>
          ))}
        </div>
      </div>

      
             <div className="flex w-full justify-center lg:justify-between">
         <div className="text-xl pt-12 font-redhat relative">
           <div className="font-semibold mb-2"></div>
           <div className="font-semibold text-center mb-2"></div>
           <div className='flex flex-1 space-x-80'>
             <div className="flex flex-col item-center justify-center space-y-24">
               {navLinks.map((link) => (
                <div key={link.name} className="relative w-full ">
                  <button
                    onClick={() => handleNavigation(link)}
                    className="button w-full text-xl text-white bg-gray-800 transition-colors duration-200 rounded-md px-28 py-24 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-teal-400 flex items-center"
        >
                    <FontAwesomeIcon icon={link.icon} className="mr-2 size-11" />
                    {link.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex flex-col  space-y-24">
              {nav.map((link) => (
                <div key={link.name} className="relative w-full">
                  <button
                    onClick={() => handleNavigation(link)}
                    className="button w-full text-xl text-white bg-gray-800 transition-colors duration-200 rounded-md px-28 py-24 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring focus:ring-teal-400 flex items-center"
       >
                    <FontAwesomeIcon icon={link.icon} className="mr-2 size-11" />
                    {link.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='text-black'>space</div>
        <div className='text-black'>space</div>
        <div className='text-black'>space</div>
        <div className='text-black'>space</div>
        <div className="text-xl font-redhat ">
          <div className='flex flex-row justify-center space-x-96'>
            <div className="font-semibold mb-2">REFERENCE</div>
            <div></div>
          </div>
          <p className="text-white">Add reference content here.</p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;