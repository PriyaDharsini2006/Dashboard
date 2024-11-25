'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Clock, ChevronRight } from 'lucide-react';
import {
  faClipboardList,
  faArrowUpRightFromSquare,
  faListCheck,
  faCheckCircle,
  faUsers,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [totalTraffic, setTotalTraffic] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Fetch the total traffic count from the API
  useEffect(() => {
    async function checkAdminStatus() {
      if (session?.user?.email) {
        try {
          const response = await fetch('/api/checkAdmin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session.user.email
            })
          });

          if (!response.ok) {
            throw new Error(`Failed to check admin status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Admin check response:', data);
          setIsAdmin(data.isAdmin);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      }
    }

    checkAdminStatus();
  }, [session]);

   useEffect(() => {
    async function fetchTrafficCount() {
      console.log('Fetching traffic count. isAdmin:', isAdmin);
      
      if (!isAdmin) {
        console.log('Skipping traffic fetch - not admin');
        return;
      }

      try {
        setFetchError(null);
        const response = await fetch('/api/trafficCount');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Traffic count response:', data);
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setTotalTraffic(data.totalCount);
      } catch (error) {
        console.error('Error fetching traffic count:', error);
        setFetchError('Failed to load traffic count');
        setTotalTraffic(null);
      }
    }

    if (isAdmin) {
      fetchTrafficCount();
      const intervalId = setInterval(fetchTrafficCount, 30000);
      return () => clearInterval(intervalId);
    }
  }, [isAdmin]);


  const renderTrafficCount = () => {
    
    
    if (!isAdmin) {
      return null;
    }

    return (
      <div className="text-white text-lg md:text-xl lg:text-2xl font-grotesk mb-4">
      Traffic Count:{' '}
      {fetchError ? (
        <span className="text-red-500 text-base">{fetchError}</span>
      ) : totalTraffic !== null ? (
        totalTraffic.toLocaleString()
      ) : (
        <span className="animate-pulse">Loading...</span>
      )}
    </div>
  );
};


  const navLinks = [
    { name: 'External OD', href: '#', icon: faArrowUpRightFromSquare },
    { name: 'Internal OD', href: 'https://internal-od.vercel.app/', icon: faClipboardList },
    { name: 'Stayback', href: '/stayback', icon: faUsers },
  ];

  const nav = [
    { name: 'Tasks & Workspace', href: '/task-view', icon: faListCheck, requiresAuth: true },
    { name: 'PR Mail', href: 'https://hackerz-mail-automation.vercel.app', icon: faCheckCircle },
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
    if (!session) {
      router.push('/sign');
      return;
    }
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
    if (link.requiresAuth) {
      if (status === 'loading') {
        return;
      }

      if (!session) {
        router.push('/sign');
        return;
      }

      if (!session.user?.email?.endsWith('@citchennai.net')) {
        router.push('/access-denied');
        return;
      }
    }

    if (link.href.startsWith('http')) {
      window.open(link.href, '_blank');
    } else {
      router.push(link.href);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Header Section */}
      <div className="w-full backdrop-blur-xl border-b border-white/10 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
              <img 
                src="/NewHackerzWhite.png"
                alt="Dashboard Icon"
                className="h-[100px] w-[100px] md:h-[150px] md:w-[150px] object-contain"
              />
              <h1 className="text-4xl md:text-7xl text-center flex-1 font-hacked font-bold bg-gradient-to-b from-gray-200 to-gray-800 bg-clip-text text-transparent">
                DASHBOARD
              </h1>
            </div>
            <div className="flex items-center shrink-0">
              {renderTrafficCount()}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 font-grotesk">
        {/* Countdown Section */}
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-grotesk text-[#00f5d0] font-bold">
              Countdown
            </h2>
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#00f5d0]" />
          </div>

          <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-4">
            {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
              <div key={unit} className="relative">
                <div className="w-24 md:w-32 h-20 md:h-24 bg-white/5 backdrop-blur-xl rounded-xl flex flex-col items-center justify-center transition-all hover:bg-white/10">
                  <span className="text-xl md:text-2xl font-bold text-gray-200">
                    {String(timeLeft[unit]).padStart(2, '0')}
                  </span>
                  <span className="text-xs md:text-sm text-gray-400 uppercase mt-1">
                    {unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[...navLinks, ...nav].map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavigation(link)}
              className="p-4 md:p-6 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-xl transition-all duration-200 group flex items-center justify-between hover:transform hover:scale-[1.02]"
            >
              <div className="flex items-center">
                <FontAwesomeIcon 
                  icon={link.icon} 
                  className="w-5 h-5 md:w-6 md:h-6 text-[#00f5d0] group-hover:text-[#00f5d0] transition-colors" 
                />
                <span className="ml-3 text-sm md:text-base text-gray-200 font-grotesk">
                  {link.name}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-500 group-hover:text-[#00f5d0] transition-colors" />
            </button>
          ))}
        </div>

        {/* Reference Section */}
        <div className="mt-6 md:mt-8 p-4 md:p-6 bg-white/5 backdrop-blur-xl rounded-xl">
          <h3 className="font-grotesk text-[#00f5d0] text-lg md:text-xl mb-2">
            REFERRALS
          </h3>
          <p className="text-sm md:text-base text-gray-400">
            Referrals 1
            Referrals 2
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;