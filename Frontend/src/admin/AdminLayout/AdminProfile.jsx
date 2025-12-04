import React, { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout"; 
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const AdminProfile = () => {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");

  const PLACEHOLDER_URL = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='gray'><path d='M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z' /></svg>";

  const getFullImageUrl = (path) => {
    if (!path) return PLACEHOLDER_URL;
    if (path && path.startsWith('/uploads')) {
        return `${API_URL}${path}`;
    }
    return path; 
  };
  
  const [admin, setAdmin] = useState(null);
  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState(PLACEHOLDER_URL); 
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (adminId && token) {
      fetchAdmin();
    } else {
        console.error("Authentication data missing. Redirecting to login.");
        navigate('/login'); 
    }
  }, [adminId, token, navigate]); 

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setAdmin(res.data);
      setPreview(getFullImageUrl(res.data.profileImage));

    } catch (err) {
      console.error("Error fetching admin profile:", err.response ? err.response.data : err.message);
      
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('token');
          localStorage.removeItem('adminId');
          navigate('/login');
      }
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleImageUpload = async () => {
    if (!image) return alert("Please select an image to upload.");

    const formData = new FormData();
    formData.append("profileImage", image);

    try {
      await axios.put(`${API_URL}/admin/upload/${adminId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile image updated successfully.");
      fetchAdmin(); 
      
      setImage(null); 
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; 
      }

    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please check the console for errors.");
    }
  };
    
  const handleImageRemove = async () => {
    if (!admin.profileImage) {
        return alert("There is no image to remove.");
    }

    if (!window.confirm("Are you sure you want to remove the current profile image?")) {
        return;
    }

    try {
        await axios.delete(`${API_URL}/admin/remove-image/${adminId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        alert("Profile image removed successfully.");
        fetchAdmin(); 

    } catch (error) {
        console.error("Image removal failed:", error);
        alert("Image removal failed. Please check the console for errors.");
    }
  };


  if (!admin) return <AdminLayout><p>Loading...</p></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-xl mt-6">
        <div className="flex flex-col items-center mb-6">
          <img
            src={preview}
            className="w-40 h-40 rounded-full object-cover border mb-4"
            alt="Admin Profile"
            onError={(e) => { e.target.onerror = null; e.target.src=PLACEHOLDER_URL }}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />

          <div className="flex space-x-2">
            <button
              className="bg-yellow-600 text-white px-4 py-2 rounded mb-2 hover:bg-yellow-700 transition"
              onClick={() => fileInputRef.current.click()}
            >
              Change Image
            </button>
              
            {image ? (
                <button
                  className="bg-green-700 text-white px-4 py-2 rounded mb-2 hover:bg-green-800 transition"
                  onClick={handleImageUpload}
                >
                  Upload Image
                </button>
            ) : (
                admin.profileImage && (
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded mb-2 hover:bg-red-700 transition"
                        onClick={handleImageRemove}
                    >
                        Remove Image
                    </button>
                )
            )}
          </div>
        </div>

        <label className="font-semibold block mb-1">Name</label>
        <p className="w-full p-3 bg-gray-100 border border-gray-300 rounded mb-4 text-gray-800 font-medium">
          {admin.name || 'N/A'}
        </p>
        <label className="font-semibold block mb-1">Email</label>
        <p className="w-full p-3 bg-gray-100 border border-gray-300 rounded mb-6 text-gray-800 font-medium">
          {admin.email || 'N/A'}
        </p>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;