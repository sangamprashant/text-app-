import { Response } from "express";
import { RequestWithUser } from "../types/request";
import { handleError, handleErrorMsg, successResponse } from "../utility";
import { Quiz } from "../models/Quiz";

// Shuffle array while keeping track of correct answer
const shuffleArray = (array: string[]) => {
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
    if (!title || !Array.isArray(questions) || questions.length === 0 || !time || isNaN(Number(time)) || Number(time) <= 0) {
      return handleErrorMsg(res, 400, "Title, valid questions array, and positive time are required.");
    }

    // Process questions
    const processedQuestions = questions.map((q) => {
      if (!q.question.trim() || !Array.isArray(q.options) || q.options.length < 4 || !q.correctAnswer.trim()) {
        throw new Error("Each question must have a question text, four options, and a correct answer.");
      }

      if (!q.options.every((opt:string)  => typeof opt === "string" && opt.trim().length > 0)) {
        throw new Error("Each option must be a non-empty string.");
      }

      const shuffledOptions = shuffleArray([...q.options]);

      return {
        question: q.question.trim(),
        options: shuffledOptions,
        correctAnswer: q.correctAnswer,
      };
    });

    const newQuiz = new Quiz({ title, time, questions: processedQuestions, courseId:course });
    await newQuiz.save();

    successResponse(res, newQuiz, "Quiz created successfully!");
  } catch (error) {
    handleError(res, error);
  }
};
