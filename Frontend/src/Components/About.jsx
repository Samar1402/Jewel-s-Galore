import React from "react";
import UserLayout from "../Layout/UserLayout";
import { useAuth } from "../Context/AuthContext";
import { FaGem, FaBullseye, FaHeart, FaPhoneAlt, FaEnvelope, FaInstagram, FaTimesCircle } from "react-icons/fa";

const About = () => {
  const { user } = useAuth(); // check login

  const content = (
    <div className="bg-gradient-to-b from-yellow-50 to-white py-12 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center">

        {/* Hero Section */}
        <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-8">
          💎 About Megha’s Jewels Galore
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
          Megha’s Jewels Galore is a Patna-based jewelry brand celebrating timeless beauty and craftsmanship.
          We specialize in handcrafted jewelry blending traditional artistry with modern design.
        </p>

        {/* Mission Card */}
        <div className="bg-amber-100 rounded-2xl shadow-lg p-8 mb-12 hover:scale-105 transition-transform">
          <div className="flex items-center justify-center mb-4">
            <FaBullseye className="text-amber-700 text-3xl mr-3" />
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-700">✨ Our Mission</h2>
          </div>
          <p className="text-gray-700">
            To create jewelry that enhances your beauty and tells your unique story.
          </p>
        </div>

        {/* Offerings Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
          {/* What We Offer */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <div className="flex items-center mb-4">
              <FaGem className="text-amber-500 text-2xl mr-2" />
              <h3 className="text-xl font-semibold text-amber-700">💍 What We Offer</h3>
            </div>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li>Designer Jewelry (Gold, Silver, Imitation)</li>
              <li>Custom-made Jewelry</li>
              <li>Bridal & Occasion Collections</li>
              <li>Daily Wear Elegant Pieces</li>
              <li>Affordable Premium Quality</li>
            </ul>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
            <div className="flex items-center mb-4">
              <FaHeart className="text-amber-500 text-2xl mr-2" />
              <h3 className="text-xl font-semibold text-amber-700">🌸 Why Choose Us</h3>
            </div>
            <ul className="text-gray-700 list-disc list-inside space-y-1">
              <li>Anti-tarnish, Waterproof Finish</li>
              <li>Trendy + Timeless Designs</li>
              <li>Personalized Orders</li>
              <li>Customer-Centric Service</li>
              <li>PAN India Delivery</li>
            </ul>
          </div>
        </div>

        {/* COD Notice */}
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-2xl mb-8 flex items-center justify-center space-x-3">
          <FaTimesCircle className="text-red-500 text-2xl"/>
          <p className="font-semibold text-lg">⚠️ Cash on Delivery (COD) is not available. Please use online payment methods.</p>
        </div>

        {/* Contact Card */}
        <div className="bg-amber-50 rounded-2xl shadow-lg p-8 hover:scale-105 transition-transform">
          <div className="flex items-center justify-center mb-4">
            <FaPhoneAlt className="text-amber-700 text-3xl mr-3" />
            <h2 className="text-2xl md:text-3xl font-semibold text-amber-700">Contact Us</h2>
          </div>
          <p className="text-gray-700 mb-2">
            📍 Patna, Bihar
          </p>
          <p className="text-gray-700 mb-2 flex items-center justify-center gap-2">
            <FaEnvelope className="text-amber-700"/> 
            <a href="mailto:meghajewelsgalore@gmail.com" className="hover:underline">meghajewelsgalore@gmail.com</a>
          </p>
          <p className="text-gray-700 mb-2 flex items-center justify-center gap-2">
            <FaPhoneAlt className="text-amber-700"/>
            <a href="https://wa.me/916200597532" target="_blank" rel="noreferrer" className="hover:underline">+91 6200597532</a>
          </p>
          <p className="text-gray-700 flex items-center justify-center gap-2">
            <FaInstagram className="text-amber-700"/>
            <a href="https://www.instagram.com/meghas_jewels_galore" target="_blank" rel="noreferrer" className="hover:underline">@meghas_jewels_galore</a>
          </p>
        </div>

      </div>
    </div>
  );

  if (user) {
    return <UserLayout>{content}</UserLayout>;
  }

  return content;
};

export default About;
