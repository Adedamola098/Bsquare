import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/order-history', { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="relative z-20 w-full max-w-4xl bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-extrabold text-white text-center mb-6">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-gray-300 text-center">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-700/50 p-4 rounded-lg">
                <p className="text-white">Order ID: {order.id}</p>
                <p className="text-gray-300">Total: ₦{order.total.toLocaleString()}</p>
                <p className="text-gray-300">Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;