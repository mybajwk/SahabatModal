import React from 'react';

const StartButton = () => {
  return (
    <button
      className="text-white font-bold py-5 px-20 ml-40 mt-10 rounded-full"
      style={{
        background: 'linear-gradient(180deg, #2ED3B7 0%, #00B894 100%)', // Gradient background
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow for depth
        border: '3px solid #00F0D5', // Border around the button
        marginTop: '6rem',
      }}
    >
      START
    </button>
  );
};

export default StartButton;
