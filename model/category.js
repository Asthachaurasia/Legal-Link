const mongoose= require("mongoose");
const categorySchema= new mongoose.Schema({
    title:{
    type:String,
     required:true
    },
    user:[{
 type:mongoose.Schema.Types.ObjectId,
 ref:"user"

    }]
});
module.exports= mongoose.model("category",categorySchema);