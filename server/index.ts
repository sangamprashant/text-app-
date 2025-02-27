import express from "express";
import { connectDb, corsConfig } from "./config";

const app = express();
app.use(corsConfig);
app.use(express.json());
connectDb();

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/courses", require("./routes/admin.course"));
app.use("/api/v1/teacher-student", require("./routes/admin.user"));

app.listen(5000, () => console.log("Server running on port 5000"));
