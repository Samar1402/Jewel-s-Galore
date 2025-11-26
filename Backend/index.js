const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path'); 

require('dotenv').config();
require('./Models/db');

// 👇 1. IMPORT ADMIN ROUTES
const adminRoutes = require('./Routes/adminRoutes'); // Assuming you named your file adminRoutes.js

// 👇 2. IMPORT THE TEMPORARY HASH ROUTER
const hashRouter = require('./Routes/tempHash'); 

const PORT = process.env.PORT || 8080

// --- Middleware Setup ---
app.use(bodyParser.json()); 
app.use(cors())

// Serve static image files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Route Registrations ---

// 🎯 CHANGE: MOUNT THE ADMIN ROUTER (Resolves the 404 Error)
app.use('/admin', adminRoutes); 

// Standard Routes
app.use('/api/utils', hashRouter); 
app.use('/auth', require('./Routes/AuthRouter'));
app.use('/addresses', require('./Routes/AddressRouter'));
app.use('/users', require('./Routes/UserRouter'));

app.get('/', (req, res) => res.send("Server is running"));

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})