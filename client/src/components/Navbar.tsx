import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../hooks/useRedux';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 used to get current pathname

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/'; // 👈 check if on home page

  return (
    <div className="w-screen px-5 box-border shadow-md fixed top-0 z-50 bg-[#121212] text-white">
      <div className="h-[100px] flex flex-row justify-between items-center">
        <span
          className="text-xl font-bold text-yellow-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          StayFinder
        </span>

        {isHome && scrolled && (
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#3a3a3a] rounded px-3 py-2 w-1/3 focus:ring-1 focus:ring-yellow-700"
          />
        )}

        <div className="flex flex-row gap-5 items-center">
          <span className="text-gray-300 cursor-pointer hover:text-yellow-600">Become a host</span>

          {user ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center hover:scale-105 transition"
            >
              {user.name?.[0].toUpperCase() || 'U'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="text-yellow-600 border border-yellow-600 px-4 py-1 rounded hover:bg-yellow-600 hover:text-black transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {isHome && !scrolled && (
        <div className="py-3 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#1e1e1e] text-white placeholder-gray-400 border border-[#3a3a3a] rounded px-3 py-3 w-1/2 focus:ring-1 focus:ring-yellow-700"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
