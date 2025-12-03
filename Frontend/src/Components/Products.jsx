import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Components/CartContext";

function Products() {
    const navigate = useNavigate();
    const { user } = useAuth(); 
    const { cartItems: cart, addToCart, updateQuantity } = useCart(); 

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_HOST = import.meta.env.VITE_API_URL;
    const categoriesOrder = useMemo(() => ([
        "pendant",
        "rings",
        "earrings",
        "bracelets",
        "gift hamper"
    ]), []);

    const categoryTitles = useMemo(() => ({
        pendant: "Pendants",
        rings: "Rings",
        earrings: "Ear Rings",
        bracelets: "Bracelets",
        "gift hamper": "Gift Hampers"
    }), []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const apiPath = `${BASE_HOST}/api/products`;
                
                const res = await axios.get(apiPath);
                const parsedData = res.data.map(product => ({
                    ...product,
                    price: Number(product.price)
                }));

                setProducts(parsedData);
                setError(null); 
            } catch (err) {
                console.error("Error loading products:", err);
                setError("Failed to fetch products. Please check the API connection.");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, [BASE_HOST]);

    const getQuantity = (id) => {
        const found = cart.find((item) => item.id === id); 
        return found ? found.quantity : 0;
    };

    const handleIncrease = (item) => {
        if (!user) {
            alert("Please log in to add items to your cart!");
            navigate("/login");
            return;
        }
        addToCart({
            id: item._id, 
            name: item.name,
            price: item.price,
            image: `${BASE_HOST}${item.imageUrl}`,
            category: item.category,
        });
    };

    const handleDecrease = (id) => {
        if (!user) {
            alert("Please log in first!");
            navigate("/login");
            return;
        }
        updateQuantity(id, -1);
    };
    
    const groupedProducts = useMemo(() => {
        return categoriesOrder.map((cat) => ({
            category: cat,
            items: products.filter((p) => p.category === cat)
        }));
    }, [products, categoriesOrder]);

    const ProductCard = ({ item }) => {
        const id = item._id; 
        const quantity = getQuantity(id);
        
        return (
            <div
                key={id}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition"
            >
                {/* Image */}
                <img
                    src={`${BASE_HOST}${item.imageUrl}`}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Name + Price */}
                <div className="flex-1 ml-4">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-yellow-600 font-semibold">
                        ₹{item.price}
                    </p>
                </div>

                {/* Qty Buttons */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleDecrease(id)}
                        className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
                        disabled={quantity === 0}
                    >
                        -
                    </button>
                    <span className="font-semibold w-6 text-center">{quantity}</span>
                    <button
                        onClick={() => handleIncrease(item)}
                        className="px-3 py-1 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                    >
                        +
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="p-6 md:p-12">
            <h1 className="text-4xl font-extrabold text-[#d4af37] text-center mb-16">
                ✨ All Jewelry Products
            </h1>
            
            {loading && (
                <p className="text-center text-xl text-blue-500 mt-20">
                    Loading products... ⏳
                </p>
            )}

            {error && (
                <p className="text-center text-xl text-red-500 mt-20">
                    {error}
                </p>
            )}

            {!loading && !error && (
                groupedProducts.map(
                    (group) =>
                        group.items.length > 0 && (
                            <div key={group.category} className="mb-12">
                                <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2">
                                    {categoryTitles[group.category]}
                                </h2>

                                <div className="flex flex-col gap-4">
                                    {group.items.map((item) => (
                                        <ProductCard key={item._id} item={item} />
                                    ))}
                                </div>
                            </div>
                        )
                )
            )}
            
            {!loading && !error && products.length === 0 && (
                 <p className="text-center text-xl text-gray-500 mt-20">
                    No products found in the database.
                </p>
            )}
        </div>
    );
}

export default Products;