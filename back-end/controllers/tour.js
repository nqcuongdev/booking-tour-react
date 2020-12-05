const Validator = require("validator");
const fs = require("fs");
const { Tour } = require("../models/tours");

exports.all = async (req, res) => {
  const tours = await Tour.find({});

  return res.status(200).json({
    success: !!tours,
    data: tours,
  });
};
