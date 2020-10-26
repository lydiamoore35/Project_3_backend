const {Schema, model} = require('mongoose');

//User Auth Schema
const authSchema = new Schema (
  {
    username: {type:String, required:true, unique:true},
    password: {type:String, require:true},
    zipCode: {type:Number, required:true}
},
  {timestamps:true}
);

const User = model('auth', authSchema);

module.exports = User