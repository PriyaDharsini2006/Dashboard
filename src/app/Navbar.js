'use client'
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const navLinks = [
    { name: 'External OD', href: '#' },
    { name: 'Internal OD', href: '#' },
    { name: 'Workspace', href: '#' },
    { name: 'Tasks', href: '#' },
    { name: 'PR Mail', href: '#' },
    { name: 'Treasury', href: '#' },
    { name: 'Database', href: '#' },
  ];

  function calculateTimeLeft() {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1);
    const difference = targetDate - new Date();

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="bg-black text-white shadow-lg fixed w-full top-0 z-50 py-5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                className="h-[120px] w-[120px]" 
                src="/CIT_Logo.png"
                alt="Logo"
              />
            </div>

            <div className="lg:hidden flex items-center">
              {timeLeft && (
                <div className="text-lg font-redhat">
                  <span className="font-bold">{timeLeft.days}d </span>
                  <span className="font-bold">{timeLeft.hours}h </span>
                  <span className="font-bold">{timeLeft.minutes}m </span>
                  <span className="font-bold">{timeLeft.seconds}s</span>
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1 space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-redhat text-lg text-white hover:text-gray-300 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4 font-redhat">
            {timeLeft && (
              <div className="text-lg">
                <span className="font-['red hat display']">{timeLeft.days}d </span>
                <span className="font-['red hat display']">{timeLeft.hours}h </span>
                <span className="font-['red hat display']">{timeLeft.minutes}m </span>
                <span className="font-['red hat display']">{timeLeft.seconds}s</span>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-md text-white hover:text-gray-300 focus:outline-none"
              aria-expanded={isOpen}
            >
              <Menu size={28} /> 
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} lg:hidden`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-3 pb-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 rounded-md text-lg text-white font-redhat hover:bg-gray-700 transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
