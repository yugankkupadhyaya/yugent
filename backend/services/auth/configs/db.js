import mongoose from "mongoose"
export const connectDb= async()=>{
    try{
   await mongoose.connect(process.env.MONGODB_URL)
  console.log("DB Connected ")
}catch(err){
  console.error("Error connecting to MongoDB:", err)
    }
}