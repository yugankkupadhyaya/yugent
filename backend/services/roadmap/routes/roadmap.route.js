import express from "express"
import { generateRoadmap, getAllRoadmap, getRoadmapbyId } from "../controllers/roadmap.controller.js"

const roadmapRouter = express.Router()

roadmapRouter.get("/health", (_, res) => res.sendStatus(200))

roadmapRouter.post("/generate" , generateRoadmap)

roadmapRouter.get("/all" ,getAllRoadmap )

roadmapRouter.get("/:id",getRoadmapbyId)

export default roadmapRouter