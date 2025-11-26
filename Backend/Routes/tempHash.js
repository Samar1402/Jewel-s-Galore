const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

// ⚠️ WARNING: DELETE THIS ROUTE IMMEDIATELY AFTER GETTING THE HASH!

router.post('/hash-password', async (req, res) => {
    // We expect the plain-text password in the JSON body: { "password": "..." }
    const { password } = req.body;
    
    if (!password) {
        return res.status(400).json({ message: "Password field is required." });
    }

    try {
        const saltRounds = 10;
        // Generate the hash
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Return the secure hash string to Postman
        res.json({ hash: hashedPassword }); 
    } catch (error) {
        console.error("Hashing error:", error);
        res.status(500).json({ message: "Failed to generate hash." });
    }
});

module.exports = router;