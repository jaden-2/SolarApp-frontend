import React from 'react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="relative">
        {/* Outer circle */}
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 animate-pulse"></div>
        
        {/* Inner circle */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <div className="w-16 h-16 rounded-full border-4 border-t-indigo-500 dark:border-t-indigo-400 animate-spin"></div>
        </div>
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default LoadingScreen;