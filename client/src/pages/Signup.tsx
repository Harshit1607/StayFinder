import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { registerUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Signup: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password, phone_number }));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center bg-[#121212] text-white">
      {/* Left Section */}
      <div className="w-1/2 h-full flex flex-row justify-end items-center">
        <div className="w-[90%] h-[80%] rounded-tl-4xl rounded-bl-4xl bg-[#1e1e1e] flex flex-col items-center justify-center gap-10 text-4xl">
          <div className="flex flex-col gap-2 items-center text-7xl text-yellow-600">
            <span>Welcome to</span>
            <span>StayFinder</span>
          </div>
          <span className="text-lg text-gray-300">Already have an account?</span>
          <button
            onClick={() => navigate('/login')}
            className="w-[60%] py-3 bg-yellow-600 text-black font-bold rounded-xl hover:bg-yellow-700 transition"
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full flex flex-row justify-start items-center">
        <form
          onSubmit={handleSignup}
          className="w-[90%] h-[80%] rounded-tr-4xl rounded-br-4xl bg-[#1e1e1e] flex flex-col items-center justify-center gap-8"
        >
          <div className="flex flex-col gap-2 items-center text-5xl text-yellow-600">
            <span>Sign up</span>
            <span>StayFinder</span>
          </div>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-[80%] px-4 py-3 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-600"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-[80%] px-4 py-3 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-600"
          />

          <input
            type="tel"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="w-[80%] px-4 py-3 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-600"
          />

          <div className="w-[80%] relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-600 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-[80%] py-4 bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition duration-300"
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
