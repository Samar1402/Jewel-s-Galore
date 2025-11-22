import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Get backend URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL;

  const handleKeyChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,4}$/.test(val)) {
      setSecurityKey(val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !securityKey.trim()) {
      setMessage("Please fill in all fields");
      return;
    }

  // Name validation
    if (name.trim().length < 3) {
      setMessage("Name must be at least 3 characters long");
      return;
    }

  // Security key validation: must be exactly 4 digits, any number
    if (!/^\d{4}$/.test(securityKey)) {
      setMessage("Security Pin must be 4 digits (numbers only)");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        securityKey,
      });

      localStorage.setItem("token", res.data.token);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 w-[90%] md:w-[400px] text-center text-gray-700">
        <h1 className="text-3xl font-serif mb-6 text-[#b8860b]">Create an Account</h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
          />

          <div className="relative w-full">
            <input
              type={showKey ? "text" : "password"}
              placeholder="4-Digit Security Pin"
              value={securityKey}
              onChange={handleKeyChange}
              inputMode="numeric"
              className="w-full p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#b8860b] cursor-pointer"
            >
              {showKey ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-3 rounded-md shadow-lg hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>

        {message && <p className="mt-4 text-red-600">{message}</p>}

        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#b8860b] hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
