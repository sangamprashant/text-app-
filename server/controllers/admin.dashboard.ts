import { Response } from "express";
import { Quiz } from "../models/Quiz";
import { StudentQuiz } from "../models/StudentQuiz";
import { User } from "../models/User";
import { RequestWithUser } from "../types/request";
import { handleError, handleErrorMsg, successResponse } from "../utility";

export const getCounts = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }

    const [
      teacherCount,
      studentCount,
      quizCount,
      studentQuizCount,
    ] = await Promise.all([
      User.countDocuments({ role: "teacher" }),
      User.countDocuments({ role: "student" }),
      Quiz.countDocuments(),
      StudentQuiz.countDocuments(),
    ]);

    return successResponse(
      res,
      {
        teacherCount,
        studentCount,
        quizCount,
        studentQuizCount,
      },
      "Counts retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching counts:", error);
    handleError(res, error);
  }
};
