const mongoose = require("mongoose");
const slugify = require("slugify");

const CategorySchema = new mongoose.Schema({
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
  type: {
    type: String,
    enum: ["destination", "hotel", "tour", "post"],
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

// Create slug from the name
CategorySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

module.exports = mongoose.model("category", CategorySchema);
