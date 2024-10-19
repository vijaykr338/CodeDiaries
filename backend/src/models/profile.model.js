import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    position:{
        type:String,
        default:"N/A"
    },
    summary:{
        type:String,
        default:"N/A"
    },
    location:{
        type:String,
        default:"N/A"
    },
    profile_pic:{
        type:String,
        default:"../../public/user_pic.png"
    },
    bg_pic:{
        type:String,
        default:"../../public/bg_pic.jpeg"
    },
    name:{
        type:String,
        ref:"User"
    },
    email:{
        type:String,
        ref:"User"
    },
    password:{
        type:String,
        ref:"User"
    },
    isItTheuser:{
        type:Boolean,
        default:false
    }
})

export const Profile=mongoose.model("Profile",profileSchema);