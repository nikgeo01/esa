import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react';
import { isAuthenticated, logout } from '../utils/auth';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const authenticated = isAuthenticated();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };
  const navLinks = [{
    name: 'Home',
    path: '/'
  }, {
    name: 'Projects',
    path: '/projects'
  }, {
    name: 'Contact',
    path: '/contact'
  }];
  if (authenticated) {
    navLinks.push({
      name: 'Dashboard',
      path: '/dashboard'
    });
  }
  return <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-gray-900">
            ESA
          </Link>
          <div className="md:hidden">
            <button type="button" className="text-gray-500 hover:text-gray-600 focus:outline-none" onClick={toggleMenu}>
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-8 mt-4 md:mt-0`}>
          {navLinks.map(link => <Link key={link.name} to={link.path} className={`block py-2 px-4 text-sm md:text-base transition-colors duration-200 ${location.pathname === link.path ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500'}`} onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>)}
          {authenticated ? <button onClick={handleLogout} className="block w-full text-left py-2 px-4 text-sm md:text-base text-gray-600 hover:text-blue-500 transition-colors duration-200">
              Logout
            </button> : <Link to="/login" className={`block py-2 px-4 text-sm md:text-base transition-colors duration-200 ${location.pathname === '/login' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500'}`} onClick={() => setIsOpen(false)}>
              Login
            </Link>}
        </div>
      </nav>
    </header>;
};
export default Navbar;