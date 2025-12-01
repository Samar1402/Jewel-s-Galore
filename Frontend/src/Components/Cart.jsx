import React from "react";
import UserLayout from "../Layout/UserLayout";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Components/CartContext";
import { authFetch } from "../utils/api"; 

const Cart = () => {
  const { user } = useAuth();
  const { cartItems: cart, updateQuantity, clearCart } = useCart(); 

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const whatsappNumber = "916200597532";

  const message = encodeURIComponent(
    `Hello! I want to order:\n\n${cart
      .map(
        (item) =>
          `${item.name} - ₹${item.price} x ${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n")}\n\nTotal Amount: ₹${totalPrice}`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleRemoveConfirmation = (itemId) => {
    if (window.confirm("Are you sure you want to remove this item from the cart?")) {
      updateQuantity(itemId, -1); 
    }
  };

  const handleCheckout = async () => {
    console.log("--- CHECKOUT FUNCTION STARTED ---"); 
    
    if (!user) return alert("Please login first!");

    console.log("User Token Status:", user.token ? "Token is present." : "Token is MISSING!");

    const orderData = {
      items: cart.map(item => ({ 
            name: item.name,
            qty: item.quantity,
            price: item.price
        })),
      totalAmount: totalPrice
    };

    const res = await authFetch("/api/orders", { 
      method: "POST",
      body: JSON.stringify(orderData)
    }, user.token);
    
    console.log("Checkout API Status:", res.status); 

    if (res.ok) {
        console.log("Order placed successfully! Redirecting...");
        alert("Order placed successfully! Redirecting to WhatsApp.");
        clearCart();
        window.open(whatsappLink, "_blank");
    } else {
        const errorData = res.data || {};
        console.error(`API FAILED: ${res.status} - ${errorData.message || 'Unknown Error'}`); 
        alert(`Failed to place order: ${errorData.message || 'Server error'}`);
    }
  };

  const content = (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-center text-4xl mb-8 font-bold">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-gray-100 p-5 rounded-xl shadow">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-4">
              
              {/* Item Details */}
              <div className="flex gap-4 items-center flex-1">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2 mx-8">
                <button
                  onClick={() => {
                        if (item.quantity === 1) {
                            handleRemoveConfirmation(item.id);
                        } else {
                            updateQuantity(item.id, -1);
                        }
                    }}
                  className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-150"
                >
                  -
                </button>
                <span className="font-semibold w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition duration-150"
                >
                  +
                </button>
              </div>
              
              {/* Subtotal */}
              <p className="font-bold text-xl w-24 text-right">₹{item.price * item.quantity}</p>
            </div>
          ))}

          <div className="text-right text-2xl mt-6 font-extrabold border-t pt-4">
            Total: ₹{totalPrice}
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg w-full text-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Checkout & WhatsApp
          </button>
        </div>
      )}
    </div>
  );

  return user ? <UserLayout>{content}</UserLayout> : content;
};

export default Cart;