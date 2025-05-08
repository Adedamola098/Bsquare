import React, { useState, useContext } from 'react';
import { Search, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CartContext } from './../CartProvider';
import { Helmet } from 'react-helmet';

const categories = ['All Games', 'Action', 'Sports', 'Adventure', 'Horror', 'Shooter'];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    document.dispatchEvent(new CustomEvent('searchProducts', { detail: query }));
  };

  const handleCategoryClick = (category) => {
    document.dispatchEvent(new CustomEvent('filterCategory', { detail: category }));
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Bsquare - Gaming Accessories Store</title>
        <meta name="description" content="Explore our epic gaming collection with the latest products." />
        <meta name="keywords" content="gaming, accessories, console, PlayStation" />
      </Helmet>
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-blue-600">
          <img src="WhatsApp Image 2025-05-08 at 11.32.28_b497341d.jpg" alt=""
          className='h-14 w-14 rounded-full' />
          
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <a href="#store" className="text-gray-700 font-semibold hover:text-blue-600">Store</a>
            <a href="#playstation" className="text-gray-700 font-semibold hover:text-blue-600">PlayStation</a>
            <a href="#contact" className="text-gray-700 font-semibold hover:text-blue-600">Contact</a>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-700 font-semibold hover:text-blue-600 flex items-center gap-1"
              >
                All Games
                <ChevronDown size={16} className="ml-1 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-40 hidden group-hover:block">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href="#products"
                    onClick={() => handleCategoryClick(cat)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            <Link to="/admin" className="text-gray-700 font-semibold hover:text-blue-600">Admin</Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex w-64 relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search games..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-200">
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalQuantity}
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-md py-4 px-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-200">
                  <ShoppingCart size={20} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalQuantity}
                  </span>
                </Link>
              </div>

              <hr />

              <a href="#store" className="text-gray-700 font-semibold hover:text-blue-600">Store</a>
              <a href="#playstation" className="text-gray-700 font-semibold hover:text-blue-600">PlayStation</a>
              <a href="#contact" className="text-gray-700 font-semibold hover:text-blue-600">Contact</a>

              {categories.map((cat) => (
                <a
                  key={cat}
                  href="#products"
                  onClick={() => handleCategoryClick(cat)}
                  className="text-gray-700 font-semibold hover:text-blue-600"
                >
                  {cat}
                </a>
              ))}

              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-700 font-semibold hover:text-blue-600">
                Admin
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;