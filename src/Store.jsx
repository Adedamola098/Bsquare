import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartProvider';
import { Helmet } from 'react-helmet';
import { AdminContext } from './AdminContext';

const Store = () => {
  const { products } = useContext(AdminContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleFilter = (event) => setSelectedCategory(event.detail);
    const handleSearch = (event) => setSearchQuery(event.detail.toLowerCase());
    document.addEventListener('filterCategory', handleFilter);
    document.addEventListener('searchProducts', handleSearch);
    return () => {
      document.removeEventListener('filterCategory', handleFilter);
      document.removeEventListener('searchProducts', handleSearch);
    };
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);
  const finalProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div id="store" className="min-h-screen flex flex-col items-center justify-center">
      <Helmet>
        <title>Store | Gaming Accessories</title>
        <meta name="description" content="Browse and buy the best gaming accessories in our store. Fast delivery, great deals, and top-quality gear!" />
        <meta name="keywords" content="gaming accessories, game store, buy gaming gear, headsets, controllers, online game store" />
        <meta name="author" content="Bsquare" />
      </Helmet>
      <header className="bg-gradient-to-r text-white py-16 px-8 shadow-lg w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Gaming Accessories Store</h1>
      </header>
      <main className="py-20 px-4 sm:px-8 w-full max-w-7xl">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={`${category}-${index}`}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-semibold rounded-full transition transform hover:scale-105 shadow-sm ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {notification && (
          <div className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            {notification}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {finalProducts.length > 0 ? finalProducts.map(product => (
            <div
              key={product.id}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl border border-gray-200"
            >
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md z-10">
                {product.category}
              </div>
              <div className="relative h-64 w-full overflow-hidden rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain bg-gray-100 p-2 transition-transform duration-500 hover:scale-110"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/300x200?text=Game+Image')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h4>
                <p className="text-gray-700 text-sm mb-4 opacity-90 line-clamp-2">{product.description}</p>
                <p className="text-xl font-extrabold text-blue-600 mb-5">
                  ₦{(typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0).toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )) : <p className="text-white text-center col-span-full text-lg opacity-80">No products found.</p>}
        </div>
      </main>
    </div>
  );
};

export default Store;
