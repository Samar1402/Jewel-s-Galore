import React, { useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import UserLayout from "../Layout/UserLayout";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  // Initialize preview with the profileImage path from the context
  const [preview, setPreview] = useState(user?.profileImage || ""); 
  const fileInputRef = useRef(null);

  if (!user) return <UserLayout><p>Loading...</p></UserLayout>;

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle upload 
  const handleUpload = async () => {
    if (!image) return alert("Please select an image");
    if (!user._id) return alert("User ID is missing, please re-login.");

    const formData = new FormData();
    formData.append("profileImage", image);
    
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:8080/users/upload/${user._id}`,
        formData,
        { 
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}` 
          } 
        }
      );
      console.log(res.data); 
      alert("Profile image updated successfully");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    }
  };

  return (
    <UserLayout>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex flex-col items-center border p-8 rounded shadow w-102">
          <div className="relative w-48 h-48 mb-6">
            {preview ? (
              <img
                // --- CRITICAL FIX START: Construct the full path to the backend server (localhost:8080) ---
                src={preview.startsWith('/uploads') ? `http://localhost:8080${preview}` : preview} 
                // --- CRITICAL FIX END ---
                alt="Profile"
                className="w-48 h-48 rounded-full object-cover border"
              />
            ) : (
              <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center border">
                <svg
                  className="w-24 h-24 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"
                  />
                </svg>
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          <button
            className="bg-[#b8860b] text-white px-6 py-3 rounded mb-4 text-lg"
            onClick={() => fileInputRef.current.click()}
          >
            Update Image
          </button>

          {image && (
            <button
              className="bg-green-600 text-white px-6 py-3 rounded mb-4 text-lg"
              onClick={handleUpload} 
            >
              Upload
            </button>
          )}

          <p className="mb-2 text-lg"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;