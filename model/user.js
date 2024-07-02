const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    firstName:{
 type:String,
 required:true,
    },
    lastName:{
        type:String,
 required:true,
    },
    email:{
        type:"string",
        required:true,

    },
    password:{
        type:"string",
        required:true,
    },
    image:{
        type:String,
    },
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"profile",
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    }],
    role:{
        type:String,
        enum:["Client","Attorney"],
    }

})
module.exports=mongoose.model("user",userSchema);