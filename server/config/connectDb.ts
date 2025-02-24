import mongoose from "mongoose";
import { initializeAdmin } from "../init/initAdmin";

const connectDb = () => {
  // MongoDB Connection
  mongoose
    .connect("mongodb://localhost:27017/quizApp")
    .then(async () => {
      console.log("MongoDB connected");
      await initializeAdmin(); // Ensure admin user exists
    })
    .catch((err) => console.error("MongoDB Connection Error:", err));
};

export default connectDb;
