const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const TourSchema = new mongoose.Schema({
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
  lat: String,
  lng: String,
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
  attribute: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "attribute",
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  itinerary: [
    {
      title: String,
      description: String,
      address: String,
      image: String,
    },
  ],
  price: {
    child: {
      type: Number,
      required: true,
    },
    adult: {
      type: Number,
      required: true,
    },
  },
  sale_price: {
    child: Number,
    adult: Number,
  },
  duration: {
    type: String,
    required: true,
  },
  min_people: Number,
  max_people: Number,
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "destination",
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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

const TourAvailabilitySchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tour",
  },
  start_date: Date,
  end_date: Date,
  available: {
    type: Number,
    required: true,
    default: 1,
  },
  remainder: {
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
TourSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Geocode & create location field
TourSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
  };
  this.lat = loc[0].latitude;
  this.lng = loc[0].longitude;

  next();
});

TourSchema.pre("findOneAndUpdate", async function (next) {
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

TourSchema.pre("findOneAndUpdate", function (next) {
  this.set({ slug: slugify(this._update.title, { lower: true }) });
  next();
});

// Add index for location and text for full text search
TourSchema.index({ location: "2dsphere" });

const Tour = mongoose.model("tour", TourSchema);
const TourAvailability = mongoose.model(
  "TourAvailability",
  TourAvailabilitySchema
);

module.exports = { Tour, TourAvailability };
