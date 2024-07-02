const comment= require("../model/comment");
const user = require("../model/user");
const post = require("../model/post");


exports.createComment= async(req,res)=>{
try{
    const {user_id,description,post_id  }= req.body;
if(!description){
    return res.status(404).json({
        success:false,
        message:"All fields are required"
    });
}

const newComment= await comment.create({
description,
post_id,
user_id
});
console.log(newComment);
 const updatedPost= await post.findByIdAndUpdate( {_id:post_id},{$push:{
    comment:newComment._id,
}},{new:true});

return res.status(200).json({
    success:true,
    message:"  Comment created Successfully ",
});
}
catch(error){
    console.log(error.message);
    return res.status(500).json({
        success:false,
        message:"Unable to comment"
    });
}
}

exports.deleteComment= async(req,res)=>{
    try{
        const {comment_id   }= req.body;
     
    const deletedComment = await comment.findByIdAndDelete(comment_id);
     const {post_id}= deletedComment;
     const updatedPostComment= await post.findByIdAndUpdate({post_id},{$pull:{
        comment:comment_id,
     }});
     return res.status(200).json({
        success:true,
        message:"  Comment Deleted Successfully ",
    });
    
    
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Unable to comment"
        });
    }
    }

