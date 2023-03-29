const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var router = express.Router();

const Usermodel = require('../models/user.model.js');
  
  router.get('/viewmenu', async (req , res)=>{
    var username = "Takemitchi";
    const user = await Usermodel.findOne({username}).lean()
     
     var items = await Usermodel.findOne({username : username} , {'_id' : 0 , 'menu' : 1})
     res.render("menu" , {dishs : items.menu , prices : items.menu})
  
  })

  module.exports = router;
  