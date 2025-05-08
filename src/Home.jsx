import React from 'react';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Bsquare</title>
        <meta name="description" content="Welcome to Your E-Commerce Store! Discover a wide range of products at unbeatable prices." />
        <meta name="keywords" content="e-commerce, shopping, products, online store" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Your Store</h1>
            <p className="text-lg md:text-xl mb-6">Shop the best products at amazing prices.</p>
            <a
              href="/products"
              className="bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">Explore thousands of products across various categories.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Get your orders delivered quickly and reliably.</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">Great Deals</h3>
              <p className="text-gray-600">Enjoy exclusive discounts and offers every day.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; 2023 Your E-Commerce Store. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;