const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const qs = require('qs')
const axios = require('axios'); 

var arr = [];
const indexWebroutes = require('./routes/index')
const userAuthroutes = require("./routes/userauthentication")

const app = express();
const mongoDB = "mongodb://127.0.0.1:27017/user-auth?directConnection=true";
mongoose.connect(mongoDB);
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"));
app.set('view engine', 'ejs')




app.use("/" , userAuthroutes);
app.use("/user",indexWebroutes);
app.post('/cart', (req,res)=>{
    arr.push(req.body.item);
    console.log(arr);
})



app.listen(3000 , ()=>{
    console.log("Server Started");


})
