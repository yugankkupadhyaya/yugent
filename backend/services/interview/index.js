import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import interviewRouter from "./routes/interview.route.js"
dotenv.config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8003

app.get("/" , (req,res)=>{
    res.send("Hello from Interview-service")
})


app.use("/",interviewRouter)


app.listen(PORT , ()=>{
    console.log(`Interview-service Started on ${PORT}`)
    connectDB()
})