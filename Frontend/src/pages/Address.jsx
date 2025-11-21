import React, { useEffect, useState } from "react";
import UserLayout from "../Layout/UserLayout";
import { FaHome, FaCity, FaMapMarkedAlt, FaGlobe, FaMailBulk } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const Address = () => {
  const { user } = useAuth();
  const [address, setAddress] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });
  const [loading, setLoading] = useState(true);

  const states = ["Bihar", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu"];
  const countries = ["India", "USA", "UK", "Canada"];

  const API_URL = import.meta.env.VITE_API_URL + "/addresses";

  // Fetch the logged-in user's address
  useEffect(() => {
    if (!user) return;

    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${API_URL}/${user._id}`);
        if (res.data) {
          setAddress(res.data);
          setFormData(res.data); // pre-fill form
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("User not found");

    try {
      let res;
      if (address) {
        // Update existing address
        res = await axios.put(`${API_URL}/${user._id}`, formData);
        alert("Address updated successfully");
      } else {
        // Add new address
        res = await axios.post(`${API_URL}`, { user_id: user._id, ...formData });
        alert("Address added successfully");
      }
      setAddress(res.data);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  if (loading) return <UserLayout><p>Loading...</p></UserLayout>;
  if (!user) return <UserLayout><p>Please login to see your address.</p></UserLayout>;

  return (
    <UserLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-[#b8860b] mb-6 text-center">Address Book</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Show saved address only if available */}
          {address && (
            <div className="flex-1 bg-gradient-to-r from-[#1a1a1a] to-[#2c2c2c] p-6 rounded-2xl shadow-2xl text-[#f5e6c5] border border-[#d4af37]/30">
              <h2 className="text-2xl font-semibold text-[#ffd700] mb-6 text-center">Saved Address</h2>
              <div className="space-y-4">
                <p className="flex items-center gap-2"><FaHome className="text-[#ffd700]" /> <strong>Street:</strong> {address.street}</p>
                <p className="flex items-center gap-2"><FaCity className="text-[#ffd700]" /> <strong>City:</strong> {address.city}</p>
                <p className="flex items-center gap-2"><FaMapMarkedAlt className="text-[#ffd700]" /> <strong>State:</strong> {address.state}</p>
                <p className="flex items-center gap-2"><FaMailBulk className="text-[#ffd700]" /> <strong>Pincode:</strong> {address.pincode}</p>
                <p className="flex items-center gap-2"><FaGlobe className="text-[#ffd700]" /> <strong>Country:</strong> {address.country}</p>
              </div>
            </div>
          )}

          {/* Always show the form to add/update address */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-2xl border border-[#ffd700]/20">
            <h2 className="text-2xl font-semibold text-[#b8860b] mb-6 text-center">
              {address ? "Update Address" : "Add Address"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3 border p-3 rounded-lg focus-within:ring-2 ring-[#b8860b]">
                <FaHome className="text-[#b8860b]" />
                <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} className="w-full focus:outline-none" required />
              </div>

              <div className="flex items-center gap-3 border p-3 rounded-lg focus-within:ring-2 ring-[#b8860b]">
                <FaCity className="text-[#b8860b]" />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full focus:outline-none" required />
              </div>

              <div className="flex items-center gap-3 border p-3 rounded-lg focus-within:ring-2 ring-[#b8860b]">
                <FaMapMarkedAlt className="text-[#b8860b]" />
                <select name="state" value={formData.state} onChange={handleChange} className="w-full focus:outline-none bg-transparent" required>
                  <option value="">Select State</option>
                  {states.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-3 border p-3 rounded-lg focus-within:ring-2 ring-[#b8860b]">
                <FaMailBulk className="text-[#b8860b]" />
                <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full focus:outline-none" required />
              </div>

              <div className="flex items-center gap-3 border p-3 rounded-lg focus-within:ring-2 ring-[#b8860b]">
                <FaGlobe className="text-[#b8860b]" />
                <select name="country" value={formData.country} onChange={handleChange} className="w-full focus:outline-none bg-transparent" required>
                  <option value="">Select Country</option>
                  {countries.map((country) => <option key={country} value={country}>{country}</option>)}
                </select>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-[#b8860b] to-[#ffd700] text-white py-3 rounded-xl shadow-lg font-semibold hover:scale-105 transition-transform">
                {address ? "Update Address" : "Add Address"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Address;
