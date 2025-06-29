import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import useAuthFetch from '../CustomHook/UseAuthFetch';
import { useAuth } from '../AuthProvider';


export interface NavbarProps {
  activeTab?: 'new' | 'list';
  onTabChange?: (tab: 'new' | 'list') => void;
  username?: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, username, setLoading }) => {
  // Use username prop if provided, otherwise fallback to localStorag
  const currentUser = username || sessionStorage.getItem('solar-username') || 'User';
  const [profileOpen, setProfileOpen] = useState(false);
  const {authFetch} = useAuthFetch()
  const {setIsAuthenticated, isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true)
    let response = await authFetch(`${import.meta.env.VITE_API_URL}/auth/logout`)

    if(response.ok){
      setLoading(false)
      setIsAuthenticated(false)
      sessionStorage.removeItem("solar-username")
      navigate("/home", {
      replace: true
    })
    }
    
  };

  return (
    <nav className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md fixed w-full z-20 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Home */}
        <div className="flex-1 flex justify-start space-x-5 font-medium text-sm">
          <Link to="/home" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Home
          </Link>
        </div>

        {/* Center: Tabs */}
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

        {/* Right: Profile */}
        <div className="flex-1 flex justify-end items-center space-x-4 relative">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full dark:bg-gray-700 hover:scale-105 transition-all focus:outline-none"
            onClick={() => setProfileOpen((open) => !open)}
            aria-label="Profile"
          >
            <FaUser className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-12 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg border dark:border-gray-700 z-30">
              <div className="px-4 py-3 border-b dark:border-gray-700">
                <div className="font-semibold text-gray-800 dark:text-gray-200">{currentUser}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Logged in</div>
              </div>
              {isAuthenticated?
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b"
              >
                Log out
              </button>
              : <button
                onClick={()=>navigate("/login")}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b"
              >
                Sign in
              </button>}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;