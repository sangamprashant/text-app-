import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  title: string;
  time: number;
  courseId: mongoose.Schema.Types.ObjectId;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

const QuizSchema: Schema<IQuiz> = new Schema(
  {
    title: { type: String, required: true },
    time: { type: Number, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
