const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  name: String,
  emails: Array,
  photos: Array,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
