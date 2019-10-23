const payment = require("../payment/processPayment");

module.exports=(app)=>{
    app.post('/api/payment/checkout',function(req,res){
        console.log("URLURL",req.protocol + '://' + req.get('host'))
        payment.initiatePayment(app,req,res);
    });
    app.post('/api/payment/paytm/callback',function(req,res){
        console.log(req.body);    
        payment.verifyPaymentStatus(app,req,res);

    });
};