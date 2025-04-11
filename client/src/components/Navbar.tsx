import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close menu after clicking
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-light text-gray-800">
                ESA Consult
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
            >
              Projects
            </button>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={() => scrollToSection('services')}
            className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
          >
            About Us
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
          >
            Projects
          </button>
          <Link
            to="/contact"
            className="block w-full text-left text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-light bg-transparent hover:bg-gray-50 transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 