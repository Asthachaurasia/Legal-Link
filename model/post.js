const mongoose = require("mongoose");

const postSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    title:{
 type:String,
 required:true,
 
    },
    description:{
        type:String,
        required:true,
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment",
    }],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"like",
    }]

})

module.exports=mongoose.model("Post",postSchema);