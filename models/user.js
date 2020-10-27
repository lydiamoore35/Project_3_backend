const { Schema, model } = require("mongoose");

//Outreach SCHEMA
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Can add a max character count to limit this field 
    zipCode: { type:Number, required: true },
  },
  { timestamps: true }
);

//Outreach MODEL
const User = model("user", userSchema );

//EXPORT MODEL
module.exports = User;