import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Components/CartContext";
import UserLayout from "../Layout/UserLayout";

// --- Pendant Imports ---
import fiveStoneElegance from "../assets/Pendants/Five-Stone Elegance Chain.jpeg";
import floralGlow from "../assets/Pendants/Floral Glow Pendant .jpeg";
import goldenGraceBow from "../assets/Pendants/Golden Grace Bow Necklace.jpeg";
import goldenHeart from "../assets/Pendants/Golden Heart Pendant.jpeg";
import greenGoddess from "../assets/Pendants/Green goddess necklace.jpeg";
import moonAura from "../assets/Pendants/Moon Aura pendant.jpeg";
import bowPendant from "../assets/Pendants/Bow Pendant Necklace.jpeg";


import ringImg from "../assets/ring.jpg";
import giftHam from "../assets/giftHam.jpg";

// --- Bracelet Imports ---
import celestialTreeImg from "../assets/bracelet/Celestial Tree Bracelet.jpeg" 
import goldenGripImg from "../assets/bracelet/Golden grip bracelet.jpeg";
import royalWeaveImg from "../assets/bracelet/Royal Weave Bangle.jpeg"; 

// --- Earring Imports ---
import bouquetBowImg from "../assets/earring/Bouquet bow earrings.jpeg";
import goldHoopImg from "../assets/earring/Gold Hoop Earrings.jpeg";
import solsticeGoldImg from "../assets/earring/Solstice gold earrings.jpeg";
import twirlOfGoldImg from "../assets/earring/Twirl of gold earrings.jpeg";
import vintageGleam from "../assets/earring/Vintage gleam hoops.jpeg";


const Products = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems: cart, addToCart, updateQuantity } = useCart();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('default'); 
    const [previewImage, setPreviewImage] = useState(null); 

    const rawProducts = useMemo(() => ([
        // Pendants
        { id: 101, name: "Five-Stone Elegance Chain", price: 349, image: fiveStoneElegance, category: "Pendants" },
        { id: 102, name: "Floral Glow Pendant", price: 289, image: floralGlow, category: "Pendants" },
        { id: 103, name: "Golden Heart Pendant", price: 289, image: goldenHeart, category: "Pendants" },
        { id: 104, name: "Green Goddess Necklace", price: 289, image: greenGoddess, category: "Pendants" },
        { id: 105, name: "Moon Aura pendant", price: 349, image: moonAura, category: "Pendants" },
        { id: 106, name: "Bow Pendant Necklace", price: 299, image: bowPendant, category: "Pendants" },
        { id: 107, name: "Golden Grace Bow Necklace", price: 449, image: goldenGraceBow, category: "Pendants" },
        
        // EARRINGS
        { id: 201, name: "Bouquet Bow Earrings", price: 399, image: bouquetBowImg, category: "Ear Rings" },
        { id: 202, name: "Gold Hoop Earrings", price: 399, image: goldHoopImg, category: "Ear Rings" },
        { id: 203, name: "Solstice Gold Earrings", price: 349, image: solsticeGoldImg, category: "Ear Rings" },
        { id: 204, name: "Twirl of Gold Earrings", price: 489, image: twirlOfGoldImg, category: "Ear Rings" },
        { id: 205, name: "Vintage gleam hoops", price: 289, image: vintageGleam, category: "Ear Rings" }, 

        // BRACELETS
        { id: 301, name: "Celestial Tree Bracelet", price: 499, image: celestialTreeImg, category: "Bracelets" },
        { id: 302, name: "Golden Grip Bracelet", price: 499, image: goldenGripImg, category: "Bracelets" },
        { id: 303, name: "Royal Weave Bangle", price: 489, image: royalWeaveImg, category: "Bracelets" }, 

        // Rings
        { id: 401, name: "Adjustable Flower Ring", price: 899, image: ringImg, category: "Rings" },
        { id: 402, name: "Stackable Thin Ring Set", price: 1499, image: ringImg, category: "Rings" },
        { id: 403, name: "Statement Cocktail Ring", price: 1099, image: ringImg, category: "Rings" },

        // Gift Hampers
        { id: 501, name: "Gift Hamper", price: 1199, image: giftHam, category: "Gift Hampers" }
    ]), []);

    // --- Filtering and Sorting Logic (Unchanged) ---
    const filteredAndSortedProducts = useMemo(() => {
        let currentProducts = [...rawProducts]; 
        if (searchTerm) {
            const lowerCaseSearch = searchTerm.toLowerCase();
            currentProducts = currentProducts.filter(product => 
                product.name.toLowerCase().includes(lowerCaseSearch) ||
                product.category.toLowerCase().includes(lowerCaseSearch)
            );
        }
        if (sortOrder === 'A-Z') {
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        const grouped = currentProducts.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});

        return grouped;

    }, [rawProducts, searchTerm, sortOrder]);


    const handleIncrease = (item) => {
        if (!user) {
            alert("Please login first!");
            navigate("/login");
            return;
        }
        addToCart(item);
    };

    const handleDecrease = (id) => {
        if (!user) {
            alert("Please login first!");
            navigate("/login");
            return;
        }
        updateQuantity(id, -1);
    };

    const getQuantity = (id) => {
        const found = cart.find((item) => item.id === id);
        return found ? found.quantity : 0;
    };

    const ImagePreviewModal = () => {
        if (!previewImage) return null;

        return (
            <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
                onClick={() => setPreviewImage(null)} 
            >
                <div 
                    className="bg-white rounded-lg p-6 max-w-lg max-h-full overflow-auto shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()} 
                >
                    <button
                        className="absolute top-2 right-2 text-gray-700 text-3xl font-bold hover:text-gray-900"
                        onClick={() => setPreviewImage(null)}
                    >
                        &times;
                    </button>
                    <img
                        src={previewImage.src}
                        alt={previewImage.name}
                        className="w-full h-auto max-h-[80vh] object-contain rounded-md"
                    />
                    <p className="text-center mt-4 text-xl font-semibold text-gray-800">
                        {previewImage.name}
                    </p>
                </div>
            </div>
        );
    };


    const ProductCard = ({ item }) => {
        const quantity = getQuantity(item.id);
        
        const handleImageClick = () => {
            setPreviewImage({ src: item.image, name: item.name });
        };

        return (
            <div
                key={item.id}
                className="flex items-center bg-white rounded-xl shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-200" 
            >
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mr-4 cursor-pointer hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    onClick={handleImageClick}
                    onFocus={handleImageClick}
                    tabIndex="0"
                />

                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {item.name}
                    </h2>
                    <p className="text-gray-500 text-lg font-bold">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                    <button
                        onClick={() => handleDecrease(item.id)}
                        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition disabled:opacity-50"
                        disabled={quantity === 0}
                    >
                        –
                    </button>

                    <span className="font-semibold text-gray-800 w-8 text-center">
                        {quantity}
                    </span>

                    <button
                        onClick={() => handleIncrease(item)}
                        className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
                    >
                        +
                    </button>
                </div>
            </div>
        );
    };

    const ProductSection = ({ title, products }) => (
        <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b-2 border-gray-300 pb-2">
                {title}
            </h2>
            <div className="flex flex-col gap-4">
                {products.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );

    const content = (
        <div className="bg-white w-full min-h-screen py-12 px-6 relative">
            
            <ImagePreviewModal />

            <h1 className="text-4xl font-extrabold text-[#d4af37] text-center mb-16">
                ✨ The Megha's Jewels Galore Collection
            </h1>
            
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
                    <input
                        type="text"
                        placeholder="Search products or categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37]"
                    />
                    
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] bg-white w-full md:w-auto"
                    >
                        <option value="default">Sort: Default</option>
                        <option value="A-Z">Sort: Name (A-Z)</option>
                    </select>
                </div>

                {Object.keys(filteredAndSortedProducts).length > 0 ? (
                    Object.entries(filteredAndSortedProducts).map(([category, products]) => (
                        <ProductSection key={category} title={category} products={products} />
                    ))
                ) : (
                    <p className="text-center text-xl text-gray-500 mt-20">No products match your search criteria.</p>
                )}
                
            </div>
        </div>
    );

    if (user) {
        return <UserLayout>{content}</UserLayout>;
    }

    return content;
};

export default Products;