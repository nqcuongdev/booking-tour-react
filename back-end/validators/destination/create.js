const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateDestinationInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = "Title must be between 2 and 100 characters";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 2, max: 500 })) {
    errors.description = "Description must be between 2 and 500 characters";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (!Validator.isLength(data.address, { min: 2, max: 200 })) {
    errors.address = "Address must be between 2 and 200 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
