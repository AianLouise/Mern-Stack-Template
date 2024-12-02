import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Landing = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col'>
      <nav className='w-full bg-blue-500 p-4 flex justify-between items-center'>
        <div className='text-white text-2xl font-bold'>MERN Template</div>
        <div>
          <Link to="/profile" className='text-white mr-4'>Profile</Link>
          <button onClick={handleLogout} className='text-white'>Logout</button>
        </div>
      </nav>
      <div className='flex-grow flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold mb-4'>Welcome Back!</h1>
          <p className='text-xl mb-8'>You are successfully logged in.</p>
          <h2 className='text-2xl font-semibold mb-4'>Explore</h2>
          <p className='text-lg px-10'>
            Navigate through your profile, manage your settings, and explore the features of our MERN Stack application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;