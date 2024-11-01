import mongoose from "mongoose";

const profileSchema=new mongoose.Schema({
    position:{
        type:String,
        default:"Enter your position"
    },
    summary:{
        type:String,
        default:"Enter summary"
    },
    location:{
        type:String,
        default:"Enter your location"
    },
    profile_pic:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    bg_pic:{
        type:String,
        default:"https://img.freepik.com/premium-vector/laptop-with-word-keyboard-screen_906149-48380.jpg?w=1380"
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
    isItTheUser:{
        type:Boolean,
        default:true
    }
})

export const Profile=mongoose.model("Profile",profileSchema);