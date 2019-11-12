const payment = require("../payment/processPayment");
const requireLogin= require("../middlewares/requireLogin");

module.exports=(app)=>{
    app.post('/api/payment/checkout',requireLogin,function(req,res){
        payment.initiatePayment(app,req,res);
    });
    app.post('/api/payment/paytm/callback',function(req,res){
        console.log(req.body);   
        console.log("PAYTM CALLBACK USER",req.user);  
        payment.verifyPaymentStatus(app,req,res);

    });
};