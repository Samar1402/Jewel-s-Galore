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
    <div className="flex w-full bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-white via-yellow-50 to-white shadow-lg
                      px-6 py-4 flex flex-col rounded-r-3xl mr-2 mt-2 mb-2">

        {/* Sidebar Header */}
        <h2 className="text-2xl font-bold text-[#b8860b] mb-8 text-center">
          My Account
        </h2>

        {/* Menu with increased spacing */}
        <ul className="flex-1 space-y-4 text-gray-700"> {/* increased from space-y-4 to space-y-6 */}
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300
                  ${location.pathname === item.path
                    ? "bg-[#b8860b] text-white shadow-lg"
                    : "hover:bg-[#fff5d1] hover:text-[#b8860b]"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Info */}
        <div className="bg-yellow-50 p-3 rounded-2xl shadow-inner border border-yellow-200 mt-auto text-center">
          <p className="text-sm text-gray-600 mb-2">Logged in as:</p>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <p className="font-semibold text-gray-800 text-lg text-red-600">{user?.name}</p>
          </div>
        </div>

      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto h-[calc(100vh-20px)]">
        {children}
      </div>

    </div>
  );
};

export default UserLayout;
