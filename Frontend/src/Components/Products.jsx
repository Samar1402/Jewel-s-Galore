import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import UserLayout from "../Layout/UserLayout";

import pendantImg from "../assets/pendant.jpg";
import earringImg from "../assets/earring.jpg";
import braceletImg from "../assets/bracelet.jpg";
import ringImg from "../assets/ring.jpg";
import giftHam from "../assets/giftHam.jpg";

const Products = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const products = [
    { id: 1, name: "Pendants", price: 999, image: pendantImg },
    { id: 2, name: "Earrings", price: 799, image: earringImg },
    { id: 3, name: "Bracelets", price: 1199, image: braceletImg },
    { id: 4, name: "Rings", price: 899, image: ringImg },
  ];

  const giftHampers = [
    { id: 5, name: "Gift Hamper", price: 1199, image: giftHam },
  ];

  const handleIncrease = (item) => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const handleDecrease = (id) => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getQuantity = (id) => {
    const found = cart.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const content = (
    <div className="bg-white w-full min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
        Our Collection
      </h1>

      {/* Products Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Products
          <hr className="border-t-2 border-gray-300 my-2" />
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
                className="h-64 w-full object-cover cursor-pointer"
                onClick={() => navigate(`/product/${item.name.toLowerCase()}`)}
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 mb-3">₹{item.price}</p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    –
                  </button>

                  <span className="font-semibold text-gray-800">
                    {getQuantity(item.id)}
                  </span>

                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Hampers Section */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Gift Hampers
          <hr className="border-t-2 border-gray-300 my-2" />
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
                className="h-64 w-full object-cover cursor-pointer"
                onClick={() =>
                  navigate(`/gift-hamper/${item.name.toLowerCase()}`)
                }
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-500 mb-3">₹{item.price}</p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    –
                  </button>

                  <span className="font-semibold text-gray-800">
                    {getQuantity(item.id)}
                  </span>

                  <button
                    onClick={() => handleIncrease(item)}
                    className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (user) {
    return <UserLayout>{content}</UserLayout>;
  }

  return content;
};

export default Products;
