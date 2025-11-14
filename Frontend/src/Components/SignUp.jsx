// import React from "react";
// import { Link } from "react-router-dom";

// const SignUp = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 w-[90%] md:w-[400px] text-center text-gray-700">
//         <h1 className="text-3xl font-serif mb-6 text-[#b8860b]">
//           Create an Account
//         </h1>

//         <form className="flex flex-col gap-5">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="p-3 rounded-md bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
//           />
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white font-semibold py-3 rounded-md shadow-lg hover:scale-105 transition-transform"
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-6 text-sm">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-[#b8860b] hover:underline font-medium"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/signup", {
        name,
        email,
        password,
      });

      // Save JWT to localStorage
      localStorage.setItem("token", res.data.token);

      // Show success message
      setMessage(res.data.message);

      // Redirect after 1s
      setTimeout(() => {
        navigate("/dashboard"); // change to your dashboard route
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-10 w-[90%] md:w-[400px] text-center text-gray-700">
        <h1 className="text-3xl font-serif mb-6 text-[#b8860b]">
          Create an Account
        </h1>

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
          <Link
            to="/login"
            className="text-[#b8860b] hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
