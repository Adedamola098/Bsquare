import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if user is logged in by verifying session
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/protected', { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading if the status is still being checked
  }

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return children; // Show the protected content if logged in
};

export default ProtectedRoute;
