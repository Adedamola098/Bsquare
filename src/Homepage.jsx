import React from 'react';
import Navbar from './Components/Navbar';
import Section from './Section';
import Product from './Product';
import Store from './Store';
import ContactUs from './ContactUs';
import Footer from './Components/Footer';
import { Helmet } from 'react-helmet';

const Homepage = () => {
  return (
    <div>
      <Helmet>
        <title>Homepage | Your Gaming Accessories Store</title>
        <meta
          name="description"
          content="Browse and shop for top-quality gaming accessories. Find headsets, controllers, and more!"
        />
        <meta
          name="keywords"
          content="gaming accessories, gaming store, buy gaming gear, headsets, controllers, online game store"
        />
        <meta name="author" content="Bsquare" />
      </Helmet>

      <div className="relative min-h-screen">
        <img src="s.jpg" alt="" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
        <div className="relative z-20">
          <Navbar />
          <div className="pt-16">
            <Section />
            <Product />
            <Store />
            <ContactUs />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;