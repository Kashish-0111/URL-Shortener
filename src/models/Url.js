const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
     expireAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
});

// TTL Index - expireAt date aane pe automatically delete karo
urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Url", urlSchema);