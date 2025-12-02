const express = require('express');
const router = express.Router();

const { getAdminProfile, updateProfileImage, removeProfileImage } = require('../Controllers/adminController'); 
const upload = require('../Middlewares/uploadMiddleware'); 
const authMiddleware = require('../Middlewares/AuthMiddleware'); 
const adminAuth = require('../Middlewares/AdminMiddleware'); 

router.get(
    '/:id', 
    authMiddleware, 
    adminAuth,      
    getAdminProfile 
); 

router.put(
    '/upload/:id',
    authMiddleware,
    adminAuth,
    upload.single('profileImage'), 
    updateProfileImage
);

router.delete(
    '/remove-image/:id',
    authMiddleware,
    adminAuth,
    removeProfileImage
);


module.exports = router;