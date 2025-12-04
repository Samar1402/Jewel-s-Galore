import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa'; // Import spinner for loading screen

// Context (assuming your AuthContext is imported correctly)
import { useAuth } from "./Context/AuthContext"; 

// Components
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import About from "./Components/About";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ForgotPassword from "./Components/ForgotPassword";
import ContactUs from "./Components/ContactUs";
import RefundPolicy from "./Components/RefundPolicy";
import FAQ from "./Components/FAQ";
import Products from "./Components/Products";
import Cart from "./Components/Cart";

// User Pages
import Dashboard from "./pages/Dashboard";
import OrderHistory from "./pages/OrderHistory"; 
import Profile from "./pages/Profile";
import Address from "./pages/Address";

// Admin Pages
import AdminDashboard from "./admin/Layout/AdminDashboard";
import AdminProfile from "./admin/Layout/AdminProfile";
import AdminReports from "./admin/Layout/AdminReport.jsx";
import AdminProductForm from "./admin/Products/AdminProductForm.jsx";
import AdminProductList from "./admin/Products/AdminProductList.jsx";

// Admin Order Workflow Views
import OrderRequests from "./admin/Orders/OrderRequests";         
import OrderProcessing from "./admin/Orders/OrderProcessing";     
import OrderDispatch from "./admin/Orders/OrderDispatch.jsx";
import OrderDelivered from "./admin/Orders/OrderDelivered.jsx";
import AnalyticsPage from "./admin/Layout/AnalyticsPage.jsx";


const AppContent = () => {
  // Get user and the new isLoading state
  const { user, isLoading } = useAuth(); 
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  // NEW: Display loading screen while state is initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-3xl text-gray-500 mr-2" />
        <p className="text-lg text-gray-600">Loading Session...</p>
      </div>
    );
  }


  const adminPaths = [
    "/adminDashboard", 
    "/admin/profile",
    "/admin/products/add",
    "/admin/products/all",
    "/admin/orders",
    "/admin/orders/processing", 
    "/admin/orders/dispatch",
    "/admin/orders/delivered",
    "/admin/reports",
    "/admin/analytics"
];

  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path)) || 
                       (isAdmin && location.pathname === '/orders'); 

  const shouldHideNav = isAdmin && isAdminRoute;

  return (
    <>
      {/* Header */}
      {!shouldHideNav && <Header />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="refund" element={<RefundPolicy />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="cart" element={<Cart />} />

        {/* User Routes */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        
        <Route 
            path="orders" 
            element={isAdmin ? <OrderRequests /> : <OrderHistory />} 
        />
        
        <Route path="address" element={<Address />} />

        {/* Admin Routes */}
        <Route path="adminDashboard" element={<AdminDashboard />} />
        <Route path="admin/profile" element={<AdminProfile />} />

        {isAdmin && (
            <>
                <Route path="admin/orders/processing" element={<OrderProcessing />} />
                <Route path="admin/orders/dispatch" element={<OrderDispatch/>}/>
                <Route path="admin/orders/delivered" element={<OrderDelivered/>}/>
            </>
        )}
        <Route path="admin/reports" element={<AdminReports />} />
        <Route path="admin/analytics" element={<AnalyticsPage />} />
        <Route path="admin/products/add" element={<AdminProductForm />} />
        <Route path="admin/products/all" element={<AdminProductList />} />
      </Routes>

      {/* Footer */}
      {!shouldHideNav && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;