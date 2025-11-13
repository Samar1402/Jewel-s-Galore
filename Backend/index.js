const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080

app.get('/SignUp',(req,res)=>{
    res.send("Successfully SignUp")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

