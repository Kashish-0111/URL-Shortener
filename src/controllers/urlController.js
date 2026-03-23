const shortid = require("shortid");
const Url = require("../models/Url");

// @POST /api/shorten
const shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Check karo already exist karta hai kya
        let url = await Url.findOne({ originalUrl });
        if (url) {
            return res.status(200).json(url);
        }

        // Naya short code banao
        const shortCode = shortid.generate();

        // Save karo DB mein
        url = new Url({ originalUrl, shortCode });
        await url.save();

        res.status(201).json(url);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @GET /:shortCode
const redirectUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Click count badhao
        url.clicks++;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @GET /api/stats/:shortCode
const getStats = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        res.status(200).json(url);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { shortenUrl, redirectUrl, getStats };