import React, { useState } from 'react';
import { MdClear } from 'react-icons/md'; // Import the new clear icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export default function AnniversaryPasscode() {
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = (digit) => {
    const newPasscode = passcode + digit;
    setPasscode(newPasscode);

    // Check if the passcode is correct
    if (newPasscode === '100117') {
      navigate('/home'); // Navigate to the next page
    }
  };

  const handleClear = () => {
    setPasscode('');
  };

  return (
    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-r from-pink-300 to-purple-300 relative overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-pink-600 p-5 rounded-lg shadow-lg z-20 flex w-3/4 max-w-3xl'>
        {/* Image on the left */}
        <div className='flex items-center justify-center w-1/2'>
          <img
            src='https://via.placeholder.com/128?text=New+Image'
            alt='Decoration'
            className='w-48 h-48 rounded-full border-4 border-pink-600 shadow-md'
          />
        </div>

        {/* Passcode input on the right */}
        <div className='flex flex-col justify-center w-1/2 pl-4'>
          <h2 className='text-2xl font-bold mb-6 text-pink-600 text-center'>
            Enter Your Passcode
          </h2>
          <div className='relative w-full mb-6'>
            <input
              type='password'
              className='w-full p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-center'
              placeholder='Passcode'
              value={passcode}
              readOnly
            />
            <button
              className='absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition shadow-md flex items-center justify-center'
              onClick={handleClear}
            >
              <MdClear size={16} /> {/* New clear icon */}
            </button>
          </div>
          <div className='flex justify-center mb-6'>
            <div className='grid grid-cols-3 gap-3'>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  className='w-14 h-14 bg-pink-500 text-white text-lg rounded-lg hover:bg-pink-600 transition shadow-md'
                  onClick={() => handleButtonClick(digit)}
                >
                  {digit}
                </button>
              ))}
              <div className='col-span-3 flex justify-center'>
                <button
                  className='w-14 h-14 bg-pink-500 text-white text-lg rounded-lg hover:bg-pink-600 transition shadow-md'
                  onClick={() => handleButtonClick(0)}
                >
                  0
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}