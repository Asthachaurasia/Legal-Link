const profile= require("../model/profile");
const user= require("../model/user");

 
exports.updateProfile= async(req,res)=>{
    try{
        
 const {firstName,lastName,email,gender,phone_no,image,user_id}=req.body;
 if(!firstName||!lastName||!email){
    return res.status(404).json({
        success:false,
        message:"These fields are required"
    });
 }
 const updatedUser= await user.findByIdAndUpdate(user_id,{$push:{
    firstName:firstName,
    lastName:lastName,
    email:email,
    gender:gender,
    phone_no:phone_no,
    image:image,
 }});
 console.log(updatedUser);
 return res.status(200).json({
    success:true,
    message:"Profile Updated Successfully "
});

    }
    catch(error){
        console.log(error.message);
        return res.status(200).json({
            success:true,
            message:"Unable to Update Profile "
        });
    }
}