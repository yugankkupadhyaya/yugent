import llm from "../config/llm.js";
import feedbackPrompt from "../prompts/feedbackPrompt.js";





export const feedbackAgent = async (data) => {

    try {
        const prompt = feedbackPrompt(data)

        const response = await llm.invoke(prompt)

        const cleaned = response.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

        return JSON.parse(cleaned)
    } catch (error) {
        console.log("Feedback Agent Parse Error");
    console.log(response.content);

    throw new Error("Failed to generate feedback");
        
    }
}