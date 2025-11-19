import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa"; 
import logo from "../assets/logo.jpg";
import { useAuth } from "../Context/AuthContext"; 
import { useCart } from "../Components/CartContext"; 

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false); 

    const { cartItems } = useCart(); 
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleNavigation = (path) => {
        setIsMenuOpen(false);
        navigate(path);
    };

    const NavLink = ({ to, children }) => (
        <Link 
            to={to} 
            className="hover:text-[#d4af37] transition-colors duration-200 font-medium" 
            onClick={() => setIsMenuOpen(false)} 
        >
            {children}
        </Link>
    );

    return (
        <nav className="flex justify-between items-center py-3 px-6 md:px-10 bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] shadow-md relative">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer z-10" onClick={() => handleNavigation("/")}>
                <img
                    src={logo}
                    alt="Megha’s Jewels Galore"
                    className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#d4af37] object-cover"
                />
            </div>

            {/* Hamburger Button (Visible on Mobile) */}
            <button 
                className="text-[#f5e6c5] text-2xl md:hidden z-10 order-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Navigation Links Container (Hidden on Mobile by default) */}
            <div className={`
                absolute md:static 
                top-0 left-0 w-full md:w-auto
                bg-gradient-to-r from-[#1a1a1a] via-[#2c2c2c] to-[#1a1a1a] md:bg-none
                shadow-xl md:shadow-none
                flex-col md:flex-row 
                items-center 
                font-serif text-base lg:text-lg text-[#f5e6c5]
                transition-transform duration-300 ease-in-out z-[9]
                ${isMenuOpen ? 'flex pt-20 pb-4 space-y-4' : 'hidden md:flex gap-10 lg:gap-20'} 
            `}>
                <NavLink to="/"> Home </NavLink>
                <NavLink to="/about"> About Us </NavLink>
                <NavLink to="/products"> Products </NavLink>
                <NavLink to="/contact"> Contact </NavLink>

                {/* 🛍 Cart Only When Logged In */}
                {user && (
                    <NavLink to="/cart">
                        <span className="relative flex items-center">
                            <FaShoppingCart className="mr-1 text-lg" />
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-3 -right-4 bg-[#d4af37] text-[#1a1a1a] font-bold text-xs rounded-full px-2 py-0.5 shadow-md">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                    </NavLink>
                )}
            </div>

            {/* Right Icons + Login/Logout */}
            <div className="flex items-center gap-4 md:gap-6">
                <a href="https://wa.me/916200597532" target="_blank" rel="noopener noreferrer" className="text-[#25D366] text-2xl hover:text-[#d4af37] hover:scale-110 transition"><FaWhatsapp /></a>
                <a href="https://www.instagram.com/meghas_jewels_galore" target="_blank" rel="noopener noreferrer" className="text-[#E1306C] text-2xl hover:text-[#d4af37] hover:scale-110 transition"><FaInstagram /></a>
                
                {/* 🔑 CHANGE: Updated URL to force the full-screen compose view in Gmail */}
                <a 
                    href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=meghajewelsgalore@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#f5e6c5] text-2xl hover:text-[#d4af37] hover:scale-110 transition"
                >
                    <FaEnvelope />
                </a>

                {!user ? (
                    <Link to="/login">
                        <button className="w-28 md:w-32 text-[#1a1a1a] font-semibold text-base md:text-lg h-9 md:h-10 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f5e6c5] shadow-lg hover:scale-105 transition"> Login </button>
                    </Link>
                ) : (
                    <button onClick={() => { logout(); navigate("/"); }} className="w-28 md:w-32 text-white font-semibold text-base md:text-lg h-9 md:h-10 rounded-xl bg-red-600 shadow-lg hover:bg-red-700 hover:scale-105 transition"> Logout </button>
                )}
            </div>
        </nav>
    );
};

export default Header;