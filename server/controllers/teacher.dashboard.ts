import { Quiz } from "../models/Quiz";
import { StudentQuiz } from "../models/StudentQuiz";
import { User } from "../models/User";

export const getCounts = async () => {
  try {
    const studentCount = await User.countDocuments({
      role: "student",
      course: "<courseId>",
    });
    const quizCount = await Quiz.countDocuments({ courseId: "<courseId>" });
    const studentQuizCount = await StudentQuiz.countDocuments({
      courseId: "<courxeId>",
    });

    const resBody = {
      quizCount,
      studentQuizCount,
      studentCount,
    };

    console.log(resBody);
  } catch (error) {
    console.log(error);
  }
};
