import React, { useEffect } from "react"; // Added useEffect
import { useAuth } from "../Context/AuthContext";
import UserLayout from "../Layout/UserLayout";
import { FaUserCircle, FaShoppingCart, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // --- AUTHENTICATION CHECK ---
  useEffect(() => {
    // If user is null (logged out), redirect them away from the dashboard
    if (user === null) {
      navigate("/"); // Redirects to home page, or change to "/login" if preferred
    }
  }, [user, navigate]);

  // If the user object is null, return null (or a spinner) while the redirect is processing
  if (!user) {
    return null; 
  }
  // ----------------------------

  return (
    <UserLayout>
      {/* Content container: adjusted spacing for mobile */}
      <div className="flex flex-col items-center mt-6 md:mt-10 space-y-4 md:space-y-6"> 
        
        {/* Welcome Card - Responsive padding and text size */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-full max-w-4xl p-4 md:p-8 rounded-2xl shadow-lg text-center">
          {/* FIX: user is now guaranteed to be defined here due to the check above */}
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Welcome, {user.name}!</h1> 
          <p className="text-sm md:text-lg">
            This is your account dashboard. Manage your profile, orders, and addresses easily.
          </p>
        </div>

        {/* Quick Action Cards - 2 columns on small screens, 3 on medium+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 w-full max-w-4xl">
          
          {/* Profile Card */}
          <div
            className="flex flex-col items-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer text-center"
            onClick={() => navigate("/profile")}
          >
            <FaUserCircle className="text-4xl md:text-5xl text-[#b8860b] mb-2 md:mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-1">Profile</h2>
            <p className="text-gray-500 text-xs md:text-sm">View and update your profile details.</p>
          </div>

          {/* Orders Card */}
          <div
            className="flex flex-col items-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer text-center"
            onClick={() => navigate("/orders")}
          >
            <FaShoppingCart className="text-4xl md:text-5xl text-[#b8860b] mb-2 md:mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-1">Orders</h2>
            <p className="text-gray-500 text-xs md:text-sm">Check your order history and status.</p>
          </div>

          {/* Address Card */}
          <div
            className="flex flex-col items-center p-4 md:p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer text-center"
            onClick={() => navigate("/address")}
          >
            <FaMapMarkerAlt className="text-4xl md:text-5xl text-[#b8860b] mb-2 md:mb-4" />
            <h2 className="text-lg md:text-xl font-semibold mb-1">Address</h2>
            <p className="text-gray-500 text-xs md:text-sm">Manage your shipping addresses.</p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Dashboard;