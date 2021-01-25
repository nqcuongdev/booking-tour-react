const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  name: String,
  email: String,
  website: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1,
  },
  target_id: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    required: true,
    enum: ["active", "hide"],
    default: "active",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("rating", RatingSchema);
