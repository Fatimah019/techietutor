const Mongoose=require('mongoose');

const Schema=Mongoose.Schema;

const studentSchema=new Schema({
    first:{type:String, required:"First name is required"},
    last:{type:String, required:"Last name is required"},
    email:{type:String, required:"Email is required"},
    password:{type:String, required:"Password is required"},
    role:{type:String}
});

module.exports=Mongoose.model('Student', studentSchema);
