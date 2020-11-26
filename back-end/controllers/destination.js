const Validator = require("validator");
const fs = require("fs");
const Destination = require("../models/destination");

//Load validate
const destinationValidate = require("../validators/destination/create");

exports.all = async (req, res) => {
  const PER_PAGE = 10;
  let page = Math.max(0, req.body.pageOffset);

  const destination = await Destination.find({})
    .limit(PER_PAGE)
    .skip(PER_PAGE * page);

  return res.status(200).json({
    success: !!destination,
    data: destination,
  });
};

exports.show = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const destination = await Destination.findOne({ _id });

  if (!destination) {
    return res.status(404).json({
      success: !!destination,
      message: "Can not found this destination",
    });
  }

  return res.status(200).json({
    success: !!destination,
    data: destination,
  });
};

exports.create = async (req, res) => {
  const { errors, isValid } = destinationValidate(req.body);

  //Check value request
  if (!isValid) {
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

  const { title, description, address, isTop, isPopular } = req.body;

  const checkExistedDestination = await Destination.findOne({ title: title });
  if (!checkExistedDestination) {
    let image = [];
    req.files.forEach((element) => {
      image.push(element.path);
    });
    const destination = await Destination.create({
      title,
      description,
      address,
      image,
      isTop,
      isPopular,
    });

    return res.status(200).json({
      success: !!checkExistedDestination,
      message: "Create destination success",
      data: destination,
    });
  }

  req.files.forEach((element) => {
    //Remove upload file
    fs.unlink(element.path, (err) => {
      if (err) console.log(err);
      return;
    });
  });

  return res.status(401).json({
    success: false,
    message: "This destination has existed",
  });
};

exports.update = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const { errors, isValid } = destinationValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, description, address, status } = req.body;

  const checkExistedDestination = await Destination.findOne({ _id });

  if (!checkExistedDestination) {
    //Remove upload file
    if (req.file && req.file !== "") {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log(err);
        return;
      });
    }

    return res.status(404).json({
      success: false,
      message: "Can not found this destination",
    });
  }

  let image = checkExistedDestination.image;
  if (req.file && req.file !== "") {
    //Remove upload file
    fs.unlink(image, (err) => {
      image = req.file.path;

      if (err) console.log(err);
      return;
    });
  }

  let data = {
    title: title,
    description: description,
    address: address,
    image: image,
    status: status,
  };

  const destination = await Destination.findByIdAndUpdate({ _id }, data, {
    new: true,
  });

  return res.status(200).json({
    success: !!destination,
    message: "Update destination success",
    data: destination,
  });
};
