import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../components/darkmode';
import { FaSun, FaMoon } from 'react-icons/fa';
import LoadingScreen from '../components/Loader';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isLoading, setLoading] = useState(false)
  const ApiBaseUrl = import.meta.env.VITE_API_URL;
  // Add password validation effect
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
        try{
        let response = await fetch(
            `${ApiBaseUrl}/account/sign-up`,
            {
                body: JSON.stringify(formData),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        if(response.status == 200){
            // redirect 
            setLoading(false)
        }
        setError("Something unexpected accured, try again")
        setLoading(false)
    }catch (err){
        setLoading(false)
        setError("An unexpected error occured")
    }
    
    
  };

  return (
    <>
    {
        isLoading && <LoadingScreen message='Creating Your Account ...'/>
    }
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FaSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border rounded-md 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm
                         ${passwordError 
                           ? 'border-red-500 dark:border-red-500' 
                           : 'border-gray-300 dark:border-gray-600'}`}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {passwordError}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                       text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900
                       transition-colors"
            >
              Create Account
            </button>
          </div>

          <div className="text-center">
            <a
              href="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
    </>
  )
};

export default SignUp;