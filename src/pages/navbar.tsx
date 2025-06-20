import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';
import { useDarkMode } from '../components/darkmode';

export interface NavbarProps {
  activeTab?: 'new' | 'list';
  onTabChange?: (tab: 'new' | 'list') => void;
}
const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md fixed w-full z-20 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex-1 flex justify-start space-x-5 font-medium text-sm">
          <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
        </div>
        
        {onTabChange && (
          <div className="flex-1 flex justify-evenly font-medium text-sm">
            <button
              onClick={() => onTabChange('new')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                activeTab === 'new' ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              New Report
            </button>

            <button
              onClick={() => onTabChange('list')}
              className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                activeTab === 'list' ? 'text-indigo-600 dark:text-indigo-400' : ''
              }`}
            >
              My Reports
            </button>
          </div>
        )}

        <div className="flex-1 flex justify-end items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-105 transition-all"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <Link 
            to="/profile" 
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-105 transition-all"
          >
            <FaUser className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;