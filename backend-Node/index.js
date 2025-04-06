import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import axios from "axios";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
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

// Rate limiting middleware for job route
const jobLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  }
});

// Job Recommendations Route with error handling
app.get("/job-recommendations", jobLimiter, async (req, res) => {
  const url = "https://jsearch.p.rapidapi.com/search";

  const queryParams = {
    query: req.query.query || "developer in India",
    page: req.query.page || "1",
    num_pages: req.query.num_pages || "2",
  };

  const headers = {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  try {
    const response = await axios.get(url, {
      headers,
      params: queryParams,
    });

    if (!response.data.data) {
      throw new Error("No data received from JSearch API");
    }

    res.json({ 
      success: true,
      jobs: response.data.data 
    });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message;

    // Forward Retry-After header if present
    if (error.response?.headers?.['retry-after']) {
      res.set('Retry-After', error.response.headers['retry-after']);
    }

    console.error("Full error details:", {
      message,
      response: error.response?.data,
      status,
      stack: error.stack
    });

    res.status(status).json({ 
      success: false,
      error: "Failed to fetch job recommendations",
      details: message
    });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
