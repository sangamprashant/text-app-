import { Response } from "express";
import { RequestWithUser } from "../types/request";
import { User } from "../models/User";
import { Quiz } from "../models/Quiz";
import { StudentQuiz } from "../models/StudentQuiz";

export const getCounts = async (req: RequestWithUser, res: Response) => {
  try {
    const teacherCount = await User.countDocuments({ role: "teacher" });
    const studentCount = await User.countDocuments({ role: "student" });
    const quizCount = await Quiz.countDocuments();
    const studentQuizCount = await StudentQuiz.countDocuments();

    const resBody = {
      teacherCount,
      studentCount,
      quizCount,
      studentQuizCount,
    };

    console.log(resBody);
  } catch (error) {
    console.log(error);
  }
};
