import React, { useState, useEffect } from 'react';
import AdminLayout from '../../admin/AdminLayout.jsx';
import { authFetch } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';

const statusToUrl = {
    'Pending': 'requests',
    'Confirmed': 'processing',
    'Dispatched': 'dispatch',
    'Delivered': 'delivered',
};

const OrderViewTemplate = ({ status, pageTitle }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        if (!user || user.role !== 'admin') {
            setLoading(false);
            return;
        }
        setLoading(true);
        const urlSegment = statusToUrl[status];

        const res = await authFetch(`/api/orders/${urlSegment}`, {}, user.token);

        if (res.ok) {
            setOrders(res.data.orders);
        } else {
            console.error(`Failed to fetch ${status} orders:`, res);
            alert(`Failed to fetch ${status} orders. Check admin token.`);
            setOrders([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, [user, status]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        const res = await authFetch(`/api/orders/update-status/${orderId}`, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus })
        }, user.token);


        if (res.ok) {
            alert(`Order status updated to ${newStatus}.`);
            fetchOrders();
        } else {
            alert(`Failed to update order status: ${res.data.message || 'Server error'}`);
        }
    };

    if (loading) return <AdminLayout><div className="p-6">Loading orders...</div></AdminLayout>;

    if (user.role !== 'admin') return <AdminLayout><div className="p-6 text-red-500">Access Denied.</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 w-full">
                <h1 className="text-3xl font-bold mb-6">{pageTitle} ({orders.length})</h1>

                {orders.length === 0 ? (
                    <p className="text-gray-600">No {status.toLowerCase()} orders.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white p-4 shadow rounded-lg flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">Order ID: #{order._id.slice(-6).toUpperCase()}</h3>
                                    <p className="text-sm">Customer ID: {order.user}</p>
                                    <p className="font-bold text-[#b8860b]">Total: ₹{order.totalAmount}</p>
                                    <p className="text-xs">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>

                                <div className="space-x-2">
                                    {/* --- ACTION BUTTONS --- */}
                                    {status === 'Pending' && (
                                        <>
                                            <button onClick={() => handleUpdateStatus(order._id, 'Confirmed')} className="bg-green-600 text-white p-2 rounded-lg">✅ Confirm</button>
                                            <button onClick={() => handleUpdateStatus(order._id, 'Rejected')} className="bg-red-600 text-white p-2 rounded-lg">❌ Reject</button>
                                        </>
                                    )}
                                    {status === 'Confirmed' && (
                                        <button onClick={() => handleUpdateStatus(order._id, 'Dispatched')} className="bg-blue-600 text-white p-2 rounded-lg">📦 Dispatch</button>
                                    )}
                                    {status === 'Dispatched' && (
                                        <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="bg-purple-600 text-white p-2 rounded-lg">✔ Delivered</button>
                                    )}
                                    {/* Delivered orders have no further actions */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default OrderViewTemplate;