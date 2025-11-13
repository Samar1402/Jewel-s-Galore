import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // ✅ Update quantity (+ / -)
  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
      .filter((item) => {
        if (item.quantity <= 0) {
          const confirmRemove = window.confirm(
            `Remove "${item.name}" from cart?`
          );
          return !confirmRemove; // remove if confirmed
        }
        return true;
      });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Message for WhatsApp / Instagram
  const message = encodeURIComponent(
    `Hello! I’d like to purchase the following items:\n\n${cart
      .map(
        (item) =>
          `${item.name} - ₹${item.price} x ${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n")}\n\nTotal: ₹${totalPrice}\n\nPlease confirm my order.`
  );

  const whatsappNumber = "916200597532";
  const instagramUsername = "meghas_jewels_galore";

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
  const instagramLink = `https://www.instagram.com/${instagramUsername}/`;

  return (
    <div className="bg-white w-full min-h-screen py-12 px-6">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        🛒 Your Cart
      </h1>

      {/* ✅ Empty cart message */}
      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md p-6">
          {/* ✅ Cart list */}
          <ul className="divide-y divide-gray-300">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-gray-500 text-sm">₹{item.price}</p>
                  </div>
                </div>

                {/* ✅ Quantity controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, +1)}
                    className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <p className="font-semibold text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </li>
            ))}
          </ul>

          {/* ✅ Total */}
          <div className="text-right mt-6 text-lg font-bold text-gray-800">
            Total: ₹{totalPrice}
          </div>

          {/* ✅ Checkout Buttons */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition text-center w-full md:w-auto"
            >
              💬 Checkout on WhatsApp
            </a>

            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition text-center w-full md:w-auto"
            >
              📷 Checkout on Instagram
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
