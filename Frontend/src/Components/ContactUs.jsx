import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import UserLayout from "../Layout/UserLayout";

const ContactUs = () => {
  const { user } = useAuth();

  const content = (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
        {/* Title */}
        <h2 className="text-4xl font-serif font-semibold text-center text-[#b8860b] mb-10">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="text-gray-700 space-y-6">
            <p className="text-lg">
              We'd love to hear from you! Fill out the form or reach us directly
              through the details below.
            </p>

            <div className="flex items-center gap-3">
              <Mail className="text-[#b8860b]" />
              <span>meghajewelsgalore@gmail.com</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-[#b8860b]" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-[#b8860b]" />
              <span>Patna, Bihar, India</span>
            </div>

            <div className="pt-4">
              <p className="font-semibold text-[#b8860b] mb-2">Follow Us</p>
              <div className="flex gap-4 text-gray-600">
                <a href="#" className="hover:text-[#b8860b]">
                  Facebook
                </a>
                <a href="#" className="hover:text-[#b8860b]">
                  Twitter
                </a>
                <a href="#" className="hover:text-[#b8860b]">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If logged in → show with sidebar
  if (user) {
    return <UserLayout>{content}</UserLayout>;
  }

  // If not logged in → show normally
  return content;
};

export default ContactUs;
