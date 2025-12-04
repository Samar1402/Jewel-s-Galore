import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../AdminLayout/AdminLayout';
import { FaBoxes, FaEdit, FaTrash, FaSpinner, FaPlusCircle, FaExclamationTriangle } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL;
    const API_PRODUCTS_URL = `${BASE_URL}/api/products`;

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Authentication token missing. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(API_PRODUCTS_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });
            setProducts(response.data);
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to fetch products from the server.';
            setError(message);
            console.error('Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []); 

    const handleDelete = async (productId) => {
        if (!window.confirm(`Are you sure you want to delete product ID ${productId}? This action cannot be undone.`)) {
            return;
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Authentication token missing. Cannot delete product.');
            return;
        }

        try {
            await axios.delete(`${API_PRODUCTS_URL}/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setProducts(products.filter(p => p._id !== productId));
            alert(`Product ID ${productId} deleted successfully.`);

        } catch (err) {
            const message = err.response?.data?.message || 'Failed to delete product.';
            setError(`Delete Error: ${message}`);
            console.error('Delete Error:', err);
        }
    };

    const handleEdit = (productId) => {
        navigate(`/admin/products/edit/${productId}`);
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-10 text-indigo-500">
                    <FaSpinner className="animate-spin text-3xl mr-3" />
                    <span className="text-lg font-medium">Loading Inventory...</span>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                    <FaExclamationTriangle className="w-5 h-5 mr-3" />
                    <p className="font-semibold">Error:</p> {error}
                </div>
            );
        }

        if (products.length === 0) {
            return (
                <div className="text-center py-20 text-gray-500">
                    <FaBoxes className="mx-auto mb-4 text-6xl" />      
                    <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
                    <p className="mb-6">Your product inventory is currently empty. Start adding products to showcase your collection!</p>
                    <NavLink
                        to="/admin/products/add"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                    >
                        <FaPlusCircle className="mr-2" /> Add Your First Product
                    </NavLink>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto shadow-md rounded-xl border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <img 
                                        src={`${BASE_URL}${product.imageUrl}`} 
                                        alt={product.name} 
                                        className="w-12 h-12 rounded-lg object-cover border border-gray-200" 
                                        onError={(e) => {
                                            e.target.onerror = null; 
                                            e.target.src = "https://placehold.co/100x100/D1D5DB/4B5563?text=N/A";
                                        }}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{product.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 text-right">₹{Number(product.price).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(product._id)} className="text-indigo-600 hover:text-indigo-900 mr-3 p-2 rounded-full hover:bg-indigo-50 transition"><FaEdit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition"><FaTrash className="w-4 h-4" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <AdminLayout>
             {/* ... (Existing JSX for the main layout and header) */}
            <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            <FaBoxes className="inline-block mr-3 text-yellow-600" />
                            Product Inventory Management
                        </h1>
                        <NavLink 
                            to="/admin/products/add" 
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
                        >
                            <FaPlusCircle className="mr-2" /> Add New Product
                        </NavLink>
                    </div>
                    {renderContent()}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminProductList;