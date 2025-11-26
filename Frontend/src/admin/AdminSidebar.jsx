import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserCircle,
  FaShoppingCart,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaChartLine,
  FaFileAlt,
  // Removed FaCog, FaDatabase, FaCogs
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const AdminSidebar = ({ closeSidebar }) => {
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const navigate = useNavigate();
  // useAuth assumes path is '../Context/AuthContext' relative to admin/AdminSidebar.jsx
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    if (closeSidebar) closeSidebar();
  };

  const menu = [
    { name: "Dashboard", path: "/adminDashboard", icon: FaTachometerAlt },
    { name: "Profile", path: "/admin/profile", icon: FaUserCircle },
    { name: "Orders", icon: FaShoppingCart, dropdown: true },
    // Extra menu items for completeness
    { name: "Reports", path: "/admin/reports", icon: FaFileAlt },
    { name: "Analytics", path: "/admin/analytics", icon: FaChartLine },
    // Removed Settings, Logs, Backups, and Integrations
  ];

  const ordersMenu = [
    { name: "Order Processing", path: "/admin/orders/processing" },
    { name: "Order Dispatch", path: "/admin/orders/dispatch" },
    { name: "Order Delivered", path: "/admin/orders/delivered" },
  ];

  // Enhanced UX Styles
  const base = "flex items-center p-3 rounded-xl text-sm transition-all duration-200 ease-in-out";
  // Active state: Brighter yellow/gold with dark text and a subtle shadow for elevation
  const active = "bg-yellow-500 text-gray-900 font-extrabold shadow-md transform scale-[1.01]";
  // Inactive state: Subtle hover background, slightly brighter text
  const inactive = "hover:bg-gray-700/70 text-gray-200 hover:text-white";

  return (
    <nav className="flex-1 p-4 flex flex-col overflow-visible">
      {menu.map((item) => (
        <div key={item.name} className="mb-1">
          {!item.dropdown ? (
            <NavLink
              to={item.path}
              onClick={() => closeSidebar && closeSidebar()}
              className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
            >
              <item.icon className="mr-3 w-4 h-4" />
              <span>{item.name}</span>
            </NavLink>
          ) : (
            <>
              <button
                onClick={() => setIsOrdersOpen((s) => !s)}
                className={`${base} w-full justify-between ${inactive} mb-1`}
                type="button"
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 w-4 h-4" />
                  <span>{item.name}</span>
                </div>
                {isOrdersOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {isOrdersOpen && (
                <div className="ml-6 mt-1 space-y-1 p-2 bg-gray-700/50 rounded-lg">
                  {ordersMenu.map((sub) => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      onClick={() => closeSidebar && closeSidebar()}
                      // Sub-links now have 'block' and use the same active/inactive styles
                      className={({ isActive }) => `${base} ${isActive ? active : inactive} block`}
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}

      <div className="mt-auto pt-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          // Logout button enhanced with rounded corners, shadow, and font weight
          className="w-full p-3 bg-red-600 hover:bg-red-700 rounded-xl flex items-center justify-center text-white font-semibold transition duration-200 shadow-lg"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminSidebar;