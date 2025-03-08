import {
  getStudents,
  getStudentsProfile,
} from "../controllers/teacher.students";
import { authTeacher } from "../middleware";
const router = require("express").Router();

router.get("/my-students", authTeacher, getStudents);
router.get("/student-profile", getStudentsProfile);

module.exports = router;
