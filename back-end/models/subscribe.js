const mongoose = require("mongoose");
const slugify = require("slugify");

const subscribeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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

module.exports = mongoose.model("subscribe", subscribeSchema);
