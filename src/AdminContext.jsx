import React, { createContext, useState, useEffect } from "react";
import { Products as DefaultProducts, storeproducts as DefaultStore } from "./Data";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Load stored data or fallback to defaults
  const [products, setProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("admin_products")) || DefaultProducts;
  });

  const [storeProducts, setStoreProducts] = useState(() => {
    return JSON.parse(localStorage.getItem("admin_store")) || DefaultStore;
  });

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("admin_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("admin_store", JSON.stringify(storeProducts));
  }, [storeProducts]);

  // Add product to GAMES section
  const addProduct = (product) => {
    const newId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  // Add product to STORE section
  const addStoreProduct = (product) => {
    const newId =
      storeProducts.length > 0
        ? Math.max(...storeProducts.map((p) => p.id)) + 1
        : 1;
    setStoreProducts([...storeProducts, { ...product, id: newId }]);
  };

  // Edit game
  const editProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  // Edit store item
  const editStoreProduct = (id, updated) => {
    setStoreProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  // Delete game
  const deleteProduct = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  // Delete store item
  const deleteStoreProduct = (id) => {
    setStoreProducts(storeProducts.filter((item) => item.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        products,         // Games
        storeProducts,    // Accessories / Consoles / Services
        setProducts,
        setStoreProducts,
        addProduct,
        addStoreProduct,
        editProduct,
        editStoreProduct,
        deleteProduct,
        deleteStoreProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
