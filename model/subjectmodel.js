const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const subjectSchema=new Schema(
{
    name:{type:String},
    courseCode:{type:String},
    textBook:{type:String},
    lessons:[{type:Schema.Types.ObjectId, ref:'Lesson'}]
}
);

module.exports=mongoose.model('Subject', subjectSchema);
