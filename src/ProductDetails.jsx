import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Products } from './Data/index';

const ProductDetails = () => {
  const { id } = useParams();
  const product = Products.find((p) => p.id === parseInt(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative z-20 w-full max-w-4xl bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <Link to="/store" className="text-blue-400 mb-4 inline-block">&larr; Back to Store</Link>
        <div className="flex flex-col lg:flex-row gap-6">
          <img src={product.image} alt={product.name} className="w-full lg:w-1/2 rounded-lg" />
          <div>
            <h2 className="text-2xl font-bold text-white">{product.name}</h2>
            <p className="text-gray-300 mt-2">{product.description}</p>
            <p className="text-xl font-bold text-blue-600 mt-4">₦{product.price.toLocaleString()}</p>
            <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;