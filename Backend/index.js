const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path'); 

require('dotenv').config();
require('./Models/db'); 

const PORT = process.env.PORT || 8080

app.use(cors());
app.use(bodyParser.json()); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const adminRoutes = require('./Routes/adminRoutes'); 
const hashRouter = require('./Routes/tempHash'); 
const dashboardRouter = require('./Routes/dashboardRoutes'); 

app.use('/admin', adminRoutes); 
app.use('/api/utils', hashRouter); 
app.use('/auth', require('./Routes/AuthRouter'));
app.use('/addresses', require('./Routes/AddressRouter'));
app.use('/users', require('./Routes/UserRouter'));

app.use("/api/dashboard", dashboardRouter); 

app.use("/api/orders", require(path.join(__dirname, 'Routes', 'orderRoutes')));

app.get('/', (req, res) => res.send("Server is running"));


app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})