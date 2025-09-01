const express = require("express");
const { spawn } = require("child_process");
const Feedback = require("../models/Feedback");

const router = express.Router();

// POST /api/feedback → Analyze sentiment + save
router.post("/", async (req, res) => {
  const { feedback } = req.body;
  if (!feedback) return res.status(400).json({ error: "Feedback required" });

  try {
    const py = spawn("python3", ["ml-service/sentiment_service.py", feedback]);

    let result = "";
    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.on("close", async () => {
      try {
        const sentiment = JSON.parse(result);

        // Save to MongoDB
        const fb = new Feedback({
          feedback,
          sentiment: sentiment.label,
          score: sentiment.score,
        });
        await fb.save();

        res.json({ sentiment });
      } catch (err) {
        console.error("Error parsing sentiment:", err);
        res.status(500).json({ error: "Error analyzing feedback" });
      }
    });
  } catch (err) {
    console.error("Error in feedback route:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/feedback/stats → Count positive/negative/neutral
router.get("/stats", async (req, res) => {
  try {
    const positive = await Feedback.countDocuments({ sentiment: "POSITIVE" });
    const negative = await Feedback.countDocuments({ sentiment: "NEGATIVE" });
    const neutral = await Feedback.countDocuments({ sentiment: "NEUTRAL" });

    res.json({ positive, negative, neutral });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Error fetching stats" });
  }
});

module.exports = router;
