import { addQuiz } from "../controllers/teacher.quiz";
import { authTeacher } from "../middleware";
const router = require("express").Router();

router.post("", authTeacher, addQuiz);

module.exports = router;
