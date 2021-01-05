const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken:String,
  expireToken:Date,
  profilepic:{
    type: String,
    default: "https://res.cloudinary.com/prochesta-eis/image/upload/v1609338746/twitter-avi-gender-balanced-figure_c0pc99.png"
  },
  followers:[{type:ObjectId, ref:"User"}],
  following:[{type:ObjectId, ref:"User"}]
});

module.exports = mongoose.model("User", userSchema);
