import React, { useState } from 'react';
import { useDarkMode } from '../components/darkmode';
import { FaSun, FaMoon } from 'react-icons/fa';
import LoadingScreen from '../components/Loader';
import { useAuth } from '../AuthProvider';

const Login: React.FC = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { darkMode, toggleDarkMode } = useDarkMode();
  const apiEndpint: string = import.meta.env.VITE_API_URL;
  const [isLoading, setLoading] = useState(false);
  const {login} = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${apiEndpint}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token)
        setLoading(false)
      } else {
        setError('Invalid credentials');
        setLoading(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen message="Setting up..." />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FaSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-700" />
        )}
      </button>
      
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
        
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="Username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                        text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
            >
              Sign in
            </button>
          </div>

          <div className="flex items-center justify-between">
            <a
              href="/forgot-password"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Forgot password?
            </a>
            <a
              href="/register"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;