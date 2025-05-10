import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

const initialProducts = [
  { id: 1, name: 'Gaming Headset', category: 'Audio', price: 5000, description: 'High-quality gaming headset', image: 'https://via.placeholder.com/300x200?text=Headset', stock: 10, featured: true },
  { id: 2, name: 'Controller', category: 'Accessories', price: 3000, description: 'Wireless gaming controller', image: 'https://via.placeholder.com/300x200?text=Controller', stock: 15, featured: false },
  { id: 3, name: 'Gaming Mouse', category: 'Accessories', price: 2000, description: 'Ergonomic gaming mouse', image: 'https://via.placeholder.com/300x200?text=Mouse', stock: 20, featured: true },
];

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const storedProducts = JSON.parse(localStorage.getItem('adminProducts'));
    if (storedProducts) {
      return storedProducts.map(product => ({
        ...product,
        price: parseFloat(product.price) || 0,
        stock: parseInt(product.stock) || 0,
        featured: product.featured ?? false, // Default to false if not set
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
