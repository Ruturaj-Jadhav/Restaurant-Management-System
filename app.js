if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config();
}
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
const cartRoutes = require("./routes/cart")


const app = express();
const mongoDB = process.env.DATABASE_URL;;
mongoose.connect(mongoDB);
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"));
app.set('view engine', 'ejs')




app.use("/" , userAuthroutes);
app.use("/user",indexWebroutes);
app.post('/cart', cartRoutes);



app.listen(3000 , ()=>{
    console.log("Server Started");


})
