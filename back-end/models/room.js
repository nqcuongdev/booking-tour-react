const mongoose = require("mongoose");
const slugify = require("slugify");

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  people: {
    type: Number,
    min: 1,
    required: true,
  },
  options: {
    buffer_price: Number,
    bed: String,
  },
  image: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    required: true,
  },
  attribute: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attribute",
    },
  ],
  price: {
    type: Number,
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

// Create slug from the title
RoomSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model("room", RoomSchema);
