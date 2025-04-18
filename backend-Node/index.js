import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: [
    "*",
    "https://dev-clash-hackathon.vercel.app",
    "https://dev-clash-hackathon-sgsj.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// User routes
app.use("/api/users", userRoutes);

// Enhanced Job Recommendations Route
app.get("/job-recommendations", async (req, res) => {
  const url = "https://jsearch.p.rapidapi.com/search";
  
  // More flexible query parameters
  const queryParams = {
    query: req.query.query || "developer in India",
    page: req.query.page || "1",
    num_pages: req.query.num_pages || "2",
  };

  const headers = {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  try {
    const response = await axios.get(url, {
      headers,
      params: queryParams,
    });

    console.log("JSearch API response:", response.data); // Debug logging
    
    if (!response.data.data) {
      throw new Error("No data received from JSearch API");
    }

    res.json({ 
      success: true,
      jobs: response.data.data 
    });
  } catch (error) {
    console.error("Full error details:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch job recommendations",
      details: error.message 
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
