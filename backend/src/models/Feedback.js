const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  sentiment: {
    type: String,
    enum: ["POSITIVE", "NEGATIVE", "NEUTRAL"],
    required: true,
  },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
