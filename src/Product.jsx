import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartProvider';
import { Helmet } from 'react-helmet';
import { AdminContext } from './AdminContext';

const Product = () => {
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

  console.log('Products from context:', products); // Debug log
  const featuredProducts = products.filter(p => p.featured);
  console.log('Featured products:', featuredProducts); // Debug log
  const categories = ['All', ...new Set(featuredProducts.map(p => p.category))];
  const filteredProducts = selectedCategory === 'All' ? featuredProducts : featuredProducts.filter(p => p.category === selectedCategory);
  const finalProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <section id="products" className="min-h-screen bg-transparent py-16">
      <Helmet>
        <title>Featured Products | Your Gaming Accessories Store</title>
        <meta name="description" content="Browse our featured collection of gaming accessories including headsets, controllers, and more for the ultimate gaming experience!" />
        <meta name="keywords" content="gaming accessories, gaming store, buy gaming gear, headsets, controllers, online game store, featured products" />
        <meta name="author" content="Bsquare" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12 drop-shadow-lg">Featured Products</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-semibold rounded-full transition transform hover:scale-105 shadow-sm ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'bg-white/10 backdrop-blur-md text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700'
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalProducts.length > 0 ? finalProducts.map(product => (
            <div
              key={product.id}
              className="relative bg-gradient-to-b from-white/95 to-gray-100/95 rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-blue-500/50 border border-gray-200/50"
            >
              <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold px-4 py-1 rounded-full shadow-md z-10">
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
              <div className="p-6 relative">
                <h4 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h4>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2 opacity-90">{product.description}</p>
                <p className="text-xl font-extrabold text-blue-600 mb-5">
                  ₦{(typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0).toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="block text-center py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 shadow-md"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          )) : <p className="text-white text-center col-span-full text-lg opacity-80">No featured products found.</p>}
        </div>
      </div>
    </section>
  );
};

export default Product;
