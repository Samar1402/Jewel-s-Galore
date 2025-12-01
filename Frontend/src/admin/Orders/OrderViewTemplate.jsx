import React, { useEffect, useState } from 'react';
import AdminLayout from '../../admin/AdminLayout.jsx';
import { authFetch } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';
import { FaMapMarkerAlt, FaBoxOpen } from 'react-icons/fa'; // Import necessary icons

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
    // State to manage which order's details panel is open
    const [openDetailsId, setOpenDetailsId] = useState(null); 

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
        // Optimistically hide details panel before fetch
        setOpenDetailsId(null); 
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
    
    // Toggle function for the details panel
    const toggleDetails = (orderId) => {
        setOpenDetailsId(prevId => (prevId === orderId ? null : orderId));
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
                        {orders.map(order => {
                            const isDetailsOpen = openDetailsId === order._id;
                            const address = order.deliveryAddress;

                            return (
                            <div key={order._id} className="bg-white p-4 shadow rounded-lg border border-gray-200">
                                
                                {/* 1. HEADER ROW */}
                                <div className="flex justify-between items-center mb-3 pb-3 border-b">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-800">Order ID: #{order._id.slice(-6).toUpperCase()}</h3>
                                        <p className="font-bold text-[#b8860b] text-xl">Total: ₹{order.totalAmount}</p>
                                    </div>

                                    {/* Action Buttons & Details Toggle */}
                                    <div className="flex flex-col items-end space-y-2">
                                        <button 
                                            onClick={() => toggleDetails(order._id)} 
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            {isDetailsOpen ? 'Hide Details' : 'View Details'}
                                        </button>

                                        {/* ACTION BUTTONS (Moved here for better layout) */}
                                        <div className="space-x-2">
                                            {status === 'Pending' && (
                                                <>
                                                    <button onClick={() => handleUpdateStatus(order._id, 'Confirmed')} className="bg-green-600 text-white text-sm p-2 rounded-lg hover:bg-green-700">✅ Confirm</button>
                                                    <button onClick={() => handleUpdateStatus(order._id, 'Rejected')} className="bg-red-600 text-white text-sm p-2 rounded-lg hover:bg-red-700">❌ Reject</button>
                                                </>
                                            )}
                                            {status === 'Confirmed' && (
                                                <button onClick={() => handleUpdateStatus(order._id, 'Dispatched')} className="bg-blue-600 text-white text-sm p-2 rounded-lg hover:bg-blue-700">📦 Dispatch</button>
                                            )}
                                            {status === 'Dispatched' && (
                                                <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="bg-purple-600 text-white text-sm p-2 rounded-lg hover:bg-purple-700">✔ Delivered</button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. COLLAPSIBLE DETAILS PANEL */}
                                {isDetailsOpen && (
                                    <div className="pt-3 border-t mt-3 space-y-4">
                                        
                                        {/* DELIVERY ADDRESS */}
                                        <div className="bg-gray-50 p-3 rounded-lg border">
                                            <h4 className="font-bold flex items-center gap-2 text-gray-700 mb-1">
                                                <FaMapMarkerAlt className="text-red-500" /> Delivery Address
                                            </h4>
                                            {address ? (
                                                <p className="text-sm pl-6 leading-relaxed">
                                                    {address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}
                                                </p>
                                            ) : (
                                                <p className="text-sm pl-6 text-red-500">Address not recorded (Fix backend saving for new orders).</p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-2">Customer ID: {order.user}</p>
                                            <p className="text-xs text-gray-500">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                                        </div>

                                        {/* ORDER ITEMS */}
                                        <div className="bg-gray-50 p-3 rounded-lg border">
                                            <h4 className="font-bold flex items-center gap-2 text-gray-700 mb-1">
                                                <FaBoxOpen className="text-blue-500" /> Ordered Items
                                            </h4>
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm py-1 border-b last:border-b-0 pl-6">
                                                    <span>{item.name}</span>
                                                    <span className="font-medium">{item.qty} pcs @ ₹{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )})}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default OrderViewTemplate;