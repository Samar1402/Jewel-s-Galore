import React, { useState } from 'react';
import axios from 'axios';
import AdminLayout from '../Layout/AdminLayout';
import { FaBox, FaTag, FaImage, FaCheckCircle, FaExclamationCircle, FaRupeeSign } from 'react-icons/fa';

function AdminProductForm() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('pendant'); 
    const [imageFile, setImageFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 

    const BASE_HOST = import.meta.env.VITE_API_URL;
    const API_URL = `${BASE_HOST}/api/products`; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Submitting product data...');
        setIsSuccess(false);
        setIsLoading(true); 

        if (!imageFile) {
            setMessage('Error: Please select an image file.');
            setIsLoading(false); 
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Error: Authentication token missing. Please log in.');
            setIsLoading(false); 
            setIsSuccess(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('productImage', imageFile);

        try {
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                }
            });

            setMessage(`Product created successfully: ${response.data.name}`);
            setIsSuccess(true);
            setName('');
            setPrice('');
            setCategory('pendant');
            setImageFile(null); 
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setMessage('Error: Unauthorized access. Please log in again.');
            } else {
                const errorMessage = error.response?.data?.message 
                    || error.message 
                    || 'Server error occurred during submission.';
                setMessage(`Error: ${errorMessage}`);
            }
            setIsSuccess(false);
            console.error('Product Submission Error:', error);

        } finally {
            setIsLoading(false); 
        }
    };

    const categories = [
        { value: 'pendant', label: 'Pendant' },
        { value: 'rings', label: 'Rings' },
        { value: 'earrings', label: 'Earrings' },
        { value: 'bracelets', label: 'Bracelets' },
        { value: 'gift hamper', label: 'Gift Hamper' },
    ];

    return (
        <AdminLayout>
            <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2">
                        <FaBox className="inline-block mr-3 text-yellow-600" />
                        Add New Inventory Item
                    </h1>

                    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Product Name */}
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaBox className="mr-2 text-indigo-500" />
                                    Product Name
                                </label>
                                <input 
                                    id="name"
                                    type="text" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    required 
                                    placeholder="e.g., Starry Night Pendant"
                                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm"
                                />
                            </div>

                            {/* Price */}
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="price" className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaRupeeSign className="mr-2 text-green-500" />
                                    Price
                                </label>
                                <input 
                                    id="price"
                                    type="number" 
                                    value={price} 
                                    onChange={(e) => setPrice(e.target.value)} 
                                    required 
                                    min="0.01"
                                    step="0.01"
                                    placeholder="0.00"
                                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm appearance-none"
                                />
                            </div>

                            {/* Category */}
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="category" className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaTag className="mr-2 text-pink-500" />
                                    Category
                                </label>
                                <div className="relative">
                                    <select 
                                        id="category"
                                        value={category} 
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm bg-white pr-10"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col space-y-2">
                                <label htmlFor="imageFile" className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaImage className="mr-2 text-orange-500" />
                                    Product Image
                                </label>
                                <input 
                                    id="imageFile"
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])} 
                                    required 
                                    className="block w-full text-sm text-gray-500
                                               file:mr-4 file:py-2 file:px-4
                                               file:rounded-full file:border-0
                                               file:text-sm file:font-semibold
                                               file:bg-indigo-50 file:text-indigo-700
                                               hover:file:bg-indigo-100"
                                />
                                {imageFile && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Selected: **{imageFile.name}** ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                            </div>
                            <button 
                                type="submit"
                                disabled={isLoading} 
                                className={`w-full py-3 mt-6 text-gray-900 font-bold rounded-xl shadow-lg transition duration-200 ease-in-out transform hover:scale-[1.005] focus:outline-none focus:ring-4 focus:ring-opacity-50 flex items-center justify-center 
                                    ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500'}`
                                }
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle className="mr-2" />
                                        Add Product to Inventory
                                    </>
                                )}
                            </button>
                        </form>

                        {message && (
                            <div className={`mt-6 p-4 rounded-lg shadow-md ${isSuccess ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
                                <div className="flex items-center">
                                    {isSuccess ? <FaCheckCircle className="mr-3 w-5 h-5" /> : <FaExclamationCircle className="mr-3 w-5 h-5" />}
                                    <p className="text-sm font-medium">{message}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default AdminProductForm;