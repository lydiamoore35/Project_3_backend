const { Schema, model } = require("mongoose");

//Outreach SCHEMA
const outreachSchema = new Schema(
  {
    name: String,
    age: Number,
    img: String,
  },
  { timestamps: true }
);

//Outreach MODEL
const Outreach = model("outreach", outreachSchema);

//EXPORT MODEL
//module.exports = Outreach;
