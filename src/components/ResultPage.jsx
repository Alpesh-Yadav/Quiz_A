import React from 'react';

const ResultPage = ({ score, onRestart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          {/* Encouragement Text */}
          <div className="mb-8">
            <p className="text-[#2A6073] text-base font-medium">Keep Learning!</p>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#2A6073] mb-12 italic">
            Your Final score is
          </h1>

          {/* Score Display */}
          <div className="mb-16">
            <div className="inline-flex items-baseline">
              <span className="text-[140px] md:text-[160px] font-bold text-[#2A6073] leading-none">
                {score}
              </span>
              <span className="text-6xl md:text-7xl font-bold text-[#2A6073] ml-2">
                %
              </span>
            </div>
          </div>

          {/* Start Again Button */}
          <button
            onClick={onRestart}
            className="bg-[#D7ECF8] hover:bg-[#C4E3F5] text-[#2A6073] 
                     font-semibold py-3 px-10 rounded-lg 
                     transition-all duration-200 hover:shadow-md
                     text-base"
          >
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
