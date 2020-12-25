const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  package: mongoose.ObjectId,
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notification", NotificationSchema);
