import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.jpg";

const Header = () => {
  const [cartCount, setCartCount] = useState(0);

  // 🛍 Get cart count from localStorage whenever it changes
  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = savedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();

    // Listen for changes across tabs or updates
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="flex flex-wrap justify-between items-center py-3 px-6 md:px-10 bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Megha’s Jewels Galore Logo"
          className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#d4af37] object-cover"
        />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex gap-10 lg:gap-20 items-center font-serif text-base lg:text-lg text-[#f5e6c5]">
        <Link to="/" className="hover:text-[#d4af37] transition-colors duration-200 font-medium">
          Home
        </Link>
        <Link to="/about" className="hover:text-[#d4af37] transition-colors duration-200 font-medium">
          About Us
        </Link>
        <Link to="/products" className="hover:text-[#d4af37] transition-colors duration-200 font-medium">
          Products
        </Link>
        <Link to="/contact" className="hover:text-[#d4af37] transition-colors duration-200 font-medium">
          Contact
        </Link>

        {/* 🛒 Cart Link with Count Badge */}
        <Link to="/cart" className="relative hover:text-[#d4af37] transition-colors duration-200 font-medium flex items-center">
          <FaShoppingCart className="mr-1 text-lg" />
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-4 bg-[#d4af37] text-[#1a1a1a] font-bold text-xs rounded-full px-2 py-0.5 shadow-md">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Right Section - Icons & Login */}
      <div className="flex items-center gap-4 md:gap-6 mt-3 md:mt-0">
        <a
          href="https://wa.me/916200597532"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] text-2xl hover:text-[#d4af37] hover:scale-110 transform transition duration-200"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://www.instagram.com/meghas_jewels_galore"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E1306C] text-2xl hover:text-[#d4af37] hover:scale-110 transform transition duration-200"
          title="Follow on Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href="mailto:meghajewelsgalore@gmail.com?subject=Jewelry Inquiry&body=Hello Megha's Jewels Galore,"
          className="text-[#f5e6c5] text-2xl hover:text-[#d4af37] hover:scale-110 transform transition duration-200"
          title="Send Email"
        >
          <FaEnvelope />
        </a>

        <Link to="/login">
          <button className="w-28 md:w-32 text-[#1a1a1a] font-semibold text-base md:text-lg h-9 md:h-10 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f5e6c5] shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
