import mongoose from "mongoose";

export  const connectDb=async()=>{
    try{
        const connectionInstance=await mongoose.connect("mongodb://localhost:27017/profile");
        console.log("Mongoose connected successfully");
    }
    catch(err){
        console.log("error connecting to mongoose"+ err);
    }

}