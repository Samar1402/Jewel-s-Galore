import { createContext, useContext, useState, useEffect } from "react";
// --- CHANGE 1: Import useAuth to access user details ---
import { useAuth } from "../Context/AuthContext"; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // --- CHANGE 2: Get the current user from AuthContext ---
  const { user } = useAuth();

  // --- CHANGE 3: Initialize state as empty (we load data in useEffect now) ---
  const [cartItems, setCartItems] = useState([]);

  // --- CHANGE 4: Effect to Load Cart OR Clear Cart based on User ---
  useEffect(() => {
    if (user && user.email) {
      // If user is logged in, load THEIR specific cart from key "cart_user@email.com"
      const userCartKey = `cart_${user.email}`;
      const saved = localStorage.getItem(userCartKey);
      setCartItems(saved ? JSON.parse(saved) : []);
    } else {
      // If user logs out (user is null), CLEAR the cart state immediately
      setCartItems([]);
    }
  }, [user]); // Runs whenever 'user' changes (login/logout)

  // --- CHANGE 5: Effect to Save Cart to the specific user's key ---
  useEffect(() => {
    if (user && user.email) {
      const userCartKey = `cart_${user.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // --- Functions below remain mostly the same, but rely on the state above ---

  const addToCart = (item) => {
    // Optional safety: Don't add if not logged in
    if (!user) return; 

    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);