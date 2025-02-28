import { addQuiz, viewQuiz } from "../controllers/teacher.quiz";
import { authTeacher } from "../middleware";
const router = require("express").Router();

router.post("", authTeacher, addQuiz);
router.get("", authTeacher, viewQuiz);

module.exports = router;
