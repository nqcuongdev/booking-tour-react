const mongoose = require("mongoose");
const slugify = require("slugify");

const FacilitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  facility_type: {
    type: String,
    enum: [
      "Wellness Facilities",
      "Food & Drink",
      "Cleaning services",
      "Popular Facilities",
    ],
    require: true,
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
FacilitySchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

module.exports = mongoose.model("hotel", FacilitySchema);
