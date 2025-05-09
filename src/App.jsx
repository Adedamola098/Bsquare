import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CartProvider } from "./CartProvider";
import UserProvider from "./UserProvider";

// Lazy Load Components
const Homepage = lazy(() => import("./Homepage"));
const SignUp = lazy(() => import("./SignUp"));
const Login = lazy(() => import("./Login"));
const Cart = lazy(() => import("./Cart"));
const PlayStation = lazy(() => import("./PlayStation"));
const ResetPassword = lazy(() => import("./ResetPassword"));
const Profile = lazy(() => import("./Profile"));
const Admin = lazy(() => import("./Admin"));

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
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Bsquare",
              "url": "https://bsquare-gaming-venture.netlify.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target":
                  "https://bsquare-gaming-venture.netlify.app/?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            })}
          </script>
        </Helmet>

        <Router>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                Loading...
              </div>
            }
          >
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
          </Suspense>
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
