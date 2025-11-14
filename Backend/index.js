const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path'); 

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080

app.use(bodyParser.json());
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', require('./Routes/AuthRouter'));
app.use('/addresses', require('./Routes/AddressRouter'));
app.use('/users', require('./Routes/UserRouter'));

app.get('/', (req, res) => res.send("Server is running"));

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

