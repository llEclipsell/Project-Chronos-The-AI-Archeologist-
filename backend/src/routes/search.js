import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * POST /api/search
 * Expects body: { reconstructedText: "..." } (this matches your python/search/api.py)
 * Forwards to python server and returns the python response.
 */
router.post("/", async (req, res) => {
  try {
    // Forward the same body to Python service
    const payload = req.body || {};

    // call python search endpoint
    const pythonResp = await axios.post("http://127.0.0.1:5001/api/search", payload, {
      timeout: 15000,
    });

    // Forward python's JSON response back to the client unchanged
    return res.json(pythonResp.data);
  } catch (err) {
    console.error("Search proxy error:", err.response?.data || err.message);
    const status = err.response?.status || 500;
    return res.status(status).json({ error: "Search failed", details: err.response?.data || err.message });
  }
});

export default router;
