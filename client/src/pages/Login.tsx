import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { loginUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
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
        <div className="w-[90%] h-[80%] rounded-tl-4xl rounded-bl-4xl bg-[#1e1e1e] flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col gap-2 items-center text-7xl text-yellow-600">
            <span>Welcome to</span>
            <span>StayFinder</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-lg text-gray-300">New here?</span>
            <button
              onClick={() => navigate('/signup')}
              className="w-[60%] py-3 text-black font-bold bg-yellow-600 rounded-xl hover:bg-yellow-700 transition"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-full flex flex-row justify-start items-center">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[80%] rounded-tr-4xl rounded-br-4xl bg-[#1e1e1e] flex flex-col items-center justify-center gap-10"
        >
          <div className="flex flex-col gap-2 items-center text-5xl text-yellow-600">
            <span>Sign in</span>
            <span>StayFinder</span>
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-[80%] px-4 py-5 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-600"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-[80%] px-4 py-5 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-600"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-[80%] py-4 bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
