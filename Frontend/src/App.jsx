import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Context
import { useAuth } from "./Context/AuthContext.jsx"; 

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
import AdminDashboard from "./admin/AdminDashboard";
import AdminProfile from "./admin/AdminProfile";

// Admin Order Workflow Views
import OrderRequests from "./admin/Orders/OrderRequests";         
import OrderProcessing from "./admin/Orders/OrderProcessing";     


const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isAdmin = user?.role === "admin";

  const adminPaths = [
    "/adminDashboard", 
    "/admin/profile",
    "/admin/orders/processing" 
];

  // Check current route 
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
        
        {/* Role-Based Order Routing for /orders */}
        <Route 
            path="orders" 
            element={isAdmin ? <OrderRequests /> : <OrderHistory />} 
        />
        
        <Route path="address" element={<Address />} />

        {/* Admin Routes */}
        <Route path="adminDashboard" element={<AdminDashboard />} />
        <Route path="admin/profile" element={<AdminProfile />} />

        {/* Nested Admin Order Route */}
        {isAdmin && (
            <>
                <Route path="admin/orders/processing" element={<OrderProcessing />} />
                {/* Add paths for dispatch and delivered views here */}
            </>
        )}
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