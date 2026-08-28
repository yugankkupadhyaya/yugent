import express from "express"

import { deleteResume, getResume, uploadResume } from "../controllers/resume.controller.js"
import { upload } from "../middleware/multer.js"

const resumeRouter = express.Router()


resumeRouter.post("/upload",upload.single("resume"),uploadResume)

resumeRouter.get("/get-resume",getResume)
resumeRouter.get("/", getResume)
resumeRouter.delete("/", deleteResume)

export default resumeRouter;
