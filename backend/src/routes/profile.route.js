import { Router } from "express";

import { updateProfile, updateSummary, uploadProfile,uploadBg, viewProfile, getPostsByEmail } from "../controllers/profile.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const profileRouter = Router();

profileRouter.route("/viewprofile/:email").get(viewProfile);
profileRouter.route("/upload/profile").post(upload.single('profile_pic'),  uploadProfile);
profileRouter.route("/upload/bg").post(upload.single('bg_pic'),  uploadBg);
profileRouter.route("/update").post(updateProfile);
profileRouter.route("/update_summary").post(updateSummary);

profileRouter.route("/getUsersPosts/:email").get(getPostsByEmail);


export default profileRouter;