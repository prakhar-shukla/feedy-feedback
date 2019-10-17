const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session'); 
const keys = require('./config/keys')

require('./models/User');
require("./services/passport");

const authRoutes = require("./routes/authRoutes");

mongoose.connect(keys.mongoDBURI); 

const app = express();
app.use(cookieSession({
    maxAge: 30*24*60*60*1000,
    keys:[keys.cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

const PORT = process.env.PORT || 5000;
console.log("Listening on port ",PORT)
app.listen(PORT);
