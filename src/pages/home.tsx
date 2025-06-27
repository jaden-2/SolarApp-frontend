import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaSun, FaMoon, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useDarkMode } from '../components/darkmode';

const LandingPage: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md fixed w-full z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8 font-medium text-sm">
            <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link>
          </div>
          <div className="flex items-center space-x-5">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-105 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <Link 
              to="/login"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition-transform shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-12">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-md">
                  ARE YOU A HOME OWNER WANTING TO GET A SOLAR SYSTEM?
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Build your solar system and tap into the power of the sun today.
                </p>
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl shadow-lg flex items-start space-x-4">
                <FaRocket className="text-4xl text-indigo-600 dark:text-indigo-400 animate-bounce mt-1" />
                <div>
                  <h2 className="text-xl font-semibold">BUILD FASTER AND ACCURATELY</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Build a solar system fast and accurately with a complete report to share with clients.
                  </p>
                </div>
              </div>

              <div>
                <Link
                  to="/get-started"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white font-semibold rounded-full shadow-lg
                           hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  GET STARTED
                  <FaRocket className="ml-3 -rotate-45" />
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/path-to-your-image.jpg"
                  alt="Solar Installation"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
              </div>

              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-4">ABOUT ME</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  Hey there, I'm <strong>Sylvanus Jedidiah</strong>. A Mechanical Engineer and Computer Scientist passionate about blending engineering and software to build sustainable systems.
                </p>

                <div className="flex space-x-4 mt-6">
                  <a 
                    href="https://linkedin.com/in/JedidiahSylvanus"
                    className="text-2xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                  >
                    <FaLinkedin />
                  </a>
                  <a 
                    href="https://github.com/JedidiahSylvanus"
                    className="text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
