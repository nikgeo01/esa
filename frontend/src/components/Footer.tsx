import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-bold text-gray-900">
              ESA
            </Link>
            <p className="mt-2 text-sm text-gray-600 max-w-xs">
              Creating exceptional web and mobile experiences with minimalist
              design and powerful functionality.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Navigation
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-gray-600 hover:text-blue-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/projects" className="text-sm text-gray-600 hover:text-blue-500">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-600 hover:text-blue-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                Social
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900">
                  <TwitterIcon className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 text-center md:text-left">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ESA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;