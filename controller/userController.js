const user= require("../model/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.signup= async (req,res)=>{
    try{
  const {firstName,lastName,email,password,confirmPassword,role}=req.body;
  if(!firstName||!lastName||!email||!password||!confirmPassword||!role){
    return res.status(404).json({
        success:false,
        message:"All fields are required"
    });
  }
  if(role=="Attorney"){
    var {categ_id}=req.body;

    if(!categ_id){
      return res.status(404).json({
        success:false,
        message:"Category is required"
    });
    }
  }
  const existingUser= await user.findOne({email});
  if(existingUser){
    return res.status(404).json({
        success:false,
        message:"User already exist "
    });
  }
  if(password!=confirmPassword){
    return res.status(404).json({
        success:false,
        message:"Password and Confirm Password should be same "
    });
  }

  let hashedPassword;
  try{
    hashedPassword  = await bcrypt.hash(password,10);

  }
  catch(error){
    return res.status(500).json({
        success:false,
        message:"Error in Hashing Password ",
    });
  }
  
const newUser = await user.create({firstName,lastName,password:hashedPassword,email,image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,role,gender:null,phone_no:null,image:NULL});
if(role=="Attorney"){
  const updatedCategory= await category.findByIdAndUpdate( {_id:categ_id},{$push:{
    user:newUser,
}},{new:true}).populate("user").exec();
}
console.log("newUser=",newUser);

return res.status(200).json({
    success:true,
    message:"SignUp Successfully",

});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"SignUp Failed",
        });
    }
}

exports.login= async (req,res)=>{
    try{
  const {email, password}= req.body;
  if(!email||!password){
    return res.status(404).json({
        success:false,
        message:"All fields are required"
    });
  }

  const existingUser= await user.findOne({email});
  if(!existingUser){
    return res.status(404).json({
        success:false,
        message:"User not exist "
    });
  }

  const payload={
    email:existingUser.email,
    user_id:existingUser._id,
    role:existingUser.role
  }
  if(await bcrypt.compare(password,existingUser.password)){

    const token = jwt.sign(payload,process.env.JWT_SECRET,{
      expiresIn:"2h",
      httpOnly:true,
  });
  existingUser.token =token;
  existingUser.password=undefined;


  const options={
      expires:new Date(Date.now()+ 3*24*60*60*1000),
  }

  res.cookie("uid",token,options).status(200).json({
      success:true,
      token,
      existingUser,
      message:"Logged in Succesfully",

  })
     
}
else{
    return res.status(500).json({
        success:false,
        message:"Password Is Incorrect",
       });
}
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Login Failed",
        });
    }
}