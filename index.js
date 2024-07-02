const express= require("express");
const cookieParser = require('cookie-parser');
 const app=express();
 require("dotenv").config();
 app.use(cookieParser());
 const PORT= process.env.PORT||3000;
 const databaseConnect = require("./config/database");
 databaseConnect();
 
 app.listen(PORT,()=>{
     console.log(`Server Started ${PORT}`);
 
 })
 
 app.get("/",(req,res)=>{
     res.send("This Route Is Not Defined");
 })
 

