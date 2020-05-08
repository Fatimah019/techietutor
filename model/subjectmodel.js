const Mongoose=require('mongoose');
const Category=require('../model/categorymodel');
const Schema=Mongoose.Schema;

const subjectSchema=new Schema(
{
    name:{type:String},
    courseCode:{type:String},
    textBook:{type:String},
    category:{type:Schema.Types.ObjectId, ref:'Category'}
}
);

module.exports=Mongoose.model('Subjects', subjectSchema);
