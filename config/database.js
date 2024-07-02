const mongoose= require("mongoose");

require("dotenv").config();

function databseConnect(){
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
        useUnifiedTopology:true,
  }).then(()=>{console.log("Database Connected Succesfully ")
    
    console.log('Connected to database:', mongoose.connection.name);})
   .catch((error)=>{
    console.log("Database Connection Failed");
    console.log(error.message);
    process.exit(1);
   })
}; 
 
module.exports=databseConnect;