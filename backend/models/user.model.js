const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type:String, required:true},
    gender:{type:String, required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    DOB:{type:Date,required:true}
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;