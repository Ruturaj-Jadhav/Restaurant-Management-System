const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
var username;
var router = express.Router();


router.post('/add-cart' , async (req,res)=>{
    var dishes = [];
    var totalPrice = 0;
    totalPrice =  totalPrice + req.body.price;
    dishes.push({dish : req.body.dish, price : req.body.price});

    res.send(dishes ,totalPrice);
})

module.exports = router;

