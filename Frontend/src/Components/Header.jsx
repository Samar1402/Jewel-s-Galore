import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.jpg"; // your uploaded logo

const Header = () => {
  return (
    <nav className="flex py-3 px-10 justify-between items-center bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] shadow-md">
      {/* Left Section - Logo */}
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Megha’s Jewels Galore Logo"
          className="w-16 h-16 rounded-full border-2 border-[#d4af37] object-cover"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex gap-20 items-center font-serif text-lg text-[#f5e6c5]">
        <Link
          to="/"
          className="hover:text-[#d4af37] transition-colors duration-200 font-medium"
        >
          Home
        </Link>
        <Link
          to="about"
          className="hover:text-[#d4af37] transition-colors duration-200 font-medium"
        >
          About Us
        </Link>
        <Link
          to="products"
          className="hover:text-[#d4af37] transition-colors duration-200 font-medium"
        >
          Products
        </Link>
        <Link
          to="contact"
          className="hover:text-[#d4af37] transition-colors duration-200 font-medium"
        >
          Contact
        </Link>
      </div>

      {/* Right Section - Social Icons & Login */}
      <div className="flex items-center gap-6">
        {/* WhatsApp */}
        <a
          href="https://wa.me/916200597532"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#25D366] text-2xl hover:text-[#d4af37] hover:scale-110 transform transition duration-200"
          title="Chat on WhatsApp"
        >
          <FaWhatsapp />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/meghas_jewels_galore?igsh=MTcxbXpoeGF2NXZnYw=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E1306C] text-2xl hover:text-[#d4af37] hover:scale-110 transform transition duration-200"
          title="Follow on Instagram"
        >
          <FaInstagram />
        </a>

        {/* Email */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=meghajewelsgalore@gmail.com&su=Jewelry%20Inquiry&body=Hello%20Megha's%20Jewels%20Galore,"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f5e6c5] text-2xl hover:text-[#d4af37] hover:scale-110 transform transition duration-200"
          title="Send Email"
        >
          <FaEnvelope />
        </a>

        {/* Login Button */}
        <Link to="/login">
          <button className="w-32 text-[#1a1a1a] font-semibold text-lg h-10 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f5e6c5] shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
