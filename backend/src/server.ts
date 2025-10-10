import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Load environment variables from .env
dotenv.config();

// ✅ Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Port configuration
const PORT = process.env.PORT || 4000;

// 👁 STEP 1: HEALTH CHECK ENDPOINT
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: "Hurley Enterprise Backend is healthy 🚀",
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server live on port ${PORT}`);
});
