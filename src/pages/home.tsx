import React from 'react';
import { Link } from 'react-router-dom';
import { FaRocket, FaLinkedin, FaGithub } from 'react-icons/fa';

const LandingPage: React.FC = () => {


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md fixed w-full z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8 font-medium text-sm">
            <Link to="/home" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
            {/* <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
            <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</Link> */}
          </div>
          <div className="flex items-center space-x-5">
            {/* <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-105 transition-all"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FaMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button> */}
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
        <div className="max-w-7xl mx-auto px-4">
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
            <div className="flex flex-col items-center justify-start">
              <div className="relative w-full">
                <div className="relative flex flex-col items-center">
                  {/* Profile Image */}
                  <img
                    srcSet="me-ai.png"
                    alt="Sylvanus Jedidiah"
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900 shadow-lg object-cover absolute -top-16 left-1/2 transform -translate-x-1/2"
                    style={{ zIndex: 2 }}
                  />
                  {/* About Me Card */}
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-8 pt-20 rounded-2xl shadow-xl mt-16 relative w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">ABOUT ME</h2>
                   <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed text-center">
                    Hey there, I'm <strong>Sylvanus Jedidiah</strong> — a Mechanical Engineer and Computer Scientist passionate about blending engineering and software to create practical, sustainable solutions.  
                    <br /><br />
                    This app is part of my ongoing journey to make solar energy more accessible and understandable for everyone. Whether you're just curious, managing your own solar system, or exploring how clean tech can work for you, I hope you find this tool useful.
                    <br /><br />
                    I'm always looking to improve — your thoughts, suggestions, or bug reports are more than welcome. Feel free to reach out and help shape the next version!
                  </p>

                    <div className="flex justify-center space-x-4 mt-6">
                      <a 
                        href="https://www.linkedin.com/in/sylvanus-jedidiah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                      >
                        <FaLinkedin />
                      </a>
                      <a 
                        href="https://github.com/jaden-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
                      >
                        <FaGithub />
                      </a>
                      <a href="mailto:jedidiahsylvanus@gmail.com">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Solar Estimate by Sylvanus Jedidiah. All rights reserved.
            <span className="ml-2 text-xs text-indigo-500 dark:text-indigo-300">Built with ❤️</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.linkedin.com/in/sylvanus-jedidiah"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/jaden-2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:jedidiahsylvanus@gmail.com"
              className="text-blue-500 hover:text-blue-700 transition"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
