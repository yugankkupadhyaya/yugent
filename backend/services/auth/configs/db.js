import mongoose from "mongoose"
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB Connected');
  } catch (err) {
    console.error('FATAL: Could not connect to MongoDB. Check MONGODB_URL, credentials, and Atlas IP whitelist.');
    console.error(err?.message || err);
    throw err;
  }
};