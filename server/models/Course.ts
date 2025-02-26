import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  code: number;
}

const CourseSchema: Schema<ICourse> = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, 
    },
    code: {
      type: Number,
      required: true,
      unique: true,
      min: [1, "Course code must be a positive number"],
    },
  },
  { timestamps: true }
);

// Add indexing for performance
CourseSchema.index({ name: 1 });
CourseSchema.index({ code: 1 });

export const Course = mongoose.model<ICourse>("Course", CourseSchema);
