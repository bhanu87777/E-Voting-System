const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/predict
router.get("/predict", async (req, res) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/predict");

    // Limit results to first 100 rows
    const limitedResults = response.data.predictions.slice(0, 100);

    res.json({ predictions: limitedResults });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;
