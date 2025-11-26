import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout"; 
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🎯 FIX: Import useNavigate

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  
  // 🎯 FIX: Initialize useNavigate
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    // 🔑 FIX: Enforce login if adminId or token is missing
    if (adminId && token) {
      fetchAdmin();
    } else {
        console.error("Authentication data missing. Redirecting to login.");
        // 🎯 FIX: Redirect the user if not authorized
        navigate('/login'); 
    }
    // Add navigate to dependency array
  }, [adminId, token, navigate]); 

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAdmin(res.data);
      
      // Use a placeholder image if profileImage is null
      const profileImagePath = res.data.profileImage 
        ? `${API_URL}${res.data.profileImage}` 
        // 🎯 OPTION: Use a local path (or better placeholder) to fix NET::ERR_NAME_NOT_RESOLVED
        : 'https://via.placeholder.com/160/0D47A1/FFFFFF?text=ADMIN';
        
      setPreview(profileImagePath);

    } catch (err) {
      console.error("Error fetching admin profile:", err.response ? err.response.data : err.message);
      
      // 🎯 FIX: Handle 401 (Unauthorized) or 403 (Forbidden) response from the backend
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          console.error("Token invalid or role unauthorized. Redirecting.");
          // Clear storage on failure
          localStorage.removeItem('token');
          localStorage.removeItem('adminId');
          navigate('/login');
      }
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageUpload = async () => {
    if (!image) return alert("Select an image");

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      await axios.put(`${API_URL}/admin/upload/${adminId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile image updated");
      fetchAdmin();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${API_URL}/admin/${adminId}`,
        { name: admin.name, email: admin.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Details updated");
    } catch (err) {
      console.error(err);
    }
  };

  if (!admin) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

        {/* Image Section */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview}
            className="w-40 h-40 rounded-full object-cover border mb-4"
            alt="Admin"
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />

          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded mb-2"
            onClick={() => fileInputRef.current.click()}
          >
            Change Image
          </button>

          {image && (
            <button
              className="bg-green-700 text-white px-4 py-2 rounded"
              onClick={handleImageUpload}
            >
              Upload Image
            </button>
          )}
        </div>

        {/* Name */}
        <label className="font-semibold">Name</label>
        <input
          className="w-full p-2 border rounded mb-4"
          value={admin.name || ''}
          onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
        />

        {/* Email */}
        <label className="font-semibold">Email</label>
        <input
          className="w-full p-2 border rounded mb-4"
          value={admin.email || ''}
          onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;