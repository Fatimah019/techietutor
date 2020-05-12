const Mongoose=require('mongoose');

const Schema=Mongoose.Schema;

const userSchema=new Schema({
    email:{type:String, required:"Email is required"},
    password:{type:String, required:"Password is required"}
});

module.exports=Mongoose.model('Admin', userSchema);
