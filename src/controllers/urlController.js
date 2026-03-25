const shortid = require("shortid");
const Url = require("../models/Url");
const validator= require("validator");
const { client } = require("../config/redis");
// @POST /api/shorten
const shortenUrl = async (req, res) => {
    const { originalUrl,customAlias } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: "URL is required" });
    }

     // Validation check karo
    if (!validator.isURL(originalUrl)) {
        return res.status(400).json({ error: "Invalid URL! Please enter a valid URL." });
    }

    // Custom alias validation - sirf letters, numbers, hyphens allowed
    if (customAlias && !/^[a-zA-Z0-9-_]+$/.test(customAlias)) {
        return res.status(400).json({ error: "Custom alias can only contain letters, numbers, hyphens and underscores!" });
    }

    try {

         if (customAlias) {
            
            const existing = await Url.findOne({ shortCode: customAlias });
            if (existing) {
                return res.status(400).json({ error: "Custom alias already taken!" });
            }

            
            const url = new Url({ originalUrl, shortCode: customAlias });
            await url.save();
            return res.status(201).json(url);
        }
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

         const cachedUrl = await client.get(shortCode);
        if (cachedUrl) {
            console.log("Cache hit! ⚡");
            return res.redirect(cachedUrl);
        }
        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({ error: "URL not found" });
        }

        // Manual check - expire ho gayi hai kya
        if (url.expireAt < new Date()) {
            await Url.deleteOne({ shortCode });
            return res.status(410).json({ error: "URL has expired!" });
        }

         await client.setEx(shortCode, 3600, url.originalUrl);
        console.log("Cache miss! Saved to Redis 💾");

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