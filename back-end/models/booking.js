const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  package: [{ type: mongoose.Schema.Types.ObjectId }],
  email: String,
  first_name: String,
  last_name: String,
  full_name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip_code: String,
  country: String,
  notes: String,
  transaction_code: String,
  payment: {
    type: {
      type: String,
      enum: ["paypal", "credit card", "offline"],
    },
    transaction_id: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  checkin: Date,
  checkout: Date,
  option: {
    child: Number,
    adult: Number,
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
