
import express from "express";
import axios from "axios";

const router = express.Router();

// Proxy route to Python Gemini backend
router.post("/", async (req, res) => {
  try {
    const { fragment, sources } = req.body;

    // Validate input
    if (!fragment || typeof fragment !== "string") {
      return res.status(400).json({ error: "Missing or invalid fragment" });
    }

    // Send to Python backend
    const response = await axios.post("http://127.0.0.1:5001/api/reconstruct", {
      text: fragment,
      sources: sources || [],
    }, { timeout: 120000 });

    // Forward the result to frontend
    res.json({
      id: null,
      original: fragment,
      reconstructed: {
        reconstructed_text: response.data.result,
        explanation: "Generated using Gemini 2.0 via Python proxy",
        confidence: 0.9
      },
      sources: sources || [],
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.error("Proxy error:", err.message);
    if (err.response) console.error(err.response.data);
    res.status(500).json({ error: "Failed to fetch from Gemini backend" });
  }
});

export default router;
