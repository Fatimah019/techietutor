const Mongoose=require('mongoose');

const Schema=Mongoose.Schema;

const userSchema=new Schema({
    name:{type:String, required:"Username is required"},
    email:{type:String, required:"Email is required"},
    password:{type:String, required:"Password is required"},
    education:{type:String, required:"your education status is required"}
});

module.exports=Mongoose.model('Tutor', userSchema);
