import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import { CartContext } from "./CartProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(AdminContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find(p => p.id.toString() === id);

  if (!product)
    return (
      <p className="text-white text-center mt-20 text-xl">Product not found.</p>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white/10 p-8 rounded-xl shadow-xl">
        
        {/* PRODUCT IMAGE */}
        <div className="relative group">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-contain rounded-xl bg-white transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          {/* PRICE */}
          <p className="text-3xl font-extrabold text-blue-400 mt-4">
            ₦{Number(product.price).toLocaleString()}
          </p>

          {/* RATING */}
          <div className="flex items-center mt-3 space-x-2">
            <span className="text-yellow-400 text-xl">★★★★★</span>
            <p className="text-sm opacity-80">(124 reviews)</p>
          </div>

          {/* DESCRIPTION */}
          <p className="text-lg mt-6 opacity-95 leading-relaxed">
            {product.description}
          </p>

          {/* ADDITIONAL DETAILS */}
          <div className="mt-6 space-y-2">
            <p className="opacity-80 text-sm">Category: {product.category || "General"}</p>
            <p className="opacity-80 text-sm">Condition: {product.condition || "Brand New"}</p>
            <p className="opacity-80 text-sm">Stock: {product.stock || "Available"}</p>
          </div>

          {/* ADD TO CART BUTTON */}
          <button
            onClick={() => addToCart(product)}
            className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg transition-transform active:scale-95"
          >
            Add to Cart
          </button>

          <Link to="/products">
            <p className="text-blue-400 underline mt-6 text-center hover:text-blue-300">
              Back to Products
            </p>
          </Link>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      <div className="max-w-5xl mx-auto mt-16">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <p className="opacity-70 text-sm">Coming soon...</p>
      </div>
    </div>
  );
};

export default ProductDetails;
