import { Profile } from "../models/profile.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const viewProfile = async (req, res) => {
  try {
   
    const email=req.params.email;
    const profile = await Profile.findOne({email});

    if (!profile) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(profile);
  } catch (err) {
    console.error("Error fetching details:", err);
    res.status(400).send("Error fetching details");
  }
};

const uploadProfile=async(req,res)=>{
  const email= "assaf@gmail.com"|| req.session.email;
  if (!email) {
    return res.status(401).send("Unauthorized! Please Log In");
  }

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return res.status(404).send("User not found");
  }
  const image=[];
  image.push(req.file.path);
  let image_url;
  if(image){
   image_url=await uploadOnCloudinary(image);
  }
  if(image_url){
    profile.profile_pic= image_url[0]||profile.profile_pic;
  }
  else{
    console.error("Error updating profile");
    res.status(500).send("An error occurred while updating the profile");
  }

  try {
    await profile.save();
    res.status(200).send({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating the profile");
  }
}

const uploadBg=async(req,res)=>{
  const email= "assaf@gmail.com"|| req.session.email;
  if (!email) {
    return res.status(401).send("Unauthorized! Please Log In");
  }

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return res.status(404).send("User not found");
  }
 
  const image=[];
  image.push(req.file.path);
  let image_url;
  if(image){
   image_url=await uploadOnCloudinary(image);
 
  }
  if(image_url){
    profile.bg_pic= image_url[0]||profile.bg_pic;
  }
  else{
    console.error("Error updating profile");
    res.status(500).send("An error occurred while updating the profile");
  }

  try {
    await profile.save();
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
  profile.name = name || profile.name;
  profile.position = position || profile.position;
  profile.location = location || profile.location;
  profile.profile_pic = profile.profile_pic;
  profile.bg_pic = profile.bg_pic;
  profile.isItTheUser = profile.isItTheUser;

  try {
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
    await profile.save();
    res.status(200).send({ message: "Profile updated successfully", profile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("An error occurred while updating the profile");
  }
};

export { viewProfile, updateProfile, updateSummary ,uploadProfile,uploadBg};
