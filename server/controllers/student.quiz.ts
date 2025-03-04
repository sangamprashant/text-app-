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

    if (!req.user.course) {
      return handleErrorMsg(res, 400, "User is not assigned to any course");
    }

    const quizzes = await Quiz.find({ courseId: req.user.course })
      .select("-questions")
      .sort("-createdAt")
      .lean();

    successResponse(res, quizzes, "Quizzes fetched successfully!");
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
  successResponse(res, studentQuiz, "Quiz submitted successfully");
};

const getStudentQuizResult = async (req: RequestWithUser, res: Response) => {
  try {
    const { studentId, quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Fetch the student's submitted quiz attempt
    const studentQuiz = await StudentQuiz.findOne({ studentId, quizId });
    if (!studentQuiz)
      return res
        .status(404)
        .json({ message: "Student has not attempted this quiz" });

    // Map quiz questions with student's answers
    const questionResults = quiz.questions.map((question) => {
      const studentAnswer = studentQuiz.answers.find(
        (ans) => ans.questionId.toString() === question._id.toString()
      );

      return {
        questionId: question._id,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        selectedOption: studentAnswer?.selectedOption || null,
        isCorrect: studentAnswer ? studentAnswer.isCorrect : false,
        attempted: !!studentAnswer, // True if the student answered this question
      };
    });

    // Calculate attempted questions and correct answers
    const attemptedCount = questionResults.filter((q) => q.attempted).length;
    const correctCount = questionResults.filter((q) => q.isCorrect).length;

    res.json({
      quizTitle: quiz.title,
      totalQuestions: quiz.questions.length,
      attemptedQuestions: attemptedCount,
      correctAnswers: correctCount,
      questionResults,
    });
  } catch (error) {
    handleError(res, error);
  }
};
