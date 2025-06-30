import React, { useState, useEffect } from 'react';

import LoadingScreen from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  // const { darkMode, toggleDarkMode } = useDarkMode();
  const [isLoading, setLoading] = useState(false)
  const ApiBaseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
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
            navigate("/login", {
              replace: true
            })
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
      {/* <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <FaSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </button> */}

      <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Join Solar and take the first step towards energy independence. Get instant estimates, personalized recommendations, and expert support for your solar setup.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </span>
            <span className="text-gray-700 dark:text-gray-200 text-sm">Get a free, instant solar estimate</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.05l-.71-.71" /></svg>
            </span>
            <span className="text-gray-700 dark:text-gray-200 text-sm">Personalized system recommendations</span>
          </div>
          
        </div>

        {/* Optional: Testimonial */}
        <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded">
          <p className="text-sm italic text-gray-700 dark:text-gray-200">
            “Solar made it easy to understand my options and get started with clean energy. Highly recommended!”
          </p>
          <p className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">— Happy Customer</p>
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
            <Link
              to="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  )
};

export default SignUp;