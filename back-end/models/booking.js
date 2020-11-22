const mongoose = require("mongoose");
const slugify = require("slugify");

const BookingSchema = new mongoose.Schema({});

module.exports = mongoose.model("booking", BookingSchema);
