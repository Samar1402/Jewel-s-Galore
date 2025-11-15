import React from "react";
import { useAuth } from "../Context/AuthContext";
import UserLayout from "../Layout/UserLayout";
import { FaUserCircle, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="flex flex-col items-center mt-10 space-y-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-full max-w-4xl p-8 rounded-2xl shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-lg">
            This is your account dashboard. Manage your profile, orders, and addresses easily.
          </p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Profile Card */}
          <div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <FaUserCircle className="text-5xl text-[#b8860b] mb-4" />
            <h2 className="text-xl font-semibold mb-1">Profile</h2>
            <p className="text-gray-500 text-center">View and update your profile details.</p>
          </div>

          {/* Orders Card */}
          <div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => navigate("/orders")}
          >
            <FaShoppingCart className="text-5xl text-[#b8860b] mb-4" />
            <h2 className="text-xl font-semibold mb-1">Orders</h2>
            <p className="text-gray-500 text-center">Check your order history and status.</p>
          </div>

          {/* Address Card */}
          <div
            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => navigate("/address")}
          >
            <FaMapMarkerAlt className="text-5xl text-[#b8860b] mb-4" />
            <h2 className="text-xl font-semibold mb-1">Address</h2>
            <p className="text-gray-500 text-center">Manage your shipping addresses.</p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;
