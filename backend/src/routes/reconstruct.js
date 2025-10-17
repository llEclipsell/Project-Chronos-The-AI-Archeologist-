// import express from "express";
// import { generateReport } from "../services/geminiService.js";
// import { validateReconstructInput } from "../utils/validators.js";

// const router = express.Router();

// // POST /api/reconstruct
// router.post("/", async (req, res) => {
//   try {
//     const { fragment, sources } = req.body;

//     const error = validateReconstructInput(fragment, sources);
//     if (error) return res.status(400).json({ error });

//     const report = await generateReport(fragment, sources);
//     res.json(report);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

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
    });

    // Forward the result to frontend
    res.json({
      reconstruction: response.data.result,
      analysis: "AI Generated using Gemini API",
      confidence: "high",
    });
  } catch (err) {
    console.error("Proxy error:", err.message);
    res.status(500).json({ error: "Failed to fetch from Gemini backend" });
  }
});

export default router;
