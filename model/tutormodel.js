const Mongoose=require('mongoose');

const Schema=Mongoose.Schema;

const tutorSchema=new Schema({
    first:{type:String, required:"First name is required"},
    last:{type:String, required:"Last name is required"},
    email:{type:String, required:"Email is required"},
    password:{type:String, required:"Password is required"},
    isAdmin:{type:Boolean, default:false},
    role:{type:String}
});

module.exports=Mongoose.model('Tutor', tutorSchema);
