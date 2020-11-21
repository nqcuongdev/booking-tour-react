//read configuration from env
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/database");

// Connect to database
connectDB();

// Route files
const auth = require("./routes/auth");
const destination = require("./routes/destination");

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
app.use("/api/v1/destination/", destination);

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