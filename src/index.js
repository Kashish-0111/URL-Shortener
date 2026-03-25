require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
const { redirectUrl } = require("./controllers/urlController");
const limiter = require("./config/rateLimiter");
const { connectRedis } = require("./config/redis");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(limiter);

// Connect DB
connectDB();
connectRedis();

// Routes
app.use("/api", urlRoutes);          // /api/shorten, /api/stats/:shortCode
app.get("/:shortCode", redirectUrl); // /ab3Kp → redirect

// Test route
app.get("/", (req, res) => {
    res.json({ message: "URL Shortener API running! 🚀" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

