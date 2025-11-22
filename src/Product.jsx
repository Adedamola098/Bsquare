import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartProvider';
import { Helmet } from 'react-helmet';
import { AdminContext } from './AdminContext';
import { Link } from 'react-router-dom';

const Product = () => {
  const { products } = useContext(AdminContext); // Only games
  const { addToCart } = useContext(CartContext);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState('');

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

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);

  const finalProducts = filteredProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery) ||
    p.description.toLowerCase().includes(searchQuery)
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <section id="products" className="min-h-screen bg-transparent py-16">
      <Helmet>
        <title>Products | Bsquare Gaming Store</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
          Products
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 font-semibold rounded-full ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white'
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
          {finalProducts.length > 0 ? (
            finalProducts.map(product => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:scale-105 transition-transform duration-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-contain"
                  />

                  <h4 className="text-2xl font-bold mt-4">{product.name}</h4>
                  <p className="text-gray-600">{product.description}</p>

                  <p className="text-lg font-bold text-blue-600 mt-2">
                    ₦{Number(product.price).toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white text-center col-span-full">
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
