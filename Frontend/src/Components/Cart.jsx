import React, { useEffect, useState} from "react";
import UserLayout from "../Layout/UserLayout";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Components/CartContext";
import { authFetch } from "../utils/api";
import axios from "axios"; 
import { FaEdit, FaPlus, FaHome, FaMapMarkedAlt, FaGlobe } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const { user } = useAuth();
  const { cartItems: cart, updateQuantity, clearCart } = useCart();
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const navigate = useNavigate(); 

  const API_URL = import.meta.env.VITE_API_URL + "/addresses"; 

  useEffect(() => {
    if (!user) {
      setAddressLoading(false);
      return;
    }

    const fetchAddress = async () => {
      try {
        // Fetches the user's primary address from the address collection
        const res = await axios.get(`${API_URL}/${user._id}`);
        if (res.data) {
          setAddress(res.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
            setAddress(null);
        } else {
            console.error("Error fetching address in Cart:", error);
        }
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddress();
  }, [user]);

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
      .join("\n")}\n\nTotal Amount: ₹${totalPrice}\n\nDelivery Address:\n${
        address 
          ? `${address.street}, ${address.city}, ${address.state} - ${address.pincode}, ${address.country}` 
          : "Address not provided."
      }`
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  const handleRemoveConfirmation = (itemId) => {
    if (window.confirm("Are you sure you want to remove this item from the cart?")) {
      updateQuantity(itemId, -1);
    }
  };

  const handleAddressAction = () => {  
    navigate('/user/address'); 
  };
  
  const handleCheckout = async () => {
    if (!user) return alert("Please login first!");
    if (cart.length === 0) return alert("Your cart is empty!");
    
    if (!address) return alert("Please add a delivery address before checkout!");

    const orderData = {
      items: cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),
      totalAmount: totalPrice,
      deliveryAddress: address, 
    };

    const res = await authFetch(
      "/api/orders",
      {
        method: "POST",
        body: JSON.stringify(orderData),
      },
      user.token
    );

    if (res.ok) {
      alert("Order placed successfully! Redirecting to WhatsApp.");
      clearCart();
      window.open(whatsappLink, "_blank");
    } else {
      const errorData = res.data || {};
      alert(`Failed to place order: ${errorData.message || "Server error"}`);
    }
  };
  
  const AddressDisplay = () => (
    <div className="bg-white p-5 rounded-xl shadow-inner mb-6 border border-gray-300">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Delivery Address 📍
            </h2>
            <button
                onClick={handleAddressAction}
                className="flex items-center gap-1 bg-[#b8860b] text-white px-3 py-1 rounded-lg text-sm hover:bg-[#a3790a] transition duration-200"
            >
                {address ? <FaEdit /> : <FaPlus />} 
                {address ? "Edit Address" : "Add Address"}
            </button>
        </div>
        {addressLoading ? (
            <p className="text-gray-500">Loading address...</p>
        ) : address ? (
            <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                    <FaHome className="text-[#b8860b]" /> 
                    {address.street}, {address.city}, {address.state}, {address.pincode}, {address.country}
                </p>
            </div>
        ) : (
            <p className="text-red-500 font-medium">No address saved. Please add an address to proceed with checkout.</p>
        )}
    </div>
  );

  const content = (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-center text-4xl mb-8 font-bold text-gray-800">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-5 rounded-xl shadow-lg mb-6"> 
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b last:border-b-0 py-4">
                <div className="flex gap-4 items-center flex-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover shadow-md"
                  />
                  <div>
                    <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mx-8 min-w-[120px] justify-center">
                  <button
                    onClick={() => {
                      if (item.quantity <= 1) {
                        handleRemoveConfirmation(item.id);
                      } else {
                        updateQuantity(item.id, -1);
                      }
                    }}
                    className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition duration-150 shadow-md"
                  >
                    -
                  </button>

                  <span className="font-bold w-6 text-center text-lg text-gray-800">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition duration-150 shadow-md"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-xl w-24 text-right text-gray-900">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}

            <div className="text-right text-2xl mt-6 font-extrabold border-t pt-4 text-gray-900">
              Total: ₹{totalPrice}
            </div>
          </div>
          
          {user && <AddressDisplay />} 

          <button
            onClick={handleCheckout}
            className={`mt-6 ${address ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} text-white px-6 py-3 rounded-lg w-full text-lg font-semibold transition duration-200 shadow-xl`}
            disabled={!address} 
          >
            {address ? "Checkout & WhatsApp" : "Add Address to Checkout"}
          </button>
        </div>
      )}
    </div>
  );

  return user ? <UserLayout>{content}</UserLayout> : content;
};

export default Cart;