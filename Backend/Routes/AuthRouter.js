const express = require("express");
const router = express.Router();

const { 
  signup, 
  login, 
  getUser,
  verifyPin,
  resetPasswordWithPin
} = require("../Controllers/AuthController");

const { signupValidation, loginValidation } = require("../Middlewares/AuthValidation");

const authMiddleware = require("../Middlewares/AuthMiddleware");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/get-user", authMiddleware, getUser);

router.post("/verify-pin", verifyPin);
router.post("/reset-password-with-pin", resetPasswordWithPin);

module.exports = router;
