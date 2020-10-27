const { Schema, model } = require("mongoose");

//Outreach SCHEMA
const outreachSchema = new Schema(
  {
    title: { type: String, required: true },
    cause: { type: String, required: true }, // Can add a max character count to limit this field to prevent lengthy paragraphs 
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

  },
  { timestamps: true }
);

//Outreach MODEL
const Outreach = model("outreach", outreachSchema);

//EXPORT MODEL
module.exports = Outreach;
