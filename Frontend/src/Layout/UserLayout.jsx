import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const UserLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-[#b8860b]">My Account</h2>

        <ul className="space-y-3 text-gray-700">
          <li>
            <Link to="/dashboard" className="block hover:text-[#b8860b]">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/profile" className="block hover:text-[#b8860b]">
              Profile
            </Link>
          </li>

          <li>
            <Link to="/orders" className="block hover:text-[#b8860b]">
              Order History
            </Link>
          </li>

          <li>
            <Link to="/address" className="block hover:text-[#b8860b]">
              Address Book
            </Link>
          </li>
        </ul>

        <div className="text-sm text-gray-600">
          Logged in as:
          <br />
          <span className="font-medium">{user?.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default UserLayout;
