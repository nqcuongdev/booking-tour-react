const mongoose = require("mongoose");
const slugify = require("slugify");

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  slug: String,
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

// Create slug from the title
TagSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("tag", TagSchema);
