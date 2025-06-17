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
      navigate('/'); // or redirect to dashboard/home
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center">
      <div className="w-1/2 h-full bg-white flex flex-row justify-end items-center">
        <div className="w-[90%] h-[80%] rounded-tl-4xl rounded-bl-4xl bg-black flex flex-col items-center justify-center gap-10 text-white">
          <div className="flex flex-col gap-2 items-center justify-center text-7xl">
            <span>Welcome to</span>
            <span>StayFinder</span>
          </div>
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <span className="text-xl">New here?</span>
            <button
              onClick={() => navigate('/signup')}
              className="w-[60%] h-15 text-black font-bold rounded-xl hover:bg-opacity-90 transition bg-white text-2xl"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      <div className="w-1/2 h-full bg-black flex flex-row justify-start items-center">
        <form
          onSubmit={handleLogin}
          className="w-[90%] h-[80%] rounded-tr-4xl rounded-br-4xl bg-white flex flex-col items-center justify-center gap-10"
        >
          <div className="flex flex-col gap-2 items-center justify-center text-5xl text-black">
            <span>Sign in</span>
            <span>StayFinder</span>
          </div>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-[80%] px-4 py-5 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c8a65d]"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-[80%] px-4 py-5 bg-[#121212] border border-[#3a3a3a] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#c8a65d]"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-[80%] h-[10%] bg-[#c8a65d] text-white font-semibold hover:bg-opacity-90 transition duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
