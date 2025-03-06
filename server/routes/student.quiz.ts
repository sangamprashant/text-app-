import {
    getQuizById,
    studentGetResult,
    submitQuiz,
    viewQuiz,
} from "../controllers/student.quiz";
import { authStudent } from "../middleware";
const router = require("express").Router();

router.get("", authStudent, viewQuiz);
router.get("/:id", authStudent, getQuizById);
router.post("", authStudent, submitQuiz);
router.get("/result/:id", authStudent, studentGetResult);

module.exports = router;
