const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT || 8080

// app.get('/SignUp',(req,res)=>{
//     res.send("Successfully SignUp")
// })

app.use(bodyParser.json());
app.use(cors())
app.use('/auth', require('./Routes/AuthRouter'));



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

