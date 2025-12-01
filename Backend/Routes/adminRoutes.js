
const express = require('express');
const router = express.Router();
const { getAdminProfile } = require('../Controllers/adminController');

const authMiddleware = require('../Middlewares/AuthMiddleware'); 


const adminAuth = require('../Middlewares/AdminMiddleware'); 

router.get(
    '/:id', 
    authMiddleware, 
    adminAuth,      
    getAdminProfile 
); 


module.exports = router;