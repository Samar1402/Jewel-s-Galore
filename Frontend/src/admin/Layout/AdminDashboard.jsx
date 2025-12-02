import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../../Context/AuthContext"; 
import { authFetch } from "../../utils/api"; 
import { Link } from 'react-router-dom'; 

import { 
    FaBoxes, 
    FaClipboardCheck, 
    FaShippingFast, 
    FaCheckCircle, 
    FaSpinner, 
    FaRupeeSign, 
    FaMoneyBillWave 
} from 'react-icons/fa';

const formatCurrency = (amount) => {
    const numericAmount = Number(amount) || 0; 
    return `₹${numericAmount.toLocaleString('en-IN')}`;
};

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalOrders: 0, 
        confirmed: 0,
        dispatched: 0,
        delivered: 0,
        overallRevenue: 0,
        deliveredRevenue: 0,
        processingRevenue: 0 
    });
    const [loading, setLoading] = useState(true);

    const fetchOrderStats = async () => {
        if (!user || user.role !== "admin") {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await authFetch("/api/dashboard/order-stats", {}, user.token);
            if (res.ok && res.data && res.data.data) {
                setStats(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrderStats();
    }, [user]);

    if (user && user.role !== "admin") {
        return (
            <AdminLayout>
                <div className="p-6 text-red-500 font-bold text-xl">
                    🚫 Access Denied: Administrator privileges required.
                </div>
            </AdminLayout>
        );
    }

    const orderCountCards = [
        { title: "Total Order Request", value: stats.totalOrders, icon: <FaBoxes className="text-4xl" />, color: "text-blue-500", border: "border-blue-500", link: '/admin/orders/requests' },
        { title: "Total Order Confirmed", value: stats.confirmed, icon: <FaClipboardCheck className="text-4xl" />, color: "text-yellow-600", border: "border-yellow-600", link: '/admin/orders/processing' },
        { title: "Total Order Dispatched", value: stats.dispatched, icon: <FaShippingFast className="text-4xl" />, color: "text-purple-600", border: "border-purple-600", link: '/admin/orders/dispatch' },
        { title: "Total Order Delivered", value: stats.delivered, icon: <FaCheckCircle className="text-4xl" />, color: "text-green-600", border: "border-green-600", link: '/admin/orders/delivered' },
    ];

    const revenueCards = [
        { title: "Overall Revenue", value: stats.overallRevenue, icon: <FaMoneyBillWave className="text-4xl" />, color: "text-blue-700", border: "border-blue-700", span: "lg:col-span-2" },
        { title: "Processing Revenue", value: stats.processingRevenue, icon: <FaClipboardCheck className="text-4xl" />, color: "text-yellow-700", border: "border-yellow-700" },
        { title: "Delivered Revenue", value: stats.deliveredRevenue, icon: <FaCheckCircle className="text-4xl" />, color: "text-green-700", border: "border-green-700" },
    ];

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">📊 Admin Dashboard</h1>

            {loading ? (
                <div className="flex justify-center p-10 bg-white rounded-xl shadow">
                    <FaSpinner className="animate-spin text-3xl text-gray-500 mr-2" />
                    <p className="text-lg text-gray-600">Loading Dashboard Data...</p>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Order Status Overview</h2>

                    <div className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        lg:grid-cols-4 
                        gap-6 
                        mb-8
                    ">
                        {orderCountCards.map((card, idx) => (
                            <Link 
                                to={card.link}
                                key={idx}
                                className={`p-6 bg-white shadow-lg rounded-xl 
                                    flex items-center justify-between 
                                    border-t-4 ${card.border} 
                                    hover:scale-[1.02] transition-transform`}
                            >
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">{card.title}</h2>
                                    <p className={`text-4xl font-extrabold mt-1 ${card.color}`}>
                                        {card.value}
                                    </p>
                                </div>
                                <div className={`${card.color}`}>{card.icon}</div>
                            </Link>
                        ))}
                    </div>

                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaRupeeSign className="text-xl" /> Financial Overview
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {revenueCards.map((card, idx) => (
                            <div
                                key={idx}
                                className={`p-6 bg-white shadow-xl rounded-xl 
                                    flex items-center justify-between 
                                    border-l-8 ${card.border} 
                                    ${card.span || "lg:col-span-1"}
                                `}
                            >
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">{card.title}</h2>
                                    <p className={`text-4xl font-extrabold mt-1 ${card.color}`}>
                                        {formatCurrency(card.value)}
                                    </p>
                                </div>
                                <div className={`${card.color}`}>{card.icon}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;