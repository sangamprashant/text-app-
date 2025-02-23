import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  title: string;
  teacherId: mongoose.Schema.Types.ObjectId;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

const QuizSchema: Schema<IQuiz> = new Schema(
  {
    title: { type: String, required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
