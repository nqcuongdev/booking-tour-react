const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");
const mongoosePaginate = require("mongoose-paginate-v2");

const HotelSchema = new mongoose.Schema({
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
  attributes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
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
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "destination",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  facility: [
    {
      type_fac: String,
      facility_id: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "facility",
        },
      ],
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["active", "hide"],
    default: "active",
  },
  star: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    require: true,
    default: 1,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  updated_by: {
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

// Create slug from the title
HotelSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// Geocode & create location field
HotelSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
  };
  this.lat = loc[0].latitude;
  this.lng = loc[0].longitude;

  next();
});

HotelSchema.pre("findByIdAndUpdate", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
  };
  this.lat = loc[0].latitude;
  this.lng = loc[0].longitude;

  next();
});

// Add index for location and text for full text search
HotelSchema.index({ location: "2dsphere" });

HotelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("hotel", HotelSchema);
