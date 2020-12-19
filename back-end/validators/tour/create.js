const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateTourInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = "Title must be between 2 and 100 characters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 2 })) {
    errors.description = "Description must be least 2 characters";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (!Validator.isLength(data.address, { min: 2, max: 500 })) {
    errors.address = "Address must be between 2 and 500 characters";
  }

  if (!Validator.isMongoId(data.category)) {
    errors.category = "Category invalid";
  }

  if (!Validator.isMongoId(data.destination)) {
    errors.destination = "Destination invalid";
  }

  if (!Validator.isLength(data.duration, { min: 2, max: 100 })) {
    errors.duration = "Address must be between 2 and 100 characters";
  }

  if (!Validator.isLength(data.price, { min: 2, max: 100 })) {
    errors.price = "Price must be between 2 and 100 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
