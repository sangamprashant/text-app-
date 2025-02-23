import mongoose, { Schema, Document } from "mongoose";

export interface IStudentQuiz extends Document {
  studentId: mongoose.Schema.Types.ObjectId;
  quizId: mongoose.Schema.Types.ObjectId;
  startedAt: Date;
  completedAt: Date | null;
  answers: { questionId: string; selectedOption: string }[];
  score: number;
}

const StudentQuizSchema: Schema<IStudentQuiz> = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    startedAt: { type: Date, required: true, default: Date.now },
    completedAt: { type: Date, default: null },
    answers: [
      {
        questionId: { type: String, required: true },
        selectedOption: { type: String, required: true },
      },
    ],
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const StudentQuiz = mongoose.model<IStudentQuiz>(
  "StudentQuiz",
  StudentQuizSchema
);
