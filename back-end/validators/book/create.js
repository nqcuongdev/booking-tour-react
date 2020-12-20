const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validateDestinationInput(data) {
  let errors = {};

  data.email = !isEmpty(data.title) ? data.title : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zip_code = !isEmpty(data.zip_code) ? data.zip_code : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First name field is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last name field is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (!Validator.isLength(data.address, { min: 2, max: 500 })) {
    errors.address = "Address must be between 2 and 500 characters";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }

  if (Validator.isEmpty(data.zip_code)) {
    errors.zip_code = "Zip code field is required";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
