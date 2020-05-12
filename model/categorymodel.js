const Mongoose=require('mongoose');

const Schema=Mongoose.Schema;

const categorySchema=new Schema(
{
    name:{type:String},
    description:{type:String},
    subjects:[{type:Schema.Types.ObjectId, ref:'Subject'}]
},
{
    timestamps:true
}
);

module.exports=Mongoose.model("Category", categorySchema);


