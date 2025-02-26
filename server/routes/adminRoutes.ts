import { getUserProfile, loginUser } from "../controllers/authController";
import { authMiddleware } from "../middleware";
const router = require("express").Router();

router.post("/login/:type", loginUser);
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;
