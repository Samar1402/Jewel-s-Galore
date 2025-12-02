const UserModel = require("../Models/user");
const fs = require('fs');
const path = require('path');

const deleteFileFromDisk = (relativePath) => {
    if (!relativePath) return;

    let fullPath;
    if (relativePath.startsWith('/D:') || relativePath.startsWith('/C:')) {
        fullPath = relativePath.substring(1).replace(/\//g, path.sep);
    } 
    else if (relativePath.startsWith('/uploads')) {
        const fileRelativePath = relativePath.substring(1);
        fullPath = path.join(__dirname, '..', fileRelativePath);
    } 
    else {
        return;
    }
    
    fs.unlink(fullPath, (err) => {
        if (err && err.code !== 'ENOENT') {
            console.error(`Error deleting file (${err.code}): ${fullPath}`);
        }
    });
};

const getAdminProfile = async (req, res) => {
    try {
        const adminId = req.params.id; 
        const admin = await UserModel.findOne({ _id: adminId, role: 'admin' }).select('-password'); 

        if (!admin) {
            return res.status(404).json({ message: "Admin profile not found or user is not an Admin.", success: false });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error("Error fetching admin profile:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const updateProfileImage = async (req, res) => {
    try {
        const adminId = req.params.id;

        if (!req.file) {
            return res.status(400).json({ message: "No image file provided.", success: false });
        }

        const existingAdmin = await UserModel.findById(adminId);

        if (!existingAdmin || existingAdmin.role !== 'admin') {
            deleteFileFromDisk(req.file.path); 
            return res.status(404).json({ message: "Admin not found or role mismatch.", success: false });
        }
        deleteFileFromDisk(existingAdmin.profileImage);
        
        const absolutePath = req.file.path.replace(/\\/g, '/');
        const uploadsIndex = absolutePath.indexOf('uploads'); 
        let relativeFilePath;

        if (uploadsIndex !== -1) {
            relativeFilePath = '/' + absolutePath.substring(uploadsIndex); 
        } else {
            console.error("Multer path configuration error. Saving full path as fallback.");
            relativeFilePath = '/' + absolutePath;
        }
        
        const updatedAdmin = await UserModel.findOneAndUpdate(
            { _id: adminId }, 
            { profileImage: relativeFilePath }, 
            { new: true, select: '-password' } 
        );

        res.status(200).json({ 
            message: "Profile image updated successfully.", 
            success: true, 
            profileImage: updatedAdmin.profileImage 
        });

    } catch (error) {
        console.error("Error updating admin profile image:", error);
        if (req.file) deleteFileFromDisk(req.file.path); 
        res.status(500).json({ message: "Internal Server Error during image upload.", success: false });
    }
};

const removeProfileImage = async (req, res) => {
    try {
        const adminId = req.params.id;
        
        const existingAdmin = await UserModel.findById(adminId);

        if (!existingAdmin || existingAdmin.role !== 'admin') {
            return res.status(404).json({ message: "Admin not found or role mismatch.", success: false });
        }

        const imagePathToRemove = existingAdmin.profileImage;
        
        if (!imagePathToRemove) {
            return res.status(400).json({ message: "No image found to remove.", success: false });
        }
        deleteFileFromDisk(imagePathToRemove);
        
        const updatedAdmin = await UserModel.findOneAndUpdate(
            { _id: adminId }, 
            { profileImage: null }, 
            { new: true, select: '-password' } 
        );

        res.status(200).json({ 
            message: "Profile image removed successfully.", 
            success: true, 
            profileImage: updatedAdmin.profileImage 
        });

    } catch (error) {
        console.error("Error removing admin profile image:", error);
        res.status(500).json({ message: "Internal Server Error during image removal.", success: false });
    }
};

module.exports = {
    getAdminProfile,
    updateProfileImage,
    removeProfileImage 
};