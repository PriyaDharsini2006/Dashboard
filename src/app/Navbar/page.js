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
  faAreaChart,
  fa1,
  faDatabase,
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
    { name: 'Stayback', href: 'https://internal-od.vercel.app/stayback/', icon: faHome },
    { name: 'Meeting', href: 'https://internal-od.vercel.app/meeting/', icon: faUsers },

  ];

  const nav = [
    { name: 'Tasks & Workspace', href: '/task-view', icon: faListCheck, requiresAuth: true },
    { name: 'PR Mail', href: 'https://hackerz-mail-automation.vercel.app', icon: faCheckCircle },
    { name: 'Treasury', href: 'https://hackerz-treasury.vercel.app', icon: faHome },
    { name: 'Database', href: '/', icon: faDatabase },
  ];
  function calculateTimeLeft() {
    const now = new Date();
    const targetDate = new Date('2025-02-06T23:59:59');
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
        router.push('/acess-denied');
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
        <div className="flex flex-col items-center mb-6 md:mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-grotesk text-[#00f5d0] font-bold">
              COUNTDOWN
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
          <div className="text-[#00f5d0] text-lg p-2 md:text-2xl font-grotesk font-grotesk animate-pulse">
              COMING SOON
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...navLinks, ...nav].map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link)}
                  className="p-6 bg-white/5 backdrop-blur-xl hover:bg-white/10 rounded-xl transition-all duration-200 group flex items-center justify-between hover:transform hover:scale-[1.02] h-40" // Increased height
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon 
                      icon={link.icon} 
                      className="w-8 h-9 text-[#00f5d0] group-hover:text-[#00f5d0] transition-colors" // Increased icon size
                    />
                    <span className="ml-4 text-lg text-gray-200 font-grotesk font-bold"> {/* Increased text size and added bold */}
                      {link.name}
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-12 text-gray-500 group-hover:text-[#00f5d0] transition-colors" /> {/* Increased chevron size */}
                </button>
              ))}
            </div>
          </div>

          {/* Referrals Section - Takes up 1/4 width on large screens */}
          <div className="w-full lg:w-1/4">
            <div className="p-4 md:p-6 bg-white/5 backdrop-blur-xl rounded-xl">
              <h3 className="font-grotesk text-[#00f5d0] text-lg md:text-xl mb-4">
                REFERRALS
              </h3>
              <div className="text-sm md:text-base text-gray-400 space-y-2">
                {[
                  { name: 'santhoshs', value: 95 },
                  { name: 'roopashrees', value: 93 },
                  { name: 'abishekmanikandan', value: 92 },
                  { name: 'vaibavdk', value: 89 },
                  { name: 'yuvarajkumars', value: 88 },
                  { name: 'darshanav', value: 84 },
                  { name: 'aarthie', value: 83 },
                  { name: 'rishikeshka', value: 81 },
                  { name: 'rishekeshr', value: 78 },
                  { name: 'meenarhoshinic', value: 76 },
                  { name: 'sanjayb', value: 75 }
                ].map((referral) => (
                  <div 
                    key={referral.name} 
                    className="flex justify-between items-center p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <span className="text-gray-200">{referral.name}</span>
                    <span className="text-[#00f5d0] font-bold text-lg">{referral.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;