import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import product images
import pendantImg from "../assets/pendant.jpg";
import earringImg from "../assets/earring.jpg";
import braceletImg from "../assets/bracelet.jpg";
import ringImg from "../assets/ring.jpg";
import giftHam from "../assets/giftHam.jpg";

const Products = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Pendants", price: 999, image: pendantImg },
    { id: 2, name: "Earrings", price: 799, image: earringImg },
    { id: 3, name: "Bracelets", price: 1199, image: braceletImg },
    { id: 4, name: "Rings", price: 899, image: ringImg },
  ];

  const giftHampers = [
    { id: 5, name: "Gift Hamper", price: 1499, image: giftHam },
  ];

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="bg-white w-full min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Our Collection
      </h1>

      {/* Products Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
                onClick={() => navigate(`/product/${item.name.toLowerCase()}`)}
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 mb-3">₹{item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Hampers Section */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Gift Hampers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {giftHampers.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
                onClick={() =>
                  navigate(`/gift-hamper/${item.name.toLowerCase()}`)
                }
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 mb-3">₹{item.price}</p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Cart Summary */}
      {cart.length > 0 && (
        <div className="mt-16 bg-gray-100 rounded-xl p-6 max-w-3xl mx-auto shadow-inner">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            🛒 Your Cart ({cart.length} items)
          </h2>
          <ul className="divide-y divide-gray-300">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex justify-between py-2 text-gray-700"
              >
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4 font-semibold text-gray-800">
            Total: ₹{cart.reduce((sum, i) => sum + i.price, 0)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
