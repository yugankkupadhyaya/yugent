import express from "express"
import { getAllInterviews, getInterview, startInterview, submitAnswer } from "../controllers/interview.controller.js"

const interviewRouter = express.Router()

interviewRouter.post("/start",startInterview)

interviewRouter.post("/answer",submitAnswer)

interviewRouter.get("/all",getAllInterviews)

interviewRouter.get("/:id",getInterview)


export default interviewRouter