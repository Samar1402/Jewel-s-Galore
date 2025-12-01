const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path'); 

// 1. Configuration/Environment Setup
require('dotenv').config();
require('./Models/db'); // Database connection logic

const PORT = process.env.PORT || 8080

// 2. Core Middleware Setup (MUST come before any app.use('/route', ...))
// Handles cross-origin requests
app.use(cors());

// Handles JSON bodies 
app.use(bodyParser.json()); 

// Handles static files like profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 3. Import Route Definitions
const adminRoutes = require('./Routes/adminRoutes'); 
const hashRouter = require('./Routes/tempHash'); 


// 4. Application Routes
app.use('/admin', adminRoutes); 
app.use('/api/utils', hashRouter); 
app.use('/auth', require('./Routes/AuthRouter'));
app.use('/addresses', require('./Routes/AddressRouter'));
app.use('/users', require('./Routes/UserRouter'));

app.use("/api/orders", require(path.join(__dirname, 'Routes', 'orderRoutes')));

app.get('/', (req, res) => res.send("Server is running"));


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})