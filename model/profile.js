const mongoose= require("mongoose");

const profileSchema= new mongoose.Schema({
    gender:{
        type:Strimg,
        enum:["Male","Female"],
    },
    phone_no:{
        type:string,
        
    },
    image:{
 type:String,

    }

})

module.exports= mongoose.model("profile",profileSchema);