import React, { useEffect, useState } from 'react';
import AdminLayout from '../Layout/AdminLayout.jsx';
import { authFetch } from '../../utils/api';
import { useAuth } from '../../Context/AuthContext';
import { FaMapMarkerAlt, FaBoxOpen, FaUserCheck, FaPhoneVolume, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa'; 

const statusToUrl = {
    'Pending': 'requests',
    'Confirmed': 'processing',
    'Dispatched': 'dispatch',
    'Delivered': 'delivered',
};

const getStatusTextColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'text-red-600';
        case 'Confirmed':
            return 'text-yellow-600';
        case 'Dispatched':
            return 'text-blue-600';
        case 'Delivered':
            return 'text-green-600';
        case 'Rejected':
            return 'text-gray-500';
        default:
            return 'text-gray-500';
    }
};

const OrderViewTemplate = ({ status, pageTitle }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openDetailsId, setOpenDetailsId] = useState(null); 
    const [dispatchData, setDispatchData] = useState({}); 

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

    const handleDispatchInputChange = (orderId, field, value) => {
        setDispatchData(prev => ({
            ...prev,
            [orderId]: {
                ...(prev[orderId] || {}),
                [field]: value
            }
        }));
    };

    const handleUpdateStatus = async (orderId, newStatus) => {
        setOpenDetailsId(null); 
        
        let body = { status: newStatus };
        
        if (newStatus === 'Dispatched') {
            const data = dispatchData[orderId];
            const name = data?.name?.trim();
            const contact = data?.contact?.trim();

            if (!name || name.length < 3) {
                alert("Delivery Boy Name must be at least 3 characters long.");
                return; 
            }
            if (!/^[a-zA-Z\s]+$/.test(name)) {
                alert("Delivery Boy Name must contain only letters and spaces.");
                return;
            }
            
            if (!contact || !/^\d{10}$/.test(contact)) {
                alert("Contact Number must be exactly 10 digits.");
                return; 
            }
            
            body.deliveryBoyName = name;
            body.deliveryBoyContact = contact;
        }

        const res = await authFetch(`/api/orders/update-status/${orderId}`, {
            method: 'PUT',
            body: JSON.stringify(body) 
        }, user.token);


        if (res.ok) {
            alert(`Order status updated to ${newStatus}.`);
            setDispatchData(prev => { 
                const newState = { ...prev };
                delete newState[orderId];
                return newState;
            });
            fetchOrders(); 
        } else {
            alert(`Failed to update order status: ${res.data.message || 'Server error'}`);
        }
    };
    
    const toggleDetails = (orderId) => {
        setOpenDetailsId(prevId => (prevId === orderId ? null : orderId));
    };

    if (loading) return <AdminLayout><div className="p-6">Loading orders...</div></AdminLayout>;
    if (user.role !== 'admin') return <AdminLayout><div className="p-6 text-red-500">Access Denied.</div></AdminLayout>;

    return (
        <AdminLayout>
            <div className="p-6 w-full">
                <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
                    <span className={`font-semibold ${getStatusTextColor(status)}`}>{pageTitle}</span> Orders ({orders.length})
                </h1>

                {orders.length === 0 ? (
                    <p className="text-gray-600">No {status.toLowerCase()} orders.</p>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => {
                            const isDetailsOpen = openDetailsId === order._id;
                            const address = order.deliveryAddress;
                            const currentDispatchData = dispatchData[order._id] || {};

                            return (
                            <div key={order._id} className="bg-white p-6 shadow-xl rounded-xl border border-gray-200 transition-shadow duration-300 hover:shadow-2xl">
                                
                                <div className="flex justify-between items-start mb-4 pb-4 border-b border-dashed">
                                    <div>
                                        <h3 className="font-bold text-xl text-gray-800 mb-1">Order ID: #{order._id.slice(-8).toUpperCase()}</h3>
                                        <p className="font-bold text-[#b8860b] text-2xl">Total: ₹{order.totalAmount}</p>
                                    </div>
                                    <div className="flex flex-col items-end space-y-3">
                                        <button 
                                            onClick={() => toggleDetails(order._id)} 
                                            className="text-sm px-3 py-1 bg-gray-100 text-blue-600 hover:bg-gray-200 rounded font-medium transition-colors"
                                        >
                                            {isDetailsOpen ? '▲ Hide Details' : '▼ View Details'}
                                        </button>
                                        <div className="space-x-2">
                                            {status === 'Pending' && (
                                                <>
                                                    <button onClick={() => handleUpdateStatus(order._id, 'Confirmed')} className="bg-green-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-green-700 shadow-md">✅ Confirm</button>
                                                    <button onClick={() => handleUpdateStatus(order._id, 'Rejected')} className="bg-red-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-red-700 shadow-md">❌ Reject</button>
                                                </>
                                            )}
                                            {status === 'Dispatched' && (
                                                <button onClick={() => handleUpdateStatus(order._id, 'Delivered')} className="bg-purple-600 text-white text-sm px-3 py-2 rounded-lg hover:bg-purple-700 shadow-md">✔ Delivered</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {status === 'Confirmed' && (
                                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                        <h4 className="font-bold text-yellow-800 mb-2">Prepare for Dispatch:</h4>
                                        <div className="flex flex-col md:flex-row md:items-center justify-end gap-3">
                                            <div className='flex items-center gap-1 w-full md:w-1/3'>
                                                <FaUserCheck className='text-yellow-700 min-w-4' />
                                                <input 
                                                    type="text" 
                                                    placeholder="Delivery Boy Name"
                                                    value={currentDispatchData.name || ''}
                                                    onChange={(e) => handleDispatchInputChange(order._id, 'name', e.target.value)}
                                                    className="p-2 border rounded text-sm w-full focus:ring-yellow-500 focus:border-yellow-500"
                                                />
                                            </div>
                                            <div className='flex items-center gap-1 w-full md:w-1/4'>
                                                <FaPhoneVolume className='text-yellow-700 min-w-4' />
                                                <input 
                                                    type="tel" 
                                                    placeholder="Contact No. (10 Digits)"
                                                    value={currentDispatchData.contact || ''}
                                                    onChange={(e) => handleDispatchInputChange(order._id, 'contact', e.target.value)}
                                                    className="p-2 border rounded text-sm w-full focus:ring-yellow-500 focus:border-yellow-500"
                                                    maxLength={10} 
                                                />
                                            </div>
                                            <button 
                                                onClick={() => handleUpdateStatus(order._id, 'Dispatched')} 
                                                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto shadow-md transition-all duration-200"
                                            >
                                                📦 Dispatch Order
                                            </button>
                                        </div>
                                    </div>
                                )}
                                
                                {isDetailsOpen && (
                                    <div className="pt-4 mt-4 border-t space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold flex items-center gap-2 text-gray-700 mb-2 border-b pb-1">
                                                <FaMapMarkerAlt className="text-red-500" /> Shipping Address
                                            </h4>
                                            {address ? (
                                                <p className="text-sm pl-6 leading-relaxed">
                                                    <span className="font-semibold">{order.user.name}</span><br />
                                                    {address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}
                                                </p>
                                            ) : (
                                                <p className="text-sm pl-6 text-red-500">Address not recorded.</p>
                                            )}
                                            <p className="text-xs text-gray-500 mt-3 flex items-center gap-1 pl-6">
                                                <FaCalendarAlt className='text-xs' /> Order Date: {new Date(order.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                            <h4 className="font-bold flex items-center gap-2 text-gray-700 mb-2 border-b pb-1">
                                                <FaBoxOpen className="text-blue-500" /> Ordered Items ({order.items.length})
                                            </h4>
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between text-sm py-1 border-b border-gray-200 last:border-b-0 pl-6">
                                                    <span>{item.name}</span>
                                                    <span className="font-medium">{item.qty} pcs @ ₹{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {order.deliveryBoyName && status === 'Dispatched' && ( 
                                            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                                                <h4 className="font-bold text-sm text-green-700 mb-2">Delivery Agent Details:</h4>
                                                <p className="text-sm flex items-center gap-2 pl-6">
                                                    <FaUserCheck className='text-green-600' /> Agent: {order.deliveryBoyName}
                                                </p>
                                                <p className="text-sm flex items-center gap-2 pl-6">
                                                    <FaPhoneVolume className='text-green-600' /> Contact: <a href={`tel:${order.deliveryBoyContact}`} className='text-blue-700 hover:underline'>{order.deliveryBoyContact}</a>
                                                </p>
                                            </div>
                                        )}
                                        {status === 'Delivered' && ( 
                                            <div className="bg-green-100 p-4 rounded-lg border border-green-400">
                                                <h4 className="font-bold text-green-800 flex items-center gap-2">
                                                    <FaCheckCircle className='text-green-600' /> Order Successfully Completed
                                                </h4>
                                                <p className="text-xs text-gray-600 mt-1 pl-6">This order has been delivered and fulfilled.</p>
                                            </div>
                                        )}
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