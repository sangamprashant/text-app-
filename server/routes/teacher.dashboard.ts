import { getCounts } from "../controllers/teacher.dashboard";
import { authTeacher } from "../middleware";
const router = require("express").Router();

router.get("", authTeacher, getCounts);

module.exports = router;
