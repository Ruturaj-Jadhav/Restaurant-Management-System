const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type : String,
        required : true

    },
    customerNumber: {
        type : String,
        unique : true,
        required : true
    },
    order : [
        {
            dish :{
                type : String
            },
            quantity : {
                type : Number
            },
            price : {
                type : Number
            }
        }
    ],
    bill : {
        type : Number,
        required : true
    },
    
})