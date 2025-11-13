import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaEnvelope } from "react-icons/fa";
import logo from "../assets/Megha_jewels logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] text-[#f5e6c5]">
      <div className="p-10 flex flex-wrap justify-around items-start gap-12">
        {/* About Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-[Oswald] text-[#d4af37]">About Us</h1>
          <Link
            to="/about"
            className="hover:text-[#d4af37] transition-colors duration-200"
          >
            Mission
          </Link>
          <Link
            to="/about"
            className="hover:text-[#d4af37] transition-colors duration-200"
          >
            Our Team
          </Link>
        </div>

        {/* Support Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-[Oswald] text-[#d4af37]">Support</h1>
          <Link
            to="/contact"
            className="hover:text-[#d4af37] transition-colors duration-200"
          >
            Contact Us
          </Link>
          <Link
            to="/refund"
            className="hover:text-[#d4af37] transition-colors duration-200"
          >
            Refund Policy
          </Link>
          <Link
            to="/faq"
            className="hover:text-[#d4af37] transition-colors duration-200"
          >
            FAQ's
          </Link>
        </div>

        {/* Social Section */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-[Oswald] text-[#d4af37]">
            Connect With Us
          </h1>
          <a
            href="https://www.instagram.com/meghas_jewels_galore?igsh=MTcxbXpoeGF2NXZnYw=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4af37] transition-colors duration-200 flex items-center gap-2"
          >
            <FaInstagram /> Instagram
          </a>
          <a
            href="https://wa.me/916200597532"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4af37] transition-colors duration-200 flex items-center gap-2"
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=meghajewelsgalore@gmail.com&su=Jewelry%20Inquiry&body=Hello%20Megha's%20Jewels%20Galore,"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4af37] transition-colors duration-200 flex items-center gap-2"
          >
            <FaEnvelope /> Email
          </a>
        </div>

        <div className="flex flex-col items-center gap-3">
          <img
            src={logo}
            alt="Jewels Galore"
            className="w-[220px] h-[160px] rounded-2xl shadow-lg"
          />
          <h2 className="text-xl font-semibold text-[#d4af37]">
            Megha’s Jewels Galore
          </h2>
        </div>
      </div>

      <div className="flex justify-center p-5 border-t border-[#d4af37]/30">
        <p className="text-sm sm:text-base text-center">
          © {new Date().getFullYear()} Megha’s Jewels Galore. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
