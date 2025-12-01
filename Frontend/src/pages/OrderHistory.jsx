import React, { useEffect, useState } from "react";
import UserLayout from "../Layout/UserLayout";
import { useAuth } from "../Context/AuthContext";
import { authFetch } from "../utils/api";
import { FaMapMarkerAlt, FaHome } from 'react-icons/fa'; 

const getStatusColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'text-red-500'; 
        case 'Confirmed':
        case 'Processing':
            return 'text-yellow-600';
        case 'Dispatched':
            return 'text-blue-500'; 
        case 'Delivered':
            return 'text-green-600'; 
        case 'Rejected':
            return 'text-gray-500'; 
        default:
            return 'text-gray-500';
    }
};

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!user) { setLoading(false); return; }
            const res = await authFetch("/api/orders/my-orders", {}, user.token); 
            if (res.ok) setOrders(res.data.orders || res.data || []);
            else setOrders([]);
            setLoading(false);
        };
        load();
    }, [user]);

    return (
        <UserLayout>
            <div className="p-6 w-full">
                <h1 className="text-3xl font-bold mb-6">📦 My Orders</h1>

                {loading ? <p>Loading...</p> : orders.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-lg text-gray-600">You have no orders yet.</p>
                        <p className="text-[#b8860b] mt-4">Start shopping!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-4 shadow-lg rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center border-b pb-2 mb-3">
                                    <h3 className="font-bold text-lg text-gray-800">Order #{order._id.slice(-6).toUpperCase()}</h3>
                                    <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>

                                
                                <p className="mb-3 text-sm">
                                    Status: 
                                    <strong 
                                        className={`font-semibold ${getStatusColor(order.status)}`}
                                    >
                                        {order.status}
                                    </strong>
                                </p>
                                <div className="border p-2 rounded-lg bg-gray-50 text-xs text-gray-700 space-y-1 mb-3">
                                    <h4 className="font-semibold flex items-center gap-1 text-[#b8860b]">
                                        <FaMapMarkerAlt /> Shipping To
                                    </h4>
                                    {order.deliveryAddress ? (
                                        <>
                                            <p className="pl-5 flex items-start">
                                                <FaHome className="text-[#b8860b] mr-2 mt-0.5" /> 
                                                <span className="leading-tight">
                                                    {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}, {order.deliveryAddress.country}
                                                </span>
                                            </p>
                                        </>
                                    ) : (
                                        <p className="pl-5 text-red-500">Address not recorded.</p>
                                    )}
                                </div>


                                {/* Order Items List */}
                                <div className="mt-3 border-t pt-3">
                                    <h4 className="font-semibold text-sm mb-1">Items:</h4>
                                    {order.items.map((it, i) => (
                                        <div key={i} className="flex justify-between py-0.5 text-sm">
                                            <span>{it.name}</span>
                                            <span className="font-medium text-gray-600">{it.qty} × ₹{it.price}</span>
                                        </div>
                                    ))}
                                </div> 

                                <div className="mt-3 pt-3 border-t font-bold text-lg text-[#b8860b]">Total: ₹{order.totalAmount}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </UserLayout>
    );
};

export default OrderHistory;