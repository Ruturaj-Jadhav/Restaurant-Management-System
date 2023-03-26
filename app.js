const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const app = express();
const mongoDB = "mongodb://127.0.0.1:27017/user-auth?directConnection=true";
const JWT_SECRET = "JNJSNJXJSODJ67CDCWKLCWOPI@#$%88723"
mongoose.connect(mongoDB);
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static("public"));
app.set('view engine', 'ejs')
var arr = [];
var username;
var datta;

const Usermodel = require('./models/user.model');


app.get('/' , (req , res)=>{
    res.sendFile(__dirname + '/public/register.html');
})

app.get('/login' , (req , res)=>{
  res.sendFile(__dirname + '/public/login.html');
})

app.post('/register' , async (req , res)=>{
  const username = req.body.username;
  const textpassword = req.body.password;


  const password =await bcrypt.hash(textpassword , 10);

  try {
    const response = await Usermodel.create ({
      username : username ,
      password : password
    })

    console.log("User Created successfully : " , response )
  }
  catch(error){
    if(error.code === 11000){
      return res.json({status : "error" , error : "Username already in use"})
    }

    throw error

  }

  res.json({status : 'ok'})
})


app.post('/login' , async (req , res)=>{
  username = req.body.username
  const password = req.body.password

  const user = await Usermodel.findOne({username}).lean()

  if(!user){
    return res.json({status : "error" , error : "User not found"})
  }

  data =  await Usermodel.findOne({username} , {'_id' : 0 , 'menu' : 1, 'dish' : 1})



  if(await bcrypt.compare(password , user.password)) {


    const token = jwt.sign(
    {
       id : user._id ,
       username : user.username
    },
    JWT_SECRET
    )

  console.log(data)

   res.render("restaurantview" , {menu : data.menu})


  }
  else{
    res.json({status : "error" , error : "Invalid Password"})
  }



})


// app.post('/menu' , async (req , res)=>{
//      try {
//       var food = req.body.fooditem
//       console.log
//      }
//      catch(error){
//       console.log(error)
//      }

//     try {
//      await Usermodel.findOneAndUpdate({username : username} , {
//       $push : {
//         menu : {
//           dish : "Mutton biryani"
//         }
//       }
//      })
//     }
//     catch(error){
//       console.log(error)
//     }


// })



app.post('/menu' , async (req,res)=>{
  var item =  req.body.dishh
  var price = req.body.price
  const user = await Usermodel.findOne({username}).lean()


  

 await Usermodel.findOneAndUpdate({username : username} , {
    $push : {
      menu : {
        dish : item ,
        price : price
      }
    }
  })

  // const data = fs.readFileSync(user)
  dataa =  await Usermodel.findOne({username} , {'_id' : 0 , 'menu' : 1})

  res.render("restaurantview" )


  
})

app.get('/user', async (req , res)=>{
   
   var items = await Usermodel.findOne({username : username} , {'_id' : 0 , 'menu' : 1})
   res.render("userview" , {dishs : items.menu , prices : items.menu})

})



app.listen(3000 , ()=>{
    console.log("Server Started");


})
