import { Response } from "express";
import { RequestWithUser } from "../types/request";
import { handleError, handleErrorMsg, successResponse } from "../utility";
import { Quiz } from "../models/Quiz";
import { StudentQuiz } from "../models/StudentQuiz";

export const viewQuiz = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }

    const { _id: studentId, course } = req.user;

    if (!course) {
      return handleErrorMsg(res, 400, "User is not assigned to any course");
    }

    // Fetch attempted quizzes
    const attemptedQuizzes = await StudentQuiz.find({ studentId })
      .select("quizId")
      .lean();
    const attemptedQuizIds = new Set(
      attemptedQuizzes.map((q) => q.quizId.toString())
    );

    // Fetch all quizzes for the course
    const quizzes = await Quiz.find({ courseId: course })
      .select("-questions")
      .sort("-createdAt")
      .lean();

    // Map quizzes and mark completion status
    const data = quizzes.map((q) => ({
      ...q,
      completed: attemptedQuizIds.has(q._id.toString()),
    }));

    successResponse(res, data, "Quizzes fetched successfully!");
  } catch (error) {
    return handleError(res, error);
  }
};

export const getQuizById = async (req: RequestWithUser, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }

    if (!req.user.course) {
      return handleErrorMsg(res, 400, "User is not assigned to any course");
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return handleErrorMsg(res, 404, "Quiz not found");
    }

    if (!quiz.courseId) {
      return handleErrorMsg(res, 400, "Quiz does not belong to any course");
    }

    if (req.user.course.toString() !== quiz.courseId.toString()) {
      return handleErrorMsg(
        res,
        403,
        "You are not authorized to access this quiz"
      );
    }

    // Populate questions if needed
    const populatedQuiz = await Quiz.findById(id).lean();

    successResponse(res, populatedQuiz, "Quiz fetched successfully!");
  } catch (error) {
    console.log(error);
    return handleError(res, error);
  }
};

export const submitQuiz = async (req: RequestWithUser, res: Response) => {
  const { quizId, answers } = req.body;
  if (!req.user) {
    return handleErrorMsg(res, 401, "Unauthorized: No user found");
  }
  const { _id: studentId } = req.user;

  const quiz = await Quiz.findById(quizId);

  if (!quiz) return handleErrorMsg(res, 404, "Quiz not found");

  let correctAnswers = 0;
  const studentAnswers = answers.map(
    (ans: { questionId: string; selectedOption: string }) => {
      const question = quiz.questions.find(
        (q) => q._id.toString() === ans.questionId
      );
      const isCorrect = question?.correctAnswer === ans.selectedOption;
      if (isCorrect) correctAnswers++;

      return {
        questionId: ans.questionId,
        selectedOption: ans.selectedOption,
        isCorrect,
      };
    }
  );

  const totalQuestions = quiz.questions.length;

  const studentQuiz = new StudentQuiz({
    studentId,
    quizId,
    quizTitle: quiz.title,
    courseId: quiz.courseId,
    answers: studentAnswers,
    totalQuestions,
    correctAnswers,
  });

  await studentQuiz.save();
  successResponse(res, quizId, "Quiz submitted successfully");
};

export const studentGetResult = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }
    const { _id: studentId } = req.user;
    const { id } = req.params;

    const result = await StudentQuiz.findOne({ studentId, quizId: id })
      .populate("studentId", "name email")
      .populate("quizId", "title questions")
      .populate("answers", "question options correctAnswer");

    if (!result) return handleErrorMsg(res, 404, "Quiz result not found");

    successResponse(res, result, "Quiz fetched successfully!");
  } catch (error) {
    return handleError(res, error);
  }
};
