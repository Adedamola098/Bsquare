import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Homepage from './Homepage';
import SignUp from './SignUp';
import ResetPassword from './ResetPassword';
import Cart from './Cart';
import { CartProvider } from './CartProvider';
import PlayStation from './PlayStation';
import Profile from './Profile';
import Admin from './Admin';
import { Helmet } from 'react-helmet';
import UserProvider from './UserProvider';


const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Helmet>
          <title>Welcome to Bsquare | The Best Gaming Accessories</title>
          <meta
            name="description"
            content="Shop the best gaming accessories at Bsquare. Find headsets, controllers, and more."
          />
          <meta
            name="keywords"
            content="gaming accessories, online store, best gaming gear, shop gaming accessories"
          />
          <meta name="author" content="Bsquare" />
        </Helmet>

        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/playstation" element={<PlayStation />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;