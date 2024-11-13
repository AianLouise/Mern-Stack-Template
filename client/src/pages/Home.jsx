import React from 'react';

export default function Home() {
  const anniversaryDate = new Date('2024-10-01');
  const startDate = new Date('2017-10-01');

  // Calculate duration together
  const calculateDuration = () => {
    const totalMonths = (new Date() - startDate) / (1000 * 60 * 60 * 24 * 30);
    const years = Math.floor(totalMonths / 12);
    const months = Math.floor(totalMonths % 12);
    const days = new Date().getDate() - startDate.getDate();
    return { years, months, days };
  };

  const { years, months, days } = calculateDuration();

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 to-purple-300'>
      <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
        <h1 className='text-4xl font-bold text-pink-600 mb-4'>
          We've been together for {years} years, {months} months, and {days} days!
        </h1>
        <p className='text-xl text-gray-700 mb-8'>
          Celebrating our anniversary on October 1, 2024.
        </p>
        <h2 className='text-2xl font-semibold mb-4'>Happy Anniversary!</h2>
        <p className='text-lg text-gray-700'>
          Thank you for being part of this beautiful journey. Here’s to many more wonderful years together!
        </p>
      </div>
    </div>
  );
}
