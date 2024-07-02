const post= require("../model/post");
const category= require("../model/category");


exports.createategory= async(req,res)=>{
    try{
        const {title}=req.body;
        
        if(!title){
            return res.status(400).json({
                success:false,
                message:"All fields are required ",
                 });
        }
        const categorydetail = await category.create({
            title:title,
           categ_id:categorydetail.id
        
          });
          console.log(categorydetail);
        
          return res.status(200).json({
            success:true,
            message:"Category Created Successfully ",
             });
    }

    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in category creation ",
             });
    }
}

exports.showAllCategory = async (req,res)=>{
    try{
    const allCategory = await category.find({},{title:true});
    return res.status(200).json({
        success:true,
        message:"Category fetched successfully ",
         });
    
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
             });
    }
    };
    
    