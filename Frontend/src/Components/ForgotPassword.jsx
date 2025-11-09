import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 w-[90%] md:w-[400px] text-center text-gray-700">
        <h1 className="text-3xl font-serif mb-6 text-[#b8860b]">
          Forgot Password
        </h1>
        <p className="text-sm mb-6 text-gray-600">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-3 rounded-md shadow-lg hover:scale-105 transition-transform"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-sm">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-[#b8860b] hover:underline font-medium"
          >
            Go Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
