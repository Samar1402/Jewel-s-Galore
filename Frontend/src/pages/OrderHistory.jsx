import React, { useEffect, useState } from "react";
import UserLayout from "../Layout/UserLayout";
import { useAuth } from "../Context/AuthContext";
import { authFetch } from "../utils/api";


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
                            <div key={order._id} className="bg-white p-4 shadow rounded-lg">
                                <div className="flex justify-between">
                                    <h3 className="font-semibold">Order #{order._id.slice(-6).toUpperCase()}</h3>
                                    <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
                                </div>

                                
                                <p className="mt-2">
                                    Status: 
                                    <strong 
                                        className={getStatusColor(order.status)}
                                    >
                                        {order.status}
                                    </strong>
                                </p>

                                <div className="mt-3">
                                    {order.items.map((it, i) => (
                                        <div key={i} className="flex justify-between border-b py-1">
                                            <span>{it.name}</span>
                                            <span>{it.qty} × ₹{it.price}</span>
                                        </div>
                                    ))}
                                </div> 

                                <div className="mt-3 font-bold text-[#b8860b]">Total: ₹{order.totalAmount}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </UserLayout>
    );
};

export default OrderHistory;