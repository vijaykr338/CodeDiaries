import { Router } from "express";
import { updateProfile, updateSummary, viewProfile } from "../controllers/profile.controller.js";
import { uploadFile } from "../middlewares/multer.middleware.js";

const profileRouter = Router();

profileRouter.route("/viewprofile/:id").get(viewProfile);
profileRouter.route("/update").post(uploadFile.array('imageUrl'), updateProfile);
profileRouter.route("/update_summary").post(updateSummary);

export default profileRouter;