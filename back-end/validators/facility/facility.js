const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateFacilityInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.facility_type = !isEmpty(data.facility_type) ? data.facility_type : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(data.title, { min: 2, max: 100 })) {
    errors.title = "Title must be between 2 and 100 characters";
  }

  if (Validator.isEmpty(data.facility_type)) {
    errors.facility_type = "Type is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
