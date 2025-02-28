import { Response } from "express";
import { RequestWithUser } from "../types/request";
import { handleError, handleErrorMsg, successResponse } from "../utility";
import { Quiz } from "../models/Quiz";

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const addQuiz = async (req: RequestWithUser, res: Response) => {
  try {
    const { title, questions, time } = req.body;
    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }
    const { course } = req.user;

    // Validate inputs
    if (
      !title ||
      !Array.isArray(questions) ||
      questions.length === 0 ||
      !time ||
      isNaN(Number(time)) ||
      Number(time) <= 0
    ) {
      return handleErrorMsg(
        res,
        400,
        "Title, valid questions array, and positive time are required."
      );
    }

    // Process questions
    const processedQuestions = questions.map((q) => {
      if (
        !q.question.trim() ||
        !Array.isArray(q.options) ||
        q.options.length < 4 ||
        !q.correctAnswer.trim()
      ) {
        throw new Error(
          "Each question must have a question text, four options, and a correct answer."
        );
      }

      const trimmedOptions = q.options.map((opt: string) => opt.trim());

      if (new Set(trimmedOptions).size !== trimmedOptions.length) {
        throw new Error("Some question options are repeated.");
      }

      const shuffledOptions = shuffleArray([...trimmedOptions]);

      return {
        question: q.question.trim(),
        options: shuffledOptions,
        correctAnswer: q.correctAnswer,
      };
    });

    const newQuiz = new Quiz({
      title,
      time,
      questions: processedQuestions,
      courseId: course,
    });
    await newQuiz.save();

    successResponse(res, newQuiz, "Quiz created successfully!");
  } catch (error) {
    handleError(res, error);
  }
};

export const viewQuiz = async (req: RequestWithUser, res: Response) => {
  try {
    if (!req.user) {
      return handleErrorMsg(res, 401, "Unauthorized: No user found");
    }
    const { course } = req.user;

    const quizzes = await Quiz.find({ courseId: course }).select("-questions");

    successResponse(res, quizzes, "Quizzes fetched successfully!");
  } catch (error) {
    handleError(res, error);
  }
};

