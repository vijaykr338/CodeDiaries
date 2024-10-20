import { Profile } from "../models/profile.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const viewProfile = async (req, res) => {
  try {
    // const id =new mongoose.Types.ObjectId(req.params.id);
    // let position="VP of Customer Operation";
    // let summary="loren epsum ahsvcybdnc dhg cgv JBYAEG CHvu bH GU EVEU WHVGUVEA";
    // let location= "San Francisco , CA ,USA";
    // let profile_pic="../../public/user_pic.png";
    // let bg_pic="../../public/bg_pic.jpeg";
    // let name="Assaf Rappaport";
    // let email="assaf@gmail.com";
    // let password="assaf123";
    // let isItTheuser="true";
    // const result=await Profile.create({
    //     position,
    //     summary,
    //     location,
    //     profile_pic,
    //     bg_pic,
    //     name,
    //     email,
    //     password,
    //     isItTheuser
    // })
    // console.log(result);
    const email=req.params.email;
    const profile = await Profile.findOne({email});
    // console.log(id);
    // console.log(profile);

    if (!profile) {
      return res.status(404).send("User not found");
    }

    // if (profile.email === req.session.email) {
    //   profile.isItTheUser = true;
    // }

    res.status(200).send(profile);
  } catch (err) {
    console.error("Error fetching details:", err);
    res.status(400).send("Error fetching details");
  }
};

const uploadProfile=async(req,res)=>{
  const email= "assaf@gmail.com"|| req.session.email;
  // const type=req.params.type;
  // console.log(req);
  if (!email) {
    return res.status(401).send("Unauthorized! Please Log In");
  }

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return res.status(404).send("User not found");
  }
  // console.log(req.files);
  // console.log(req.file.path);
  const image=[];
  image.push(req.file.path);
  let image_url;
  if(image){
   image_url=await uploadOnCloudinary(image);
  //  console.log(image_url);
  }
  if(image_url){
    profile.profile_pic= image_url[0]||profile.profile_pic;
  }
  else{
    console.error("Error updating profile");
    res.status(500).send("An error occurred while updating the profile");
  }

  try {
    // Save the updated profile to the database
    await profile.save();
    // console.log(profile);
    res.status(200).send({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating the profile");
  }
}

const uploadBg=async(req,res)=>{
  const email= "assaf@gmail.com"|| req.session.email;
  // const type=req.params.type;
  // console.log(req);
  if (!email) {
    return res.status(401).send("Unauthorized! Please Log In");
  }

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return res.status(404).send("User not found");
  }
  // console.log(req.files);
  // console.log(req.file.path);
  const image=[];
  image.push(req.file.path);
  let image_url;
  if(image){
   image_url=await uploadOnCloudinary(image);
  //  console.log(image_url);
  }
  if(image_url){
    profile.bg_pic= image_url[0]||profile.bg_pic;
  }
  else{
    console.error("Error updating profile");
    res.status(500).send("An error occurred while updating the profile");
  }

  try {
    // Save the updated profile to the database
    await profile.save();
    // console.log(profile);
    res.status(200).send({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating the profile");
  }
}

const updateProfile = async (req, res) => {
  const email ="assaf@gmail.com"|| req.session.email;
  if (!email) {
    return res.status(401).send("Unauthorized! Please Log In");
  }

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return res.status(404).send("User not found");
  }

  const { name, position, location } = req.body;
  // console.log(req.body);
  // console.log("files",req.files);
  // Declare variables outside the if-else block
  // let profile_pic;
  // let bg_pic;

  // Check if files were uploaded and assign paths, otherwise use existing values from profile
  // if (req.files && req.files[0] && req.files[0].path) {
  //   let profilePic=req.files[0].path;
  //   profile_pic = await uploadOnCloudinary(profilePic);
  // } else {
  //   profile_pic = profile.profile_pic;
  // }

  // if (req.files && req.files[1] && req.files[1].path) {
  //   bg_pic = req.files[1].path;
  // } else {
  //   bg_pic = profile.bg_pic;
  // }

  // Update the profile with new data
  profile.name = name || profile.name;
  profile.position = position || profile.position;
  profile.location = location || profile.location;
  profile.profile_pic = profile.profile_pic;
  profile.bg_pic = profile.bg_pic;
  profile.isItTheUser = profile.isItTheUser;

  try {
    // Save the updated profile to the database
    await profile.save();
    res.status(200).send({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating the profile");
  }
};

const updateSummary = async (req, res) => {
  const email ="assaf@gmail.com"|| req.session.email;
  if (!email) {
    return res.status(401).send("Unauthorized! Please Log In");
  }

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return res.status(404).send("User not found");
  }

  const summary = req.body.summary;
  profile.summary = summary || profile.summary;

  try {
    // Save the updated profile to the database
    await profile.save();
    res.status(200).send({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating the profile");
  }
};

export { viewProfile, updateProfile, updateSummary ,uploadProfile,uploadBg};
