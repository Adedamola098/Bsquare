import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

const initialProducts = [
  { id: 1, name: 'Gaming Headset', category: 'Audio', price: 5000, description: 'High-quality gaming headset', image: 'https://via.placeholder.com/300x200?text=Headset', stock: 10 },
  { id: 2, name: 'Controller', category: 'Accessories', price: 3000, description: 'Wireless gaming controller', image: 'https://via.placeholder.com/300x200?text=Controller', stock: 15 },
];

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const storedProducts = JSON.parse(localStorage.getItem('adminProducts'));
    // Ensure prices are numbers when loading from localStorage
    if (storedProducts) {
      return storedProducts.map(product => ({
        ...product,
        price: parseFloat(product.price) || 0,
        stock: parseInt(product.stock) || 0
      }));
    }
    return initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  return (
    <AdminContext.Provider value={{ products, setProducts }}>
      {children}
    </AdminContext.Provider>
  );
};
