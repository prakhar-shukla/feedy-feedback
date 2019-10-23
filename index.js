const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session'); 
const keys = require('./config/keys')

require('./models/User');
require("./services/passport");

mongoose.connect(keys.mongoDBURI); 

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys:[keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
authRoutes(app);
paymentRoutes(app);

if(process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'));
  
  const path= require('path');
  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'));
  })
}

const PORT = process.env.PORT || 5000;
console.log("Listening on port ",PORT)
app.listen(PORT);
