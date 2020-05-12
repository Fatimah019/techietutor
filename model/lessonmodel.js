const Mongoose=require('mongoose');

const Schema=Mongoose.Schema;
const lessonSchema=new Schema(
{
    title:{type:String},
    note:{type:String}
},
{
    timestamps:true
}
);
module.exports=Mongoose.model('Lesson', lessonSchema);

