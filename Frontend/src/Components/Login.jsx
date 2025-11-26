import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext.jsx"; 

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter both email and password");
      return;
    }

    setMessage("");
    
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { jwtToken, _id, name, profileImage, role } = res.data;
      
      const isAdmin = role === "admin"; 

      // Store token and update application state
      localStorage.setItem("token", jwtToken);
      
      // 🔑 FIX: Explicitly set/clear the adminId for AdminProfile.jsx
      if (isAdmin) {
          localStorage.setItem("adminId", _id); 
      } else {
          localStorage.removeItem("adminId");
      }

      login({
        _id,
        email: res.data.email,
        name,
        token: jwtToken,
        profileImage: profileImage || "",
        role: role || "user",
      });

      setMessage("Login Successful!");

      // Conditional Navigation
      const redirectPath = isAdmin ? "/adminDashboard" : "/dashboard"; 
      
      setTimeout(() => {
        navigate(redirectPath);
      }, 800);

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 md:p-10">
        <h2 className="text-4xl font-serif font-semibold text-center text-[#b8860b] mb-8">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#b8860b] focus:border-[#b8860b] transition duration-150"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-[#b8860b] focus:border-[#b8860b] transition duration-150"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-3 rounded-lg hover:from-[#a0740a] hover:to-[#e0c100] transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        {/* Message Display */}
        {message && (
          <p className={`text-center mt-4 font-medium ${message.includes('Successful') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {/* Links */}
        <div className="text-center text-gray-600 text-sm mt-6 space-y-2">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#b8860b] hover:underline font-medium">
              Sign Up
            </Link>
          </p>
          <p>
            <Link to="/forgot" className="text-[#b8860b] hover:underline font-medium">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
      </div>
  );
};

export default Login;