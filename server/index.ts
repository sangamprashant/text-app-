import express from "express";
import { connectDb, corsConfig } from "./config";

const app = express();
app.use(corsConfig);
app.use(express.json());
connectDb();

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/courses", require("./routes/admin.course"));
app.use("/api/v1/teacher-student", require("./routes/admin.user"));
// -----------------------------teacher-----------------------------
app.use("/api/v1/teacher", require("./routes/teacher.student"));
app.use("/api/v1/teacher.quiz", require("./routes/teacher.quiz"));
// -----------------------------student-----------------------------
app.use("/api/v1/student.quiz", require("./routes/student.quiz"));
// -----------------------------------------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));
