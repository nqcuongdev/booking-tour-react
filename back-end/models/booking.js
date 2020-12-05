const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  email: String,
  last_name: String,
  full_name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip_code: String,
  country: String,
  notes: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    required: true,
    enum: ["success", "fail", "process", "cancel"],
    default: "process",
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

module.exports = mongoose.model("booking", BookingSchema);
