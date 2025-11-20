import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  // --- CHANGE 1: State Management for 2 Stages ---
  const [stage, setStage] = useState('verification'); // 'verification' or 'reset'
  
  // --- CHANGE 2: State for Inputs ---
  const [email, setEmail] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- CHANGE 3: Handler for 4-Digit Security Pin Input ---
  const handleKeyChange = (e) => {
    const val = e.target.value;
    // Enforce 4 digits, numbers only
    if (/^\d{0,4}$/.test(val)) {
        setSecurityKey(val);
    }
  };

  // ------------------------------------------------------------------
  // --- STAGE 1: VERIFICATION LOGIC (Email + Pin) ---
  // ------------------------------------------------------------------

  const handleVerification = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || securityKey.length !== 4) {
      setError("Please enter a valid email and 4-digit security pin.");
      return;
    }

    setLoading(true);

    try {
      // NOTE: This assumes you have a backend endpoint /auth/verify-pin
      const res = await axios.post(
        "http://localhost:8080/auth/verify-pin", // <--- UPDATE BACKEND ENDPOINT
        { email, securityKey }
      );
      
      // If verification is successful (Backend sends a success code/message)
      setMessage("Verification successful. Please set your new password.");
      setStage('reset'); // Move to Stage 2
      setError("");
      
    } catch (err) {
      console.error("Verification Error:", err.response?.data || err.message);
      // Generic error for security
      setError(err.response?.data?.message || "Verification failed. Check your email and pin.");
    } finally {
      setLoading(false);
    }
  };


  // ------------------------------------------------------------------
  // --- STAGE 2: PASSWORD RESET LOGIC ---
  // ------------------------------------------------------------------

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword.length < 4) {
        setError("Password must be at least 4 characters long.");
        return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // NOTE: This assumes you have a backend endpoint /auth/reset-password-with-pin
      const res = await axios.post(
        "http://localhost:8080/auth/reset-password-with-pin", // <--- UPDATE BACKEND ENDPOINT
        { email, securityKey, newPassword } // Must send all 3 for backend re-validation
      );
      
      setMessage("Password successfully changed! Redirecting to login...");
      setError("");
      
      // Redirect after success
      setTimeout(() => {
        navigate("/login"); 
      }, 2000);
      
    } catch (err) {
      console.error("Reset Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Password reset failed. Please try the verification again.");
      setStage('verification'); // Go back to stage 1 on critical failure
    } finally {
      setLoading(false);
    }
  };


  // ------------------------------------------------------------------
  // --- RENDER FUNCTION ---
  // ------------------------------------------------------------------

  const renderVerificationForm = () => (
    <form className="flex flex-col gap-5" onSubmit={handleVerification}>
        <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            disabled={loading}
            required
        />
        <input
            type="text"
            placeholder="4-Digit Security Pin"
            value={securityKey}
            onChange={handleKeyChange} // Use pin handler
            maxLength={4} // Enforce max length visually
            inputMode="numeric"
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            disabled={loading}
            required
        />
        <button
            type="submit"
            className="bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-3 rounded-md shadow-lg transition-all 
            disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            disabled={loading}
        >
            {loading ? "Verifying..." : "Verify and Change Password"}
        </button>
    </form>
  );

  const renderResetForm = () => (
    <form className="flex flex-col gap-5" onSubmit={handlePasswordReset}>
        <p className="text-sm font-semibold text-green-700">Enter your new password.</p>
        <input
            type="password"
            placeholder="New Password (min 4 chars)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            disabled={loading}
            required
        />
        <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            disabled={loading}
            required
        />
        <button
            type="submit"
            className="bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-3 rounded-md shadow-lg transition-all 
            disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
            disabled={loading}
        >
            {loading ? "Resetting..." : "Set New Password"}
        </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 w-[90%] md:w-[400px] text-center text-gray-700">
        <h1 className="text-3xl font-serif mb-6 text-[#b8860b]">
          {stage === 'verification' ? 'Verify Identity' : 'Change Password'}
        </h1>
        <p className="text-sm mb-6 text-gray-600">
          {stage === 'verification' 
            ? 'Enter your registered email and the 4-digit security pin.'
            : 'Verification succeeded. Enter your desired new password.'}
        </p>

        {/* --- CHANGE 4: Message Display --- */}
        {error && (
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}
        {message && (
          <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm">
            {message}
          </p>
        )}
        {/* --- END OF CHANGE 4 --- */}
        
        {/* --- CHANGE 5: Conditional Form Rendering --- */}
        {stage === 'verification' ? renderVerificationForm() : renderResetForm()}
        {/* --- END OF CHANGE 5 --- */}

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