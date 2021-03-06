const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");
const mongoosePaginate = require("mongoose-paginate-v2");

const DestinationSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  slug: String,
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    trim: true,
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  lat: Number,
  lng: Number,
  map_zoom: {
    type: Number,
    max: 50,
    default: 5,
  },
  image: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["active", "hide"],
    default: "active",
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
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
DestinationSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Geocode & create location field
DestinationSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
  };
  this.lat = loc[0].latitude;
  this.lng = loc[0].longitude;

  next();
});

DestinationSchema.pre("findOneAndUpdate", async function (next) {
  const loc = await geocoder.geocode(this._update.address);
  this.set({
    location: {
      type: "Point",
      coordinates: [loc[0].longitude, loc[0].latitude],
    },
    lat: loc[0].latitude,
    lng: loc[0].longitude,
  });

  next();
});

DestinationSchema.pre("findOneAndUpdate", function (next) {
  this.set({ slug: slugify(this._update.title, { lower: true }) });
  next();
});

// Add index for location and text for full text search
DestinationSchema.index({ location: "2dsphere" });

DestinationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("destination", DestinationSchema);
