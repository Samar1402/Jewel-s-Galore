const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const multer = require("multer");
const path = require("path");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/upload/:userId", upload.single("profileImage"), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { profileImage: req.file ? `/uploads/${req.file.filename}` : "" },
      { new: true }
    );
    res.json({ message: "Profile image updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
