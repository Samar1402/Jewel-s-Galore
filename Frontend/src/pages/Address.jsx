import React, { useEffect, useState } from "react";
import UserLayout from "../Layout/UserLayout";
import axios from "axios";

const Address = () => {
  const userId = "12345"; // Replace with the logged-in user ID dynamically
  const API_URL = "http://localhost:8080/addresses"; // Local backend URL

  const [address, setAddress] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch user address on component mount
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${API_URL}/${userId}`);
        if (res.data) {
          setAddress(res.data);
          setFormData(res.data); // populate form if address exists
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (address) {
        // Update existing address
        const res = await axios.put(`${API_URL}/${userId}`, formData);
        setAddress(res.data);
        alert("Address updated successfully");
      } else {
        // Add new address
        const res = await axios.post(`${API_URL}`, { user_id: userId, ...formData });
        setAddress(res.data);
        alert("Address added successfully");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save address. Please try again.");
    }
  };

  if (loading) return <UserLayout><p>Loading...</p></UserLayout>;

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold text-[#b8860b] mb-6">
        Address Book
      </h1>

      {address ? (
        <div className="mb-6 border p-4 rounded shadow">
          <p><strong>Street:</strong> {address.street}</p>
          <p><strong>City:</strong> {address.city}</p>
          <p><strong>State:</strong> {address.state}</p>
          <p><strong>Pincode:</strong> {address.pincode}</p>
          <p><strong>Country:</strong> {address.country}</p>
        </div>
      ) : (
        <p>No saved address.</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={formData.street}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />

        <button
          type="submit"
          className="bg-[#b8860b] text-white px-4 py-2 rounded"
        >
          {address ? "Update Address" : "Add Address"}
        </button>
      </form>
    </UserLayout>
  );
};

export default Address;
