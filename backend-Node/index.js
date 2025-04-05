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

// ✅ CORS Config (Frontend hosted on Vercel)
app.use(cors({
  origin: "https://dev-clash-hackathon.vercel.app", // Replace with your frontend URL
  credentials: true, // Needed for cookies / headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// ✅ User routes
app.use("/api/users", userRoutes);

// ✅ Job Recommendations Route
app.get("/job-recommendations", async (req, res) => {
  const url = "https://jsearch.p.rapidapi.com/search";
  const queryParams = {
    query: "developer in India",
    page: "1",
    num_pages: "2",
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

    const jobs = response.data.data || [];
    res.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ error: "Failed to fetch job recommendations" });
  }
});

// ✅ Server Start
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
