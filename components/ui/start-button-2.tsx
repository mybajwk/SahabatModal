import React from 'react';

const StartButton2 = () => {
  return (
    <div className="text-right"> {/* Align the button to the right */}
      <button
        className="text-white font-bold py-5 px-20 mr-20 mb-30 rounded-full"
        style={{
          background: 'linear-gradient(180deg, #2ED3B7 0%, #00B894 100%)', // Gradient background
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Add shadow for depth
          border: '3px solid #00F0D5', // Border around the button
          marginBottom: '10rem',
        }}
      >
        START
      </button>
    </div>
  );
};

export default StartButton2;
