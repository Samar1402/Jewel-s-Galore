import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import UserLayout from "../Layout/UserLayout"; 

import mainImage from "../assets/Main_Image.jpg";
import giftHam from "../assets/giftHam.jpg";

import pendantImg from "../assets/pendant.jpg";
import earringImg from "../assets/earring.jpg";
import braceletImg from "../assets/bracelet.jpg";
import ringImg from "../assets/ring.jpg";

const Home = () => {
  const { user } = useAuth();

  const giftHampers = [{ name: "Gift Hamper", image: giftHam }];

  const products = [
    { name: "Pendants", image: pendantImg },
    { name: "Earrings", image: earringImg },
    { name: "Bracelets", image: braceletImg },
    { name: "Rings", image: ringImg },
  ];

  // ⭐ Home UI Content (separated for reuse)
  const HomeContent = (
    <div className="w-full mt-8 mb-8 bg-white">
      {/* Hero Section */}
      <div
        className="relative w-full bg-center bg-cover bg-no-repeat rounded-xl shadow-lg overflow-hidden"
        style={{
          backgroundImage: `url(${mainImage})`,
          height: "70vh",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center gap-4 text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl font-semibold drop-shadow-lg">
            Elegance in Every Gift
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl">
            Discover personalized gift hampers and stylish accessories made with
            care and creativity.
          </p>
          <Link to="/products">
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
              Shop Now
            </button>
          </Link>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-20 px-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
          Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <Link to="/products" key={index}>
              <div
                className="relative bg-cover bg-center rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 h-64 flex items-center justify-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
                <h2 className="relative text-white text-2xl font-semibold drop-shadow-lg">
                  {item.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Gift Hampers Section */}
      <div className="mt-16 px-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-10">
          Gift Hampers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {giftHampers.map((item, index) => (
            <Link to="/products" key={index}>
              <div
                className="relative bg-cover bg-center rounded-xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 h-64 flex items-center justify-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
                <h2 className="relative text-white text-2xl font-semibold drop-shadow-lg">
                  {item.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  // ⭐ If logged-in → show sidebar + shift content right
  return user ? <UserLayout>{HomeContent}</UserLayout> : HomeContent;
};

export default Home;
