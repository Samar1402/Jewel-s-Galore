const express = require('express');
const multer = require('multer');
const productController = require('../Controllers/productController');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });
router.post(
    '/products', 
    upload.single('productImage'), 
    productController.createProduct
);

router.get(
    '/products', 
    productController.getAllProducts 
);
router.delete(
    '/products/:id', 
    productController.deleteProduct 
);

module.exports = router;