const { Schema, model } = require("mongoose");

//Outreach SCHEMA
const outreachSchema = new Schema(
  {
    title:{type: String ,required: true },
    cause:{tye: String , required: true},
    location: {type: String, required: true},
    startDate: {type: String, required:true},
    endDate: {type:String, required:true},
  },
  { timestamps: true }
);

//Outreach MODEL
const Outreach = model("outreach", outreachSchema);

//EXPORT MODEL
//module.exports = Outreach;
