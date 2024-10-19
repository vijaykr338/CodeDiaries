import { Profile } from "../models/profile.model.js";
import mongoose from "mongoose";

const viewProfile = async (req, res) => {
  try {
    const id =new mongoose.Types.ObjectId(req.params.id);
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
    const profile = await Profile.findOne({_id:id});
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

const updateProfile = async (req, res) => {
  const email = req.session.email;
  if (!email) {
    return res.status(401).send("Unauthorized! Please Log In");
  }

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return res.status(404).send("User not found");
  }

  const { name, position, location } = req.body;

  // Declare variables outside the if-else block
  let profile_pic;
  let bg_pic;

  // Check if files were uploaded and assign paths, otherwise use existing values from profile
  if (req.files && req.files[0] && req.files[0].path) {
    profile_pic = req.files[0].path;
  } else {
    profile_pic = profile.profile_pic;
  }

  if (req.files && req.files[1] && req.files[1].path) {
    bg_pic = req.files[1].path;
  } else {
    bg_pic = profile.bg_pic;
  }

  // Update the profile with new data
  profile.name = name || profile.name;
  profile.position = position || profile.position;
  profile.location = location || profile.location;
  profile.profile_pic = profile_pic;
  profile.bg_pic = bg_pic;
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
  const email = req.session.email;
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

export { viewProfile, updateProfile, updateSummary };
