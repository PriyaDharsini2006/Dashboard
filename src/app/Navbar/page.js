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
    { name: 'Treasury', href: 'https://hackerz-treasury.vercel.app', icon: faHome }, // Update here
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
      // For external links like Treasury, just open the link in a new tab
      window.open(link.href, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center bg-black text-center p-10">
      <div className="text-6xl text-white font-bold mb-8">DASHBOARD</div>

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
        <div className="text-xl font-redhat ">
          <div className='flex flex-row justify-center space-x-96'>
            <div className="font-semibold text-white mb-2">REFERENCE</div>
            <div></div>
          </div>
          <p className="text-white">Add reference content here.</p>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
