import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Bsquare Gaming</h3>
            <p className="text-sm">
              Your one-stop shop for epic gaming accessories. Explore our collection and level up your gaming experience!
            </p>
          </div>

          {/* Sitemap Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Sitemap</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <a href='#products' className="hover:text-blue-400 transition-colors">Products</a>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-400 transition-colors">Profile</Link>
              </li>
              <li>
                <a href='#contact'  className="hover:text-blue-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <a href="https://adedamola-isreal-portfolio.netlify.app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                  Developer Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            &copy; {currentYear} Bsquare Gaming. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;