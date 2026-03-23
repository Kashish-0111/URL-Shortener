require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.json({ message: "URL Shortener API running! 🚀" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});