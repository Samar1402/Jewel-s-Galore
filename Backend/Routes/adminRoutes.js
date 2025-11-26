// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { getAdminProfile } = require('../Controllers/adminController');

// Folder: Middlewares (Capitalized - Correct)
// File:   AuthMiddleware.js (Correct)
const authMiddleware = require('../Middlewares/AuthMiddleware'); 


const adminAuth = require('../Middlewares/AdminMiddleware'); 

router.get(
    '/:id', 
    authMiddleware, // 1. Authenticates token (Sets req.user)
    adminAuth,      // 2. Authorizes role (Checks req.user.role === 'admin')
    getAdminProfile // 3. Executes logic
); 


module.exports = router;