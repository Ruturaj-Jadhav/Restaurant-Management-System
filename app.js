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
const Razorpay = require('razorpay');


var arr = [];
const indexWebroutes = require('./routes/index')
const userAuthroutes = require("./routes/userauthentication")
const cartRoutes = require("./routes/cart")
// const paymentController = require("./controllers/paymentController")
const paymentroutes = require("./routes/payment");


const app = express();
const mongoDB = process.env.DATABASE_URL;;
mongoose.connect(mongoDB);
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"));
app.set('view engine', 'ejs')



// app.post('/orders',paymentController.orders);
app.use("/" , userAuthroutes); // user auth routes
app.use("/user",indexWebroutes);
// app.post('/cart', cartRoutes);
// app.use('payment', paymentroutes);
// app.post('/orders',paymentController.orders);
// app.post('/verify',paymentController.verify);

app.post('/orders' , (req,res)=>{
    const Razorpay_Key = process.env.RAZORPAY_KEY_ID;
    const Razorpay_Secret = process.env.RAZORPAY_KEY_SECRET;

    let instance = new Razorpay({key_id: Razorpay_Key, key_secret: Razorpay_Secret});

    var options = {
        amount: req.body.amount * 100,
        currency: "INR",
    };

    instance.orders.create(options, function(err,order) {
        if (err) {
            return res.send({code: err.code, message: err.message});
        }
        res.send({code: 200 , message:"orders created successfully" , data:order});
    })
})



app.listen(3000 , ()=>{
    console.log("Server Started");


})
