const Product = require('../Models/Products'); 
const fs = require('fs/promises'); 
const path = require('path'); 

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error while fetching products.' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required.' });
        }
        const imageUrl = `/uploads/${req.file.filename}`; 

        const newProduct = new Product({
            name,
            price,
            category,
            imageUrl,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);

    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const imagePath = product.imageUrl;
        await Product.deleteOne({ _id: id });
        if (imagePath) {
            const fileName = path.basename(imagePath);
            const absolutePath = path.join(__dirname, '..', 'uploads', fileName); 

            try {
                await fs.access(absolutePath); 
                await fs.unlink(absolutePath);
            } catch (fileError) {
                console.warn(`Could not delete physical file: ${absolutePath}. It may have been missing.`, fileError.message);
            }
        }

        res.status(200).json({ message: 'Product deleted successfully.' });

    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error while deleting product.' });
    }
};

module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
};