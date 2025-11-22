import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminContext } from "./AdminContext";
import { CartContext } from "./CartProvider";

const StoreDetails = () => {
  const { id } = useParams();
  const { storeProducts } = useContext(AdminContext);
  const { addToCart } = useContext(CartContext);

  const product = storeProducts.find(p => p.id.toString() === id);
  if (!product) return <p className="text-white text-center mt-20">Item not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white/10 p-6 rounded-xl shadow-xl">
        <img src={product.image} className="w-full h-80 object-contain rounded-xl bg-white" />
        <h1 className="text-4xl font-bold mt-6">{product.name}</h1>
        <p className="text-lg mt-4 opacity-90">{product.description}</p>
        <p className="text-3xl font-extrabold text-blue-400 mt-6">
          ₦{Number(product.price).toLocaleString()}
        </p>
        <button
          onClick={() => addToCart(product)}
          className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Add to Cart
        </button>
        <Link to="/store">
          <p className="text-blue-400 underline mt-6 text-center">Back to Store</p>
        </Link>
      </div>
    </div>
  );
};

export default StoreDetails;
