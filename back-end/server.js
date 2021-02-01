//read configuration from env
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/database");
const paypalConfig = require("./config/paypal");

// Connect to database
connectDB();

// Load config paypal
paypalConfig();

// Route files
const auth = require("./routes/auth");
const destination = require("./routes/destination");
const user = require("./routes/user");
const category = require("./routes/category");
const attribute = require("./routes/attribute");
const tour = require("./routes/tour");
const paypal = require("./routes/paypal");
const stripe = require("./routes/stripe");
const booking = require("./routes/booking");
const hotel = require("./routes/hotel");
const tag = require("./routes/tag");
const post = require("./routes/post");
const rating = require("./routes/rating");
const notification = require("./routes/notification");
const facility = require("./routes/facility");
const contact = require("./routes/contact");
const subscribe = require("./routes/subscribe");
const room = require("./routes/room");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

// Enable CORS
app.use(cors());

//Router
app.use("/api/v1/", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/destination", destination);
app.use("/api/v1/category", category);
app.use("/api/v1/attribute", attribute);
app.use("/api/v1/tour", tour);
// app.use("/api/v1/paypal", paypal);
app.use("/api/v1/stripe", stripe);
app.use("/api/v1/booking", booking);
app.use("/api/v1/hotel", hotel);
app.use("/api/v1/tag", tag);
app.use("/api/v1/post", post);
app.use("/api/v1/rating", rating);
app.use("/api/v1/notification", notification);
app.use("/api/v1/facility", facility);
app.use("/api/v1/contact", contact);
app.use("/api/v1/subscribe", subscribe);
app.use("/api/v1/room", room);

//Enable Passport
app.use(passport.initialize());

app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).json({
      status: false,
      message: "Something went wrong",
    });
  } else {
    next(err);
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server running in ${process.env.APP_URL}:${process.env.APP_PORT}`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
