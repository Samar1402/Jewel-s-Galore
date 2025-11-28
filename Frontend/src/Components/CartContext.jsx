import { createContext, useContext, useState, useEffect } from "react";
// --- CHANGE 1: Import useAuth to access user details ---
import { useAuth } from "../Context/AuthContext"; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const { user } = useAuth();

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      const userCartKey = `cart_${user.email}`;
      const saved = localStorage.getItem(userCartKey);
      setCartItems(saved ? JSON.parse(saved) : []);
    } else {
      setCartItems([]);
    }
  }, [user]); 
  useEffect(() => {
    if (user && user.email) {
      const userCartKey = `cart_${user.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

 
  const addToCart = (item) => {
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