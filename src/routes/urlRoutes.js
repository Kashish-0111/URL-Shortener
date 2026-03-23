const express = require("express");
const router = express.Router();
const { shortenUrl, getStats } = require("../controllers/urlController");

// POST - URL short karo
router.post("/shorten", shortenUrl);

// GET - Stats dekho
router.get("/stats/:shortCode", getStats);

module.exports = router;