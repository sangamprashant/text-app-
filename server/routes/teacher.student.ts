import { getStudents } from "../controllers/teacher.students";
import { authTeacher } from "../middleware";
const router = require("express").Router();

router.get("/my-students", authTeacher, getStudents);

module.exports = router;
