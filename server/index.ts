import express from "express";
import { connectDb, corsConfig } from "./config";
import _env from "./config/env";

const app = express();
app.use(corsConfig);
app.use(express.json());
connectDb();

app.use("/api/v1/auth", require("./routes/authRoutes"));
// ----------------------------- admin -----------------------------
app.use("/api/v1/courses", require("./routes/admin.course"));
app.use("/api/v1/teacher-student", require("./routes/admin.user"));
app.use("/api/v1/admin.dashboard", require("./routes/admin.dashboard"));
// -----------------------------teacher-----------------------------
app.use("/api/v1/teacher", require("./routes/teacher.student"));
app.use("/api/v1/teacher.quiz", require("./routes/teacher.quiz"));
app.use("/api/v1/teacher.dashboard", require("./routes/teacher.dashboard"));
// -----------------------------student-----------------------------
app.use("/api/v1/student.quiz", require("./routes/student.quiz"));
// -----------------------------------------------------------------
app.listen(_env.PORT, () => console.log(`Server running on port ${_env.PORT}`));
