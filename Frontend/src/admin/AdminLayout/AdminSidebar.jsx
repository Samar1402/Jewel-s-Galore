import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaUserCircle,
    FaShoppingCart,
    FaChevronDown,
    FaChevronUp,
    FaSignOutAlt,
    FaFileAlt,
    FaBoxes,
    FaPlusCircle, 
} from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";

const AdminSidebar = ({ closeSidebar }) => {
    const [isProductsOpen, setIsProductsOpen] = useState(false);
    const [isOrdersOpen, setIsOrdersOpen] = useState(false); 
    
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true }); 
        if (closeSidebar) closeSidebar();
    };

    const toggleDropdown = (itemName) => {
        if (itemName === "Products") {
            setIsProductsOpen((s) => !s);
            setIsOrdersOpen(false); 
        } else if (itemName === "Orders") {
            setIsOrdersOpen((s) => !s);
            setIsProductsOpen(false); 
        }
    };
    
    const getDropdownData = (itemName) => {
        if (itemName === "Products") return { isOpen: isProductsOpen, menu: productMenu };
        if (itemName === "Orders") return { isOpen: isOrdersOpen, menu: ordersMenu };
        return { isOpen: false, menu: [] };
    };

    const menu = [
        { name: "Dashboard", path: "/adminDashboard", icon: FaTachometerAlt },
        { name: "Profile", path: "/admin/profile", icon: FaUserCircle },
        { name: "Products", icon: FaBoxes, dropdown: true }, 
        { name: "Orders", icon: FaShoppingCart, dropdown: true }, 
        { name: "Reports", path: "/admin/reports", icon: FaFileAlt },
        // { name: "Analytics", path: "/admin/analytics", icon: FaChartLine },
    ];
    
    const productMenu = [
        { name: "Add Product", path: "/admin/products/add", icon: FaPlusCircle }, 
        { name: "View All", path: "/admin/products/all", icon: FaBoxes },
    ];
    
    const ordersMenu = [
        { name: "Order Request", path: "/orders" },
        { name: "Order Processing", path: "/admin/orders/processing" },
        { name: "Order Dispatch", path: "/admin/orders/dispatch" },
        { name: "Order Delivered", path: "/admin/orders/delivered" },
    ];

    const base = "flex items-center p-3 rounded-xl text-sm transition-all duration-200 ease-in-out";
    const active = "bg-yellow-500 text-gray-900 font-extrabold shadow-md transform scale-[1.01]";
    const inactive = "hover:bg-gray-700/70 text-gray-200 hover:text-white";

    return (
        <nav className="flex-1 p-4 flex flex-col overflow-visible">
            {menu.map((item) => {
                const { isOpen, menu: subMenu } = getDropdownData(item.name);

                return (
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
                                {/* Dropdown Button */}
                                <button
                                    onClick={() => toggleDropdown(item.name)} 
                                    className={`${base} w-full justify-between ${inactive} mb-1`}
                                    type="button"
                                >
                                    <div className="flex items-center">
                                        <item.icon className="mr-3 w-4 h-4" />
                                        <span>{item.name}</span>
                                    </div>
                                    {isOpen ? <FaChevronUp /> : <FaChevronDown />} 
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="ml-6 mt-1 space-y-1 p-2 bg-gray-700/50 rounded-lg">
                                        {subMenu.map((sub) => (
                                            <NavLink
                                                key={sub.path}
                                                to={sub.path}
                                                onClick={() => closeSidebar && closeSidebar()}
                                                className={({ isActive }) => `${base} ${isActive ? active : inactive} block`}
                                            >
                                                {sub.icon && <sub.icon className="mr-2 w-3 h-3" />}
                                                {sub.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );
            })}

            <div className="mt-auto pt-4 border-t border-gray-700">
                <button
                    onClick={handleLogout}
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