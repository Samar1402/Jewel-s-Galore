const express = require('express');
const router = express.Router();
const Address = require('../Models/address');

// Get address by user ID
router.get('/:userId', async (req, res) => {
  try {
    const address = await Address.findOne({ user_id: req.params.userId });
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new address
router.post('/', async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update existing address
router.put('/:userId', async (req, res) => {
  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { user_id: req.params.userId },
      req.body,
      { new: true }
    );
    res.json(updatedAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
