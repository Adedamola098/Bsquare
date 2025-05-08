import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from './CartProvider';
import { Helmet } from 'react-helmet';

const Profile = ({ user, setUser }) => {
  const { cart } = useContext(CartContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setEditData({ ...user });
  }, [user]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!editData.name || !editData.email || !editData.location || !editData.phone) {
      setNotification('All fields are required.');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    setUser(editData);
    setIsEditing(false);
    setNotification('Profile updated successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      <img src="g.jpg" alt="" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-lg">
          {notification && (
            <div className="mb-4 bg-green-500 text-white p-2 rounded-lg text-center">
              {notification}
            </div>
          )}
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-2xl text-white font-semibold">{user.name}</h2>
              <p className="text-gray-400">Web Developer</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 block mb-1">Email</label>
              <p className="bg-gray-700 text-white p-2 rounded">{user.email}</p>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Location</label>
              <p className="bg-gray-700 text-white p-2 rounded">{user.location}</p>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Phone</label>
              <p className="bg-gray-700 text-white p-2 rounded">{user.phone}</p>
            </div>
            <div>
              <label className="text-gray-400 block mb-1">Cart Items</label>
              <p className="bg-gray-700 text-white p-2 rounded">{totalItems} items</p>
            </div>
          </div>
          <button
            onClick={handleEdit}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Profile Modal */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20 p-4">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">Edit Profile</h3>
              <form onSubmit={handleSave} className="space-y-4">
                {['name', 'email', 'location', 'phone'].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-gray-300 mb-1 capitalize">{field}</label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      name={field}
                      value={editData[field]}
                      onChange={handleChange}
                      required
                      className="p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;