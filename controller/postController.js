const post= require("../model/post");
const user=require("../model/user");
const mongoose = require("mongoose");

exports.createPost= async(req,res)=>{
    try{
const {user_id,title,description}=req.body;
if(!title||!description){
    return res.status(404).json({
        success:false,
        message:"All Fields Are Required",
        
    });

}

const newPost= await post.create({
    title,
    description,
    user_id
});
console.log(newPost);
 const updatedUser= await user.findByIdAndUpdate( {_id:user_id},{$push:{
    post:newPost._id,
}},{new:true},);

return res.status(200).json({
    success:true,
    message:"Post Created Successfully"
});

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to create Post "
        });
    }
}

exports.updatePost=async (req,res)=>{
    try{
    const {post_id,title,description}= req.body;
    if(!title||!description){
        return res.status(404).json({
            success:false,
            message:"All Fields Are Required",
            
        });

    
    }

    const updatedPost= await user.findByIdAndUpdate( {_id:post_id},{ 
        title:title,
        description:description,

    },{new:true},);
    console.log(updatedPost);
    
    return res.status(200).json({
        success:true,
        message:"Post Updated Successfully"
    });
    

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to update Post "
        });
    }
}

exports.deletePost= async(req,res)=>{
    try{
    const post_id= req.body;
   const deletedPost= await post.findByIdAndDelete(post_id);
   const {userid}= deletedPost;
   const updatedUserPost= await user.findByIdAndUpdate(userid,{$pull:{
   post:post_id,
 }},{new:true});

 return res.status(200).json({
    success:true,
    message:"  Post Deleted Successfully ",
});}
catch(error){
    console.log(error.message);
    return res.status(500).json({
        success:false,
        message:"Unable to delete Post "
    });
}

}
exports.getAllPost= async(req,res)=>{
    try{
const Allpost = await post.find({});

return res.status(200).json({
    success:true,
    message:"  Product Fetched Successfully ",
});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Post "
        });
    }
}

exports.getOnePost= async(req,res)=>{
    try{
        const {post_id}= req.body;
const Allpost = await post.find(post_id).populate("comment").exec();



return res.status(200).json({
    success:true,
    message:"  Product Fetched Successfully ",
});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to fetch Post "
        });
    }
}