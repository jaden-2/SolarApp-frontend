import React, { useState } from 'react';

import LoadingScreen from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const Login: React.FC = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const { darkMode, toggleDarkMode } = useDarkMode();
  const apiEndpint: string = import.meta.env.VITE_API_URL;
  const [isLoading, setLoading] = useState(false);
  const {setIsAuthenticated} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    sessionStorage.setItem("solar-username", username)
    try {
      const response = await fetch(`${apiEndpint}/auth/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        }),
      });

      if (response.ok) {
        setLoading(false)
        setIsAuthenticated(true)
        navigate("/get-started", {
          replace: true
        })
      } else {
        setLoading(false)
        console.error("Invalid credentials")
        setError('Invalid credentials');
      }
    } catch (err) {
      setLoading(false)
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
      {isLoading && <LoadingScreen message="Setting up..." />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FaSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-700" />
        )}
      </button> */}
      
      <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Sign in to access your personalized solar dashboard.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
            <span className="text-gray-700 dark:text-gray-200 text-sm">Instant access to your solar estimates</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71" /></svg>
            </span>
            <span className="text-gray-700 dark:text-gray-200 text-sm">Personalized recommendations & support</span>
          </div>
        </div>

        {/* Optional: Testimonial */}
        <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded">
          <p className="text-sm italic text-gray-700 dark:text-gray-200">
            “I love how easy it is to manage my solar setup and get help when I need it!”
          </p>
          <p className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">— Satisfied User</p>
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
            <span
              
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Dont have an account?
            </span>
            <a
              href="/sign-up"
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