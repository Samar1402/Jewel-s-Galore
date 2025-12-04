import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
        try { 
            const userData = JSON.parse(saved);
            setUser(userData);
            if (userData.token || userData.jwtToken) {
                 localStorage.setItem("token", userData.token || userData.jwtToken);
            }
        } catch(e) {
            console.error("Error parsing user data:", e);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
    }
    setIsLoading(false); 
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token || userData.jwtToken || "");
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("adminId"); 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}> {/* <-- ADDED isLoading */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);