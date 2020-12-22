const Validator = require("validator");
const isEmpty = require("../isEmpty");

module.exports = function validatePaymentBookingInput(data) {
  let errors = {};

  data.booking_id = !isEmpty(data.booking_id) ? data.booking_id : "";
  data.transaction_id = !isEmpty(data.transaction_id)
    ? data.transaction_id
    : "";
  data.package = !isEmpty(data.package) ? data.package : "";

  if (Validator.isEmpty(data.booking_id)) {
    errors.booking_id = "Booking id field is required";
  }

  if (!Validator.isMongoId(data.booking_id)) {
    errors.booking_id = "Booking id is invalid";
  }

  if (Validator.isEmpty(data.transaction_id)) {
    errors.transaction_id = "Transaction id field is required";
  }

  if (!Validator.isLength(data.transaction_id, { min: 2, max: 500 })) {
    errors.transaction_id =
      "Transaction id must be between 2 and 500 characters";
  }

  if (Validator.isEmpty(data.package)) {
    errors.package = "Package id field is required";
  }

  if (!Validator.isMongoId(data.package)) {
    errors.package = "Package id is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
