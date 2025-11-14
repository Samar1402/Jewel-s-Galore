// import React from "react";

// const Login = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
//         {/* Title */}
//         <h2 className="text-4xl font-serif font-semibold text-center text-[#b8860b] mb-8">
//           Welcome Back
//         </h2>

//         {/* Email Input */}
//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2 font-medium">Email</label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
//           />
//         </div>

//         {/* Password Input */}
//         <div className="mb-8">
//           <label className="block text-gray-700 mb-2 font-medium">
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
//           />
//         </div>

//         {/* Login Button */}
//         <button
//           type="button"
//           className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
//         >
//           Login
//         </button>

//         {/* Optional Links */}
//         <div className="text-center text-gray-600 text-sm mt-6 space-y-2">
//           <p>
//             Don’t have an account?{" "}
//             <a href="/signup" className="text-[#b8860b] hover:underline">
//               Sign Up
//             </a>
//           </p>
//           <p>
//             <a href="/forgot" className="text-[#b8860b] hover:underline">
//               Forgot Password?
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../Context/AuthContext.jsx"; 

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:8080/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.jwtToken);

//       // Optional: Show success message
//       setMessage("Login Successful!");

//       // Redirect to dashboard after 1s
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
//         <h2 className="text-4xl font-serif font-semibold text-center text-[#b8860b] mb-8">
//           Welcome Back
//         </h2>

//         <form className="flex flex-col gap-6" onSubmit={handleLogin}>
//           <div>
//             <label className="block text-gray-700 mb-2 font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-2 font-medium">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
//           >
//             Login
//           </button>
//         </form>

//         {message && <p className="text-red-600 text-center mt-4">{message}</p>}

//         <div className="text-center text-gray-600 text-sm mt-6 space-y-2">
//           <p>
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-[#b8860b] hover:underline">
//               Sign Up
//             </Link>
//           </p>
//           <p>
//             <Link to="/forgot" className="text-[#b8860b] hover:underline">
//               Forgot Password?
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", res.data.jwtToken);

      // IMPORTANT — update AuthContext so Header updates
      login({
        email: res.data.email,
        name: res.data.name,
        token: res.data.jwtToken,
      });

      setMessage("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-2xl p-10">
        <h2 className="text-4xl font-serif font-semibold text-center text-[#b8860b] mb-8">
          Welcome Back
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-2 rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Login
          </button>
        </form>

        {message && <p className="text-red-600 text-center mt-4">{message}</p>}

        <div className="text-center text-gray-600 text-sm mt-6 space-y-2">
          <p>
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#b8860b] hover:underline">
              Sign Up
            </Link>
          </p>
          <p>
            <Link to="/forgot" className="text-[#b8860b] hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
