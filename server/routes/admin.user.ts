import { createUser, getUsersByRole } from "../controllers/admin.user";
import { authAdmin } from "../middleware";
const router = require("express").Router();

router.post("", authAdmin, createUser);
router.get("", authAdmin, getUsersByRole);

module.exports = router;
