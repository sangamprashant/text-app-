import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
}

const CourseSchema: Schema<ICourse> = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
