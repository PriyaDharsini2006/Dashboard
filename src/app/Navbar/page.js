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
  const router = useRouter();

  function calculateTimeLeft() {
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const difference = targetDate.getTime() - now.getTime();

    if (difference < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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

  const handleNavigation = (href) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/Loading.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 to-black/60 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center min-h-screen">
        <div className="w-full text-center p-4 md:p-6 lg:p-10">
          {/* Title with gradient text */}
          <div className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            DASHBOARD
          </div>

          {/* Countdown Timer */}
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <div className="flex flex-row p-2 md:p-4 mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                Count Down
              </h1>
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6">
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className="relative group">
                  <div className="w-28 md:w-36 lg:w-40 h-24 md:h-28 lg:h-32 rounded-xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="h-full flex flex-col items-center justify-center">
                      <span className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
                        {String(timeLeft[unit]).padStart(2, '0')}
                      </span>
                      <span className="text-sm md:text-base text-white/80 mt-2 font-medium uppercase">
                        {unit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Layout */}
          <div className="relative mx-auto w-full max-w-4xl h-[700px]">
            {/* Center Image with glow effect */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <img
                src="/NewHackerzWhite.png"
                alt="Centered Image"
                className="relative rounded-full object-cover w-full h-full"
              />
            </div>

            {/* Navigation Buttons with glassmorphism */}
            {[
              { position: 'top-0 left-1/2 transform -translate-x-1/2', icon: faArrowUpRightFromSquare, text: 'External OD', href: '#' },
              { position: 'top-1/4 right-0', icon: faClipboardList, text: 'Internal OD', href: '#' },
              { position: 'bottom-1/4 right-0', icon: faCog, text: 'Workspace', href: './task-view' },
              { position: 'bottom-0 left-1/2 transform -translate-x-1/2', icon: faDatabase, text: 'Database', href: '#' },
              { position: 'bottom-1/4 left-0', icon: faCheckCircle, text: 'PR Mail', href: '#' },
              { position: 'top-1/4 left-0', icon: faHome, text: 'Treasury', href: 'https://hackerz-treasury.vercel.app' },
            ].map((button, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(button.href)}
                className={`absolute ${button.position} w-48 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 
                  transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/30 
                  focus:outline-none focus:ring-2 focus:ring-teal-400/50 
                  group flex items-center justify-center gap-3`}
              >
                <FontAwesomeIcon 
                  icon={button.icon} 
                  className="w-5 h-5 text-teal-400 group-hover:text-teal-300 transition-colors" 
                />
                <span className="text-white/90 group-hover:text-white font-medium">
                  {button.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reference Section with glassmorphism */}
        <div className="w-full backdrop-blur-md bg-white/5 border-t border-white/10 mt-auto p-6">
          <div className="max-w-4xl mx-auto">
            <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400 mb-2">
              REFERENCE
            </div>
            <p className="text-white/80">Add reference content here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;