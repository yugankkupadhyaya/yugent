
import { ChatGroq } from "@langchain/groq"
import dotenv from "dotenv"
dotenv.config()

const llm = new ChatGroq({
    model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
    temperature: 0.2,
    maxTokens: 2500,
    maxRetries: 2,
})

export default llm 
