import React, { useEffect, useState } from "react";
import UserLayout from "../Layout/UserLayout";
import { useAuth } from "../Context/AuthContext"; 
import { authFetch } from "../utils/api"; 
import { FaMapMarkerAlt, FaHome, FaUserTie, FaPhone } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; 

const getStatusClasses = (status) => {
    switch (status) {
        case 'Pending':
            return 'bg-red-100 text-red-700';
        case 'Confirmed':
        case 'Processing':
            return 'bg-yellow-100 text-yellow-800';
        case 'Dispatched':
            return 'bg-blue-100 text-blue-700';
        case 'Delivered':
            return 'bg-green-100 text-green-700';
        case 'Rejected':
            return 'bg-gray-100 text-gray-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openOrderId, setOpenOrderId] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            if (!user) { 
                setLoading(false); 
                return; 
            }
            
            try {
                const res = await authFetch("/api/orders/my-orders", {}, user.token); 
                
                if (res.ok) {
                    const orderArray = res.data.data || []; 
                    setOrders(orderArray);
                } else {
                    console.error("Failed to fetch orders:", res.data.message || res.data);
                    setOrders([]);
                }
            } catch (error) {
                console.error("API call failed:", error);
                setOrders([]);
            }
            
            setLoading(false);
        };
        loadOrders();
    }, [user]); 

    const toggleAccordion = (orderId) => {
        setOpenOrderId(orderId === openOrderId ? null : orderId);
    };

    const createProductSlug = (name) => {
        if (!name) return '#';
        return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    };

    return (
        <UserLayout>
            <div className="p-6 w-full min-h-screen bg-gray-50">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">📦 My Orders</h1>
                {loading ? (
                    <p className="text-center py-10 text-lg text-gray-600">Loading order history...</p>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow">
                        <p className="text-xl text-gray-600">You have no orders yet.</p>
                        <p className="text-lg text-[#b8860b] mt-4">Time to start shopping!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map(order => (
                            <div 
                                key={order._id} 
                                className="bg-white p-4 shadow-lg rounded-xl border border-gray-100
                                transition-all duration-300 hover:shadow-xl hover:scale-[1.01]" 
                            >
                                <div className="flex justify-between items-center border-b pb-2 mb-3">
                                    <h3 className="font-bold text-lg text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</h3>
                                    <div className="flex items-center space-x-2">
                                        {order.paymentMethod && (
                                            <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <p className="mb-3 text-sm flex items-center gap-2">
                                    <span className="font-medium text-gray-500">Status:</span>
                                    <span 
                                        className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusClasses(order.status)}`}
                                    >
                                        {order.status}
                                    </span>
                                </p>
                                
                                <div className="border p-2 rounded-lg bg-gray-50 text-xs text-gray-700 space-y-1 mb-3">
                                    <h4 className="font-semibold flex items-center gap-1 text-[#b8860b]">
                                        <FaMapMarkerAlt /> Shipping To
                                    </h4>
                                    {order.deliveryAddress ? (
                                        <p className="pl-5 flex items-start">
                                            <FaHome className="text-[#b8860b] mr-2 mt-0.5" /> 
                                            <span className="leading-tight">
                                                {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}, {order.deliveryAddress.country}
                                            </span>
                                        </p>
                                    ) : (
                                        <p className="pl-5 text-red-500">Address not recorded.</p>
                                    )}
                                </div>
                                
                                {['Dispatched', 'Confirmed', 'Processing'].includes(order.status) && order.deliveryBoyName && order.deliveryBoyContact && (
                                    <div className="mt-3 bg-blue-50 text-blue-800 text-xs p-3 rounded-lg border border-blue-200">
                                        <p className="font-bold flex items-center gap-1 mb-2 text-base">
                                            <FaUserTie className="text-lg" /> Delivery Agent
                                        </p>
                                        <div className="pl-6 space-y-1">
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Name:</span> 
                                                <span className="font-medium">{order.deliveryBoyName}</span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <span className="font-semibold">Contact:</span> 
                                                <a href={`tel:${order.deliveryBoyContact}`} className="font-medium text-blue-600 hover:underline flex items-center gap-1">
                                                    <FaPhone className="text-xs" /> {order.deliveryBoyContact}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3 border-t pt-3">
                                    <button 
                                        className="w-full text-left font-semibold text-sm mb-1 flex justify-between items-center text-gray-700 hover:text-gray-900"
                                        onClick={() => toggleAccordion(order._id)}
                                    >
                                        <span>Items ({order.items.length} product{order.items.length > 1 ? 's' : ''})</span> 
                                        <span className="text-lg transition-transform duration-300">
                                            {order._id === openOrderId ? '▲' : '▼'} 
                                        </span>
                                    </button>
                                    
                                    {order._id === openOrderId && (
                                        <div className="space-y-1 mt-2 p-2 bg-gray-50 rounded-md">
                                            {order.items.map((it, i) => (
                                                <div key={i} className="flex justify-between items-center py-1 text-sm border-b last:border-b-0">
                                                 <Link 
                                                        to={`/products`} 
                                                        className="flex items-center gap-2 text-gray-800 hover:text-[#b8860b] transition-colors duration-150"
                                                    >
                                                        {it.image && (
                                                            <img
                                                                src={it.image}
                                                                alt={it.name}
                                                                className="w-8 h-8 object-cover rounded shadow-sm"
                                                            />
                                                        )}
                                                        <span className="font-medium">{it.name}</span>
                                                    </Link>
                                                    
                                                    <span className="font-medium text-gray-600">{it.qty} × ₹{it.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                <div className="mt-3 pt-3 border-t font-bold text-xl text-[#b8860b]">Total: ₹{order.totalAmount}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </UserLayout>
    );
};

export default OrderHistory;