import {
  adminCreateCourse,
  deleteCourse,
  getAllCourses,
} from "../controllers/admin.course";
import { authAdmin } from "../middleware";
const router = require("express").Router();

router.get("", authAdmin, getAllCourses);
router.post("", authAdmin, adminCreateCourse);
router.delete("/:id", authAdmin, deleteCourse);

module.exports = router;
