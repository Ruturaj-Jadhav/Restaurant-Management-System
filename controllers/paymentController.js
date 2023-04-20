const Razorpay = require('razorpay');
module.exports.orders = (req,res)=> {
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
    res.send({orders});
}

module.exports.verify = (req,res)=> {
    res.send({verify});
}