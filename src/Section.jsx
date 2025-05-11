import React from 'react';
import { ArrowRight, Star, Truck, Shield } from 'lucide-react';
import './App.css'
import { Helmet } from 'react-helmet';

const Section = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-transparent text-white py-16">
         <Helmet>
        <title>Bsqare - Gaming Accessories Store</title>
        <meta name="description" content="Explore our epic gaming collection with the latest products." />
        <meta name="keywords" content="gaming, accessories, console, PlayStation" />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="header font-extrabold mb-6 drop-shadow-xl leading-tight">
          Level Up with <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">Bsquare</span>
        </h1>
        <p className="text-lg md:text-2xl text max-w-3xl mx-auto mb-10 opacity-90 leading-relaxed">
          Dive into our epic collection of gaming gear, consoles, and accessories built for ultimate immersion. Join the game today and dominate the leaderboard.
        </p>
        <a
          href="#products"
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105 shadow-lg"
        >
          Start Gaming Now
          <ArrowRight className="ml-2" size={20} />
        </a>
        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center transform transition hover:scale-105">
            <Star className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold text text-white mb-2">Elite Performance</h3>
            <p className="text-sm opacity-80 text text-center">
              Top-tier gaming gear engineered for precision and speed.
            </p> 
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center transform transition hover:scale-105">
            <Truck className="text-blue-400 text mb-4" size={32} />
            <h3 className="text-xl font-semibold text text-white mb-2">Rapid Delivery</h3>
            <p className="text-sm opacity-80 text text-center">
              Get your gaming essentials delivered in record time.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center transform transition hover:scale-105">
            <Shield className="text-blue-400 mb-4" size={32} />
            <h3 className="text-xl font-semibold text text-white mb-2">Safe Purchases</h3>
            <p className="text-sm opacity-80 text text-center">
              Shop securely with trusted payment protection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
