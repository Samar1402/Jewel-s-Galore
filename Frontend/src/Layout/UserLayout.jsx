import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaTachometerAlt, FaUser, FaShoppingBag, FaMapMarkerAlt } from "react-icons/fa";

const UserLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Order History", icon: <FaShoppingBag />, path: "/orders" },
    { name: "Address", icon: <FaMapMarkerAlt />, path: "/address" },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full bg-gray-100 min-h-screen">

      {/* Sidebar - Adjust width, padding, and margins for responsiveness */}
      <div className="w-full md:w-72 bg-gradient-to-b from-white via-yellow-50 to-white shadow-lg
                      p-4 md:px-6 md:py-4 flex flex-col md:rounded-r-3xl md:mr-2 md:mt-2 md:mb-2 
                      rounded-none border-b-2 border-yellow-200">

        {/* Sidebar Header - Hidden on small screens */}
        <h2 className="text-2xl font-bold text-[#b8860b] mb-4 md:mb-8 text-center hidden md:block"> 
          My Account
        </h2>

        {/* Menu - Changes from vertical list to horizontal scroll on mobile */}
        <ul className="flex md:flex-col overflow-x-auto space-x-2 md:space-x-0 md:space-y-4 flex-1 text-gray-700"> 
          {menuItems.map((item) => (
            <li key={item.name} className="flex-shrink-0">
              <Link
                to={item.path}
                className={`flex items-center gap-2 p-2 md:gap-3 md:p-4 rounded-xl transition-all duration-300
                  ${location.pathname === item.path
                    ? "bg-[#b8860b] text-white shadow-lg"
                    : "hover:bg-[#fff5d1] hover:text-[#b8860b]"
                  }`}
              >
                {/* Smaller icon and text size on mobile */}
                <span className="text-base md:text-lg">{item.icon}</span> 
                <span className="font-medium text-sm md:text-lg whitespace-nowrap">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Info - Hidden on mobile to save space */}
        <div className="bg-yellow-50 p-3 rounded-2xl shadow-inner border border-yellow-200 mt-auto text-center hidden md:block">
          <p className="text-sm text-gray-600 mb-2">Logged in as:</p>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <p className="font-semibold text-gray-800 text-lg text-red-600">{user?.name}</p>
          </div>
        </div>

      </div>

      {/* Main content - Adjusted padding and dynamic height for mobile */}
      <div className="flex-1 px-4 py-4 md:px-6 md:py-6 overflow-y-auto min-h-[calc(100vh-60px)] md:h-[calc(100vh-20px)]">
        {children}
      </div>

    </div>
  );
};

export default UserLayout;