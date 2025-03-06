import mongoose from "mongoose";
import { initializeAdmin } from "../init/initAdmin";

const connectDb = () => {
  // MongoDB Connection
  mongoose
    .connect("mongodb://localhost:27017/samplae")
    .then(async () => {
      console.log("MongoDB connected");
      // run to create a admin at time of deployment
      await initializeAdmin();
    })
    .catch((err) => console.error("MongoDB Connection Error:", err));
};

export default connectDb;
