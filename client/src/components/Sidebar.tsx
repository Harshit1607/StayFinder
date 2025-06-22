import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

interface Props {
  setSection: React.Dispatch<React.SetStateAction<'profile' | 'bookings'>>;
  closeSidebar: () => void;
}

const Sidebar: React.FC<Props> = ({ setSection, closeSidebar }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="w-[250px] bg-[#1f1f1f] h-full flex flex-col items-start px-6 py-10 gap-8">
      <h2 className="text-2xl font-bold text-yellow-500 mb-8">Dashboard</h2>
      <button onClick={() => {
        setSection('profile'); 
        closeSidebar()}
        } className="text-left w-full hover:text-yellow-400">
        Profile
      </button>
      <button onClick={() => {setSection('bookings'); closeSidebar();}} className="text-left w-full hover:text-yellow-400">
        Bookings
      </button>
      <button onClick={handleLogout} className="text-left w-full text-red-400 hover:text-red-500">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
