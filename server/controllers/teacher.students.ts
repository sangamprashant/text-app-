import { Response } from "express";
import { RequestWithUser } from "../types/request";
import { handleError, handleErrorMsg, successResponse } from "../utility";
import { IUser, User } from "../models/User";
import { StudentQuiz } from "../models/StudentQuiz";
import { Quiz } from "../models/Quiz";

export const getStudents = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }

    const { course } = req.user;

    if (!course) {
      return handleErrorMsg(res, 400, "User is not assigned to any course");
    }

    const students: IUser[] = await User.find({ course, role: "student" })
      .select("-password -role -course")
      .lean();

    return successResponse(res, students, "Students retrieved successfully");
  } catch (error) {
    console.error("Error fetching students:", error);
    return handleError(res, error);
  }
};

export const getStudentsProfile = async (
  req: RequestWithUser,
  res: Response
) => {
  try {
    const { student } = req.query;
    if (!student) {
      return handleErrorMsg(res, 400, "Student ID is required");
    }

    // Fetch student details
    const studentDetails = await User.findById(student)
      .select("-password")
      .populate("course")
      .lean();
    if (!studentDetails) {
      return handleErrorMsg(res, 404, "Student not found");
    }

    // Fetch all quizzes related to the student's course
    const allQuizzes = await Quiz.find({ courseId: studentDetails.course });

    // Fetch attempted quizzes by the student
    const attemptedQuizzes = await StudentQuiz.find({ studentId: student });

    // **Group quizzes into completed and not attempted**
    const completedQuizzes = attemptedQuizzes.map((attempt) => {
      const relatedQuiz = allQuizzes.find(
        (q) => q._id.toString() === attempt.quizId.toString()
      );
      return {
        quizId: attempt.quizId,
        title: relatedQuiz?.title || "Unknown Quiz",
        totalQuestions: attempt.totalQuestions,
        correctAnswers: attempt.correctAnswers,
        percentage: Number(
          ((attempt.correctAnswers / attempt.totalQuestions) * 100).toFixed(2)
        ),
      };
    });

    const attemptedQuizIds = attemptedQuizzes.map((q) => q.quizId.toString());
    const notAttemptedQuizzes = allQuizzes
      .filter((q) => !attemptedQuizIds.includes(q._id.toString()))
      .map((q) => ({
        quizId: q._id,
        title: q.title,
        totalQuestions: q.questions.length,
      }));
    successResponse(res, {
      studentDetails,
      completedQuizzes,
      notAttemptedQuizzes,
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return handleErrorMsg(res, 500, "Internal Server Error");
  }
};
