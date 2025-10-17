import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// GET /api/reports - list reports
router.get("/", async (req, res) => {
  const reports = await Report.find().sort({ createdAt: -1 }).limit(20);
  res.json(reports);
});

// GET /api/reports/:id - get single report
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch {
    res.status(400).json({ error: "Invalid report ID" });
  }
});

// POST /api/reports - create report
router.post("/", async (req, res) => {
  try {
    const { fragment, reconstruction, sources, diff } = req.body;
    const newReport = new Report({ fragment, reconstruction, sources, diff });
    await newReport.save();
    res.status(201).json(newReport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save report" });
  }
});

export default router;
