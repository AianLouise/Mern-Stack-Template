import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='w-full h-screen flex flex-col bg-gray-100'>
      <nav className='w-full bg-blue-500 p-4 flex justify-between items-center'>
        <div className='text-white text-2xl font-bold'>MERN Template</div>
        <div>
          <Link to="/login" className='text-white mr-4'>Login</Link>
          <Link to="/register" className='text-white'>Register</Link>
        </div>
      </nav>
      <div className='flex-grow flex items-center justify-center'>
        <div className='text-center p-8'>
          <h1 className='text-3xl font-bold mb-4 text-blue-600'>Welcome to MERN Template</h1>
          <p className='text-lg mb-6 text-gray-700'>Build your web applications with the MERN stack.</p>
          <h2 className='text-xl font-semibold mb-4 text-blue-600'>About This Template</h2>
          <p className='text-md text-gray-700'>
            This template provides a starting point for building web applications using MongoDB, Express.js, React, and Node.js. It includes essential features and best practices to help you get started quickly.
          </p>
        </div>
      </div>
    </div>
  );
}