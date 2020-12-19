const Validator = require("validator");
const fs = require("fs");
const { Tour } = require("../models/tours");

// Load validate
const tourValidate = require("../validators/tour/create");

exports.all = async (req, res) => {
  const tours = await Tour.find({});

  return res.status(200).json({
    success: !!tours,
    data: tours,
  });
};

exports.create = async (req, res) => {
  const { errors, isValid } = tourValidate(req.body);

  //Check value request
  if (!isValid) {
    req.files.forEach((element) => {
      //Remove upload file
      fs.unlink(element.path, (err) => {
        if (err) console.log(err);
        return;
      });
    });

    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: "Please select file before upload",
    });
  }
  console.log(req.body);
  const {
    title,
    description,
    address,
    isFeatured,
    attribute,
    category,
    itinerary,
    price,
    sale_price,
    duration,
    min_people,
    max_people,
    destination,
  } = req.body;

  console.log(itinerary);
};
