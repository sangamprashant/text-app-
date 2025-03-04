import mongoose, { Schema, Document } from "mongoose";

export interface IStudentQuiz extends Document {
  studentId: mongoose.Schema.Types.ObjectId;
  quizId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  startedAt: Date;
  completedAt: Date | null;
  answers: { questionId: mongoose.Schema.Types.ObjectId; selectedOption: string; isCorrect: boolean }[];
  totalQuestions: number;
  correctAnswers: number;
}

const StudentQuizSchema: Schema<IStudentQuiz> = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true }, 
    startedAt: { type: Date, required: true, default: Date.now },
    completedAt: { type: Date, default: null },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, required: true, ref: "Quiz.questions" },
        selectedOption: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }, 
      },
    ],

    totalQuestions: { type: Number, required: true }, 
    correctAnswers: { type: Number, default: 0 }, 
  },
  { timestamps: true }
);

export const StudentQuiz = mongoose.model<IStudentQuiz>("StudentQuiz", StudentQuizSchema);
