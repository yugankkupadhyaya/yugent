import mongoose from "mongoose";

export const connectDB=async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected DB")
    } catch (error) {
        console.log("MongoDb error",error)
    }
    
}