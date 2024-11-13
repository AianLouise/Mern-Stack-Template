import React from 'react';

export default function Home() {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to AianDev</h1>
        <p className='text-xl mb-8'>Your go-to solution for MERN Stack development.</p>
        <h2 className='text-2xl font-semibold mb-4'>About Us</h2>
        <p className='text-lg'>
          At AianDev, we specialize in creating robust and scalable web applications using the MERN Stack (MongoDB, Express.js, React, and Node.js). Our team of experienced developers is dedicated to delivering high-quality solutions tailored to your needs.
        </p>
      </div>
    </div>
  );
}