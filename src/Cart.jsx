import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useCart } from './CartProvider';
import { Helmet } from 'react-helmet';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    phone: '',
  });

  const generateCartHTML = () => {
    return cart
      .map(
        (item) =>
          `<div><strong>${item.name}</strong> (x${item.quantity}) - ₦${item.price * item.quantity}</div>`
      )
      .join('');
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const { name, email, location, phone } = formData;

    if (!name || !email || !location || !phone) {
      alert('Please fill out all fields.');
      return;
    }

    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const templateParams = {
      name,
      to_email: 'lawalabiolaibileh@gmail.com',
      cartDetails: generateCartHTML(),
      totalPrice: total,
      location,
    };

    emailjs
      .send(
        'service_uj6pnuf',
        'template_eexpuk8',
        templateParams,
        'YO41U-y7xz2XfbNyJ'
      )
      .then(() => {
        alert('Checkout successful! Your order has been placed.');
        clearCart();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        alert('Failed to send order confirmation email.');
      });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans text-white flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Your Cart | Bsquare</title>
        <meta
          name="description"
          content="Review and modify your cart before checking out at Your Store Name."
        />
        <meta
          name="keywords"
          content="shopping cart, online store, gaming accessories, review cart, checkout"
        />
        <meta name="author" content="Bsquare" />
      </Helmet>

      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/7986654-sd_640_360_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 w-full max-w-xl bg-gray-900/90 rounded-lg shadow-2xl p-6 sm:p-8 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
          🛒 Your Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-300 text-center text-base">
            Your cart is empty.
          </p>
        ) : (
          <>
            <ul className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="bg-gray-800 p-4 rounded-md text-sm flex flex-col sm:flex-row justify-between items-center gap-2"
                >
                  <div className="flex-1">
                    <strong className="block text-blue-300 text-base">
                      {item.name}
                    </strong>
                    <span className="text-gray-300 text-sm">
                      ₦{item.price.toLocaleString()} x {item.quantity} = ₦
                      {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center mt-2 sm:mt-0">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      –
                    </button>
                    <span className="min-w-[20px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-2 py-1 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-2 py-1 rounded-md bg-red-600 hover:bg-red-700 text-white ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-right text-xl font-bold text-blue-300 mb-6">
              Total: ₦
              {cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toLocaleString()}
            </h3>

            <form onSubmit={handleCheckout} className="space-y-4 text-sm">
              {['name', 'email', 'location', 'phone'].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-blue-300 font-semibold mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={
                      field === 'email'
                        ? 'email'
                        : field === 'phone'
                        ? 'tel'
                        : 'text'
                    }
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="p-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold"
              >
                Place Order
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;