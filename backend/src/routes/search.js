import express from "express";
import { performSearch } from "../services/searchService.js";

const router = express.Router();

// GET /api/search?q=topic
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing search query" });

    const results = await performSearch(q);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

export default router;
