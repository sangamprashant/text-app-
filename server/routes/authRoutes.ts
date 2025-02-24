import { loginUser } from "../controllers/authController";
const router = require("express").Router();

router.post("/:type", loginUser);

module.exports = router;
