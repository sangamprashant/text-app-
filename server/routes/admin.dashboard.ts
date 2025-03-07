import { getCounts } from "../controllers/admin.dashboard";
import { authAdmin } from "../middleware";
const router = require("express").Router();

router.get("", authAdmin, getCounts);

module.exports = router;
