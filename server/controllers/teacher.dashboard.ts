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

    const { course } = req.user;

    const [studentCount, quizCount, studentQuizCount] = await Promise.all([
      User.countDocuments({ role: "student", course }),
      Quiz.countDocuments({ courseId: course }),
      StudentQuiz.countDocuments({ courseId: course }),
    ]);

    return successResponse(
      res,
      { quizCount, studentQuizCount, studentCount },
      "Counts retrieved successfully"
    );
  } catch (error) {
    console.error("Error fetching counts:", error);
    handleError(res, error);
  }
};
