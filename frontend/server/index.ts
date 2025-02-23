import express from "express";
import connectDb from "./config/connectDb";

const app = express();
app.use(express.json());
connectDb();

app.use("/api/v1/auth/login", require("./routes/authRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
