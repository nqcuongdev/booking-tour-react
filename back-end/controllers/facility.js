const Facility = require("../models/facility");
const Notification = require("../models/notification");
const Validator = require("validator");

//Load validate
const facilityValidate = require("../validators/facility/facility");

exports.getAll = async (req, res) => {
  let facilities = await Facility.find({});

  return res.status(200).json({
    success: !!facilities,
    data: facilities,
  });
};

exports.create = async (req, res) => {
  const { errors, isValid } = facilityValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, facility_type } = req.body;

  let checkExistedTitle = await Facility.findOne({ title });

  if (!checkExistedTitle) {
    const facility = await Facility.create({
      title,
      facility_type,
    });

    // Create notification
    await Notification.create({
      type: "facility",
      content: `${req.user.full_name} has created new facility: ${title}`,
      package: facility._id,
    });

    return res.status(200).json({
      success: !!facility,
      data: facility,
    });
  }

  return res.status(401).json({
    success: false,
    message: "This facility has existed!",
  });
};

exports.update = async (req, res) => {
  console.log(req.body);
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }
  const { errors, isValid } = facilityValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, facility_type } = req.body;

  let checkExistedFacility = await Facility.findOne({ _id });

  if (!checkExistedFacility) {
    return res.status(404).json({
      success: false,
      message: "Can not found this facility",
    });
  }

  let data = {
    title: title,
    facility_type: facility_type,
    updated_at: Date.now(),
  };

  const facility = await Facility.findByIdAndUpdate({ _id }, data, {
    new: true,
  });

  // Create notification
  await Notification.create({
    type: "facility",
    content: `${req.user.full_name} has updated facility ${checkExistedFacility.title} to ${title}.`,
    package: facility._id,
  });

  return res.status(200).json({
    success: !!facility,
    message: "Update facility success",
    data: facility,
  });
};
