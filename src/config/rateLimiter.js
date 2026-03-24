const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // 10 requests per minute
    message: {
        error: "Too many requests! Please try again after 1 minute."
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = limiter;