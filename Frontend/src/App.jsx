// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa'; 
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
import Cart from "./Components/Cart"; // ⬅️ Will be protected

// User Pages ⬅️ All these will be protected
import Dashboard from "./pages/Dashboard";
import OrderHistory from "./pages/OrderHistory"; 
import Profile from "./pages/Profile";
import Address from "./pages/Address";

// Admin Pages
import AdminDashboard from "./admin/AdminLayout/AdminDashboard";
import AdminProfile from "./admin/AdminLayout/AdminProfile";
import AdminReports from "./admin/AdminLayout/AdminReport.jsx";
import AdminProductForm from "./admin/Products/AdminProductForm.jsx";
import AdminProductList from "./admin/Products/AdminProductList.jsx";

// Admin Order Workflow Views
import OrderRequests from "./admin/Orders/OrderRequests";         
import OrderProcessing from "./admin/Orders/OrderProcessing";     
import OrderDispatch from "./admin/Orders/OrderDispatch.jsx";
import OrderDelivered from "./admin/Orders/OrderDelivered.jsx";
import AnalyticsPage from "./admin/AdminLayout/AnalyticsPage.jsx";

const PrivateRoute = () => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <FaSpinner className="animate-spin text-3xl text-gray-500 mr-2" />
                <p className="text-lg text-gray-600">Loading Session...</p>
            </div>
        );
    }

    const isAuthenticated = !!user;

    if (isAuthenticated) {
        return <Outlet />;
    }
    return <Navigate to="/login" replace />; 
};
const AdminRoute = () => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <FaSpinner className="animate-spin text-3xl text-gray-500 mr-2" />
                <p className="text-lg text-gray-600">Loading Session...</p>
            </div>
        );
    }

    const isAdmin = user?.role === "admin";

    if (isAdmin) {
        return <Outlet />;
    }
    return <Navigate to="/" replace />; 
};


const AppContent = () => {
    const { user, isLoading } = useAuth(); 
    const location = useLocation();

    const isAdmin = user?.role === "admin";

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

    const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path)); 

    const shouldHideNav = isAdmin && isAdminRoute;

    return (
        <>
            {!shouldHideNav && <Header />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="products" element={<Products />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgot" element={<ForgotPassword />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="refund" element={<RefundPolicy />} />
                <Route path="faq" element={<FAQ />} />
                
                <Route element={<PrivateRoute />}>
                    <Route path="cart" element={<Cart />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route 
                        path="orders" 
                        element={isAdmin ? <OrderRequests /> : <OrderHistory />} 
                    />
                    <Route path="address" element={<Address />} />
                </Route>

                <Route element={<AdminRoute />}>
                    <Route path="adminDashboard" element={<AdminDashboard />} />
                    <Route path="admin/profile" element={<AdminProfile />} />
                    <Route path="admin/orders/processing" element={<OrderProcessing />} />
                    <Route path="admin/orders/dispatch" element={<OrderDispatch/>}/>
                    <Route path="admin/orders/delivered" element={<OrderDelivered/>}/>
                    <Route path="admin/reports" element={<AdminReports />} />
                    <Route path="admin/analytics" element={<AnalyticsPage />} />
                    <Route path="admin/products/add" element={<AdminProductForm />} />
                    <Route path="admin/products/all" element={<AdminProductList />} />
                </Route>
            </Routes>

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