const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
  
    id: 
    {
     type:Number,
     unique: true
    },
    name: String,
    dob: String,
    email:
    {
        type:String,
        unique:true
    },
    password: String,
    address: String,
    mobileno: Number,
    role: String
});


module.exports = mongoose.model('Student', Student);