import React from "react";
import Navbar from "./Components/Navbar";
import Section from "./Section";
import Product from "./Product";
import Store from "./Store";
import ContactUs from "./ContactUs";
import Footer from "./Components/Footer";
import { Helmet } from "react-helmet";

const Homepage = () => {
  return (
    <div>
      <Helmet>
        <title>
          Bsquare Gaming Store – Buy Games & PS1–PS5 Controllers in Nigeria
        </title>

        <meta
          name="description"
          content="Buy original PS1–PS5 controllers, gaming pads, console games, and accessories in Nigeria. Fast delivery and affordable pricing."
        />

        <meta
          name="keywords"
          content="bsquare gaming store, ps5 pad, ps4 pad, ps3 pad, gaming accessories nigeria, buy ps5 controller nigeria, console games nigeria"
        />

        <link rel="canonical" href="https://www.bsquare.shop/" />

        <meta
          property="og:title"
          content="Bsquare Gaming Store – Quality Gaming Accessories"
        />
        <meta
          property="og:description"
          content="Get quality gaming pads, controllers, and console accessories."
        />
        <meta
          property="og:image"
          content="https://www.bsquare.shop/og-image.jpg"
        />
        <script type="application/ld+json">
          {`
{
  "@context": "https://schema.org/",
  "@type": "Store",
  "name": "Bsquare Gaming Store",
  "url": "https://www.bsquare.shop/",
  "logo": "https://www.bsquare.shop/logo.png",
  "description": "Buy original PS1–PS5 controllers, console games, and accessories in Nigeria.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NG"
  }
}
`}
        </script>
      </Helmet>

      <div className="relative min-h-screen">
        <img
          src="s.jpg"
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
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
