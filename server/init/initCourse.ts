import mongoose from "mongoose";
import { Course } from "../models/Course";

export const initializeCourse = async (): Promise<mongoose.Types.ObjectId> => {
  try {
    let course = await Course.findOne({ code: "1001" });

    if (!course) {
      course = new Course({
        name: "Sample Course",
        code: "1001",
      });
      await course.save();
      console.log("Course created..");
    } else {
      console.log("Course already exists..");
    }

    return course._id as mongoose.Types.ObjectId; // Explicitly assert type
  } catch (error) {
    console.error("Error initializing course:", error);
    throw error;
  }
};
