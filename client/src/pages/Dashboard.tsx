import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import Bookings from '../components/Bookings';
import { Menu } from 'lucide-react';
import Navbar from '../components/Navbar';

const Dashboard: React.FC = () => {
  const [section, setSection] = useState<'profile' | 'bookings'>('profile');
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex h-screen bg-[#121212] text-white relative pt-[80px]">
      <Navbar />
      {/* Toggle button for mobile */}
      <button
        className="absolute top-4 right-4 z-50 lg:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu size={28} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-40 h-full transition-transform duration-300 bg-[#1f1f1f] ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:w-[250px] w-64`}
      >
        <Sidebar setSection={setSection} closeSidebar={() => setShowSidebar(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto pt-16 lg:pt-6">
        {section === 'profile' && <Profile />}
        {section === 'bookings' && <Bookings />}
      </div>
    </div>
  );
};

export default Dashboard;
