import React, { useState, useEffect, useContext } from 'react';
import adminConfig from './config/AdminConfigs';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet';
import { AdminContext } from './AdminContext';

const Admin = () => {
  const { products, setProducts } = useContext(AdminContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('adminUsers')) || []);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('adminOrders')) || []);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: 0, dimport React, { useState, useEffect, useContext } from 'react';
import adminConfig from './config/AdminConfigs';
import { saveAs } from 'file-saver';
import { Helmet } from 'react-helmet';
import { AdminContext } from './AdminContext';

const Admin = () => {
  const { products, setProducts } = useContext(AdminContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('adminUsers')) || []);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('adminOrders')) || []);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: 0, description: '', image: '', stock: 0, featured: false });
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityLog, setActivityLog] = useState(() => JSON.parse(localStorage.getItem('adminActivityLog')) || []);

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        handleLogout();
        setNotification('Session expired. Please log in again.');
        setTimeout(() => setNotification(''), 3000);
      }, 30 * 60 * 1000);
      setSessionTimeout(timeout);
    }
    return () => clearTimeout(sessionTimeout);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
    localStorage.setItem('adminOrders', JSON.stringify(orders));
    localStorage.setItem('adminActivityLog', JSON.stringify(activityLog));
  }, [users, orders, activityLog]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminConfig.password) {
      setIsAuthenticated(true);
      setNotification('Login successful!');
      setTimeout(() => setNotification(''), 3000);
      logActivity('Admin logged in');
    } else {
      setNotification('Incorrect password.');
      setTimeout(() => setNotification(''), 3000);
    }
    setPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearTimeout(sessionTimeout);
    setPassword('');
    logActivity('Admin logged out');
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    setNotification('User deleted successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`User ${email} deleted`);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productWithId = { ...newProduct, id: Date.now() };
    setProducts([...products, productWithId]);
    setNewProduct({ name: '', category: '', price: 0, description: '', image: '', stock: 0, featured: false });
    setNotification('Product added successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`Product ${newProduct.name} added`);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
    setProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({ name: '', category: '', price: 0, description: '', image: '', stock: 0, featured: false });
    setNotification('Product updated successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`Product ${newProduct.name} updated`);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setNotification('Product deleted successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`Product with ID ${id} deleted`);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === 'checkbox' ? checked : (name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value)
    });
  };

  const exportUsers = () => {
    const data = users.map(user => `${user.name},${user.email},${user.location},${user.phone}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'users_export.txt');
    setNotification('Users exported successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity('Users exported');
  };

  const exportOrders = () => {
    const data = orders.map(order => `${order.name},${order.email},${order.totalPrice},${new Date(order.date).toLocaleDateString()}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'orders_export.txt');
    setNotification('Orders exported successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity('Orders exported');
  };

  const logActivity = (action) => {
    const logEntry = `${new Date().toLocaleString()} - ${action}`;
    const updatedLog = [logEntry, ...activityLog].slice(0, 10);
    setActivityLog(updatedLog);
  };

  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const userCount = users.length;
  const orderCount = orders.length;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-lg sm:max-w-md md:max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
          {notification && (
            <div className="mb-4 bg-red-500 text-white p-2 rounded-lg text-center">
              {notification}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <Helmet>
          <title>Admin Dashboard</title>
          <meta name="description" content="Admin dashboard for managing users, orders, and products." />
        </Helmet>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors w-full sm:w-auto text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
        {notification && (
          <div className="mb-2 sm:mb-4 bg-green-500 text-white p-1 sm:p-2 rounded-lg text-center text-sm sm:text-base">
            {notification}
          </div>
        )}
        <div className="mb-2 sm:mb-4">
          <input
            type="text"
            placeholder="Search users, orders, or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        {/* Analytics Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          <div className="p-2 bg-gray-700 rounded-lg text-center">
            <h4 className="text-base sm:text-lg font-semibold">Total Users</h4>
            <p className="text-lg sm:text-xl">{userCount}</p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg text-center">
            <h4 className="text-base sm:text-lg font-semibold">Total Orders</h4>
            <p className="text-lg sm:text-xl">{orderCount}</p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg text-center">
            <h4 className="text-base sm:text-lg font-semibold">Total Sales</h4>
            <p className="text-lg sm:text-xl">₦{totalSales.toLocaleString()}</p>
          </div>
        </div>

        {/* User Data Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4 gap-2 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-semibold">Users & Carts</h3>
            <button onClick={exportUsers} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 sm:px-3 rounded-lg w-full sm:w-auto text-sm">
              Export Users
            </button>
          </div>
          {filteredUsers.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px] text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Name</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Email</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Location</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Phone</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Cart Items</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.name}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.email}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.location}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.phone}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{'N/A'}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">
                        <button
                          onClick={() => handleDeleteUser(user.email)}
                          className="bg-red-500 hover:bg-red-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order History Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4 gap-2 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-semibold">Order History</h3>
            <button onClick={exportOrders} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 sm:px-3 rounded-lg w-full sm:w-auto text-sm">
              Export Orders
            </button>
          </div>
          {filteredOrders.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[380px] text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Name</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Email</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Items</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Total</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Location</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Phone</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.name}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.email}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">
                        {order.cartItems.map(item => (
                          <div key={item.id} className="text-xs">{item.name} (x{item.quantity})</div>
                        ))}
                      </td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">₦{order.totalPrice.toLocaleString()}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.location}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.phone}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Product Management Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Manage Products</h3>
          <form onSubmit={editingProduct ? handleSaveProduct : handleAddProduct} className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 gap-2 sm:gap-4">
              {['name', 'category', 'price', 'description', 'image', 'stock'].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-gray-300 mb-1 capitalize text-xs sm:text-sm">{field}</label>
                  <input
                    type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                    name={field}
                    value={newProduct[field]}
                    onChange={handleChange}
                    required={field !== 'image'}
                    className="p-1 sm:p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-xs sm:text-sm"
                  />
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={newProduct.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                />
                <label className="text-gray-300 text-xs sm:text-sm">Featured Product</label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
            >
              {editingProduct ? 'Save Product' : 'Add Product'}
            </button>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Name</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Category</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Price</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Stock</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Featured</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">{product.name}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">{product.category}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">₦{(typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0).toLocaleString()}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">{product.stock}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">{product.featured ? 'Yes' : 'No'}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          const newStock = prompt(`Enter new stock for ${product.name} (current: ${product.stock}):`, product.stock);
                          if (newStock !== null && !isNaN(newStock) && newStock >= 0) {
                            const updatedProducts = products.map(p =>
                              p.id === product.id ? { ...p, stock: parseInt(newStock) } : p
                            );
                            setProducts(updatedProducts);
                            setNotification('Stock updated successfully.');
                            setTimeout(() => setNotification(''), 3000);
                            logActivity(`Stock updated for ${product.name} to ${newStock}`);
                          } else if (newStock !== null) {
                            setNotification('Invalid stock value. Please enter a positive number.');
                            setTimeout(() => setNotification(''), 3000);
                          }
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                      >
                        Store Product
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mt-4 sm:mt-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Activity Log</h3>
          {activityLog.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No recent activity.</p>
          ) : (
            <ul className="space-y-1 sm:space-y-2">
              {activityLog.map((log, index) => (
                <li key={index} className="text-xs sm:text-sm">{log}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;escription: '', image: '', stock: 0 });
  const [editingProduct, setEditingProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityLog, setActivityLog] = useState(() => JSON.parse(localStorage.getItem('adminActivityLog')) || []);

  useEffect(() => {
    if (isAuthenticated) {
      const timeout = setTimeout(() => {
        handleLogout();
        setNotification('Session expired. Please log in again.');
        setTimeout(() => setNotification(''), 3000);
      }, 30 * 60 * 1000);
      setSessionTimeout(timeout);
    }
    return () => clearTimeout(sessionTimeout);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
    localStorage.setItem('adminOrders', JSON.stringify(orders));
    localStorage.setItem('adminActivityLog', JSON.stringify(activityLog));
  }, [users, orders, activityLog]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminConfig.password) {
      setIsAuthenticated(true);
      setNotification('Login successful!');
      setTimeout(() => setNotification(''), 3000);
      logActivity('Admin logged in');
    } else {
      setNotification('Incorrect password.');
      setTimeout(() => setNotification(''), 3000);
    }
    setPassword('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    clearTimeout(sessionTimeout);
    setPassword('');
    logActivity('Admin logged out');
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    setUsers(updatedUsers);
    setNotification('User deleted successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`User ${email} deleted`);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const productWithId = { ...newProduct, id: Date.now() };
    setProducts([...products, productWithId]);
    setNewProduct({ name: '', category: '', price: 0, description: '', image: '', stock: 0 });
    setNotification('Product added successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`Product ${newProduct.name} added`);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
    setProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({ name: '', category: '', price: 0, description: '', image: '', stock: 0 });
    setNotification('Product updated successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`Product ${newProduct.name} updated`);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setNotification('Product deleted successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity(`Product with ID ${id} deleted`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    });
  };

  const exportUsers = () => {
    const data = users.map(user => `${user.name},${user.email},${user.location},${user.phone}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'users_export.txt');
    setNotification('Users exported successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity('Users exported');
  };

  const exportOrders = () => {
    const data = orders.map(order => `${order.name},${order.email},${order.totalPrice},${new Date(order.date).toLocaleDateString()}`).join('\n');
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'orders_export.txt');
    setNotification('Orders exported successfully.');
    setTimeout(() => setNotification(''), 3000);
    logActivity('Orders exported');
  };

  const logActivity = (action) => {
    const logEntry = `${new Date().toLocaleString()} - ${action}`;
    const updatedLog = [logEntry, ...activityLog].slice(0, 10);
    setActivityLog(updatedLog);
  };

  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const userCount = users.length;
  const orderCount = orders.length;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full shadow-lg sm:max-w-md md:max-w-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">Admin Login</h2>
          {notification && (
            <div className="mb-4 bg-red-500 text-white p-2 rounded-lg text-center">
              {notification}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <Helmet>
          <title>Admin Dashboard</title>
          <meta name="description" content="Admin dashboard for managing users, orders, and products." />
        </Helmet>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors w-full sm:w-auto text-sm sm:text-base"
          >
            Logout
          </button>
        </div>
        {notification && (
          <div className="mb-2 sm:mb-4 bg-green-500 text-white p-1 sm:p-2 rounded-lg text-center text-sm sm:text-base">
            {notification}
          </div>
        )}
        <div className="mb-2 sm:mb-4">
          <input
            type="text"
            placeholder="Search users, orders, or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>

        {/* Analytics Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          <div className="p-2 bg-gray-700 rounded-lg text-center">
            <h4 className="text-base sm:text-lg font-semibold">Total Users</h4>
            <p className="text-lg sm:text-xl">{userCount}</p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg text-center">
            <h4 className="text-base sm:text-lg font-semibold">Total Orders</h4>
            <p className="text-lg sm:text-xl">{orderCount}</p>
          </div>
          <div className="p-2 bg-gray-700 rounded-lg text-center">
            <h4 className="text-base sm:text-lg font-semibold">Total Sales</h4>
            <p className="text-lg sm:text-xl">₦{totalSales.toLocaleString()}</p>
          </div>
        </div>

        {/* User Data Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4 gap-2 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-semibold">Users & Carts</h3>
            <button onClick={exportUsers} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 sm:px-3 rounded-lg w-full sm:w-auto text-sm">
              Export Users
            </button>
          </div>
          {filteredUsers.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No users found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px] text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Name</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Email</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Location</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Phone</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Cart Items</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.name}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.email}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.location}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{user.phone}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{'N/A'}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">
                        <button
                          onClick={() => handleDeleteUser(user.email)}
                          className="bg-red-500 hover:bg-red-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order History Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 sm:mb-4 gap-2 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-semibold">Order History</h3>
            <button onClick={exportOrders} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 sm:px-3 rounded-lg w-full sm:w-auto text-sm">
              Export Orders
            </button>
          </div>
          {filteredOrders.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No orders found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[380px] text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Name</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Email</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Items</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Total</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Location</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Phone</th>
                    <th className="p-1 sm:p-2 text-xs sm:text-sm">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.name}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.email}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">
                        {order.cartItems.map(item => (
                          <div key={item.id} className="text-xs">{item.name} (x{item.quantity})</div>
                        ))}
                      </td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">₦{order.totalPrice.toLocaleString()}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.location}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{order.phone}</td>
                      <td className="p-1 sm:p-2 text-xs sm:text-sm">{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Product Management Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Manage Products</h3>
          <form onSubmit={editingProduct ? handleSaveProduct : handleAddProduct} className="space-y-2 sm:space-y-4 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 gap-2 sm:gap-4">
              {['name', 'category', 'price', 'description', 'image', 'stock'].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-gray-300 mb-1 capitalize text-xs sm:text-sm">{field}</label>
                  <input
                    type={field === 'price' || field === 'stock' ? 'number' : 'text'}
                    name={field}
                    value={newProduct[field]}
                    onChange={handleChange}
                    required={field !== 'image'}
                    className="p-1 sm:p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 w-full text-xs sm:text-sm"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
            >
              {editingProduct ? 'Save Product' : 'Add Product'}
            </button>
          </form>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Name</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Category</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Price</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Stock</th>
                  <th className="p-1 sm:p-2 text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-700">
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">{product.name}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">{product.category}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">₦{(typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0).toLocaleString()}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm">{product.stock}</td>
                    <td className="p-1 sm:p-2 text-xs sm:text-sm flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          const newStock = prompt(`Enter new stock for ${product.name} (current: ${product.stock}):`, product.stock);
                          if (newStock !== null && !isNaN(newStock) && newStock >= 0) {
                            const updatedProducts = products.map(p =>
                              p.id === product.id ? { ...p, stock: parseInt(newStock) } : p
                            );
                            setProducts(updatedProducts);
                            setNotification('Stock updated successfully.');
                            setTimeout(() => setNotification(''), 3000);
                            logActivity(`Stock updated for ${product.name} to ${newStock}`);
                          } else if (newStock !== null) {
                            setNotification('Invalid stock value. Please enter a positive number.');
                            setTimeout(() => setNotification(''), 3000);
                          }
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-lg transition-colors text-xs w-full sm:w-auto"
                      >
                        Store Product
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log Section */}
        <div className="bg-gray-800 rounded-lg p-2 sm:p-4 mt-4 sm:mt-6 shadow-lg">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Activity Log</h3>
          {activityLog.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No recent activity.</p>
          ) : (
            <ul className="space-y-1 sm:space-y-2">
              {activityLog.map((log, index) => (
                <li key={index} className="text-xs sm:text-sm">{log}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
