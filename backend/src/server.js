import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});
app.use("/api/jobs", jobRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Job Tracker API is running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
