const Validator = require("validator");
const fs = require("fs");
const Destination = require("../models/destination");

//Load validate
const destinationValidate = require("../validators/destination/create");
const { Tour } = require("../models/tours");

exports.all = async (req, res) => {
  const destination = await Destination.aggregate([
    {
      $lookup: {
        localField: "_id",
        from: "tours",
        foreignField: "destination",
        as: "tour_count",
      },
    },
    {
      $lookup: {
        localField: "_id",
        from: "hotels",
        foreignField: "destination",
        as: "hotel_count",
      },
    },
  ]);

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

  const { title, description, address, isFeatured } = req.body;

  const checkExistedDestination = await Destination.findOne({ title: title });
  if (!checkExistedDestination) {
    let image = [];
    req.files.forEach((element) => {
      image.push(element.path);
    });
    let arrAddress = address.split(",");
    let country = arrAddress[arrAddress.length - 1];
    const destination = await Destination.create({
      title,
      description,
      address,
      image,
      isFeatured,
      country,
    });

    // Create notification
    await Notification.create({
      type: "destination",
      content: `${req.user.full_name} has create destination: ${title}.`,
      package: destination._id,
    });

    return res.status(200).json({
      success: !!destination,
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

  const { title, description, address, status, image } = req.body;

  const checkExistedDestination = await Destination.findOne({ _id });

  if (!checkExistedDestination) {
    if (req.files && req.files !== "") {
      req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.log(err);
          return;
        });
      });
    }

    return res.status(404).json({
      success: false,
      message: "Can not found this destination",
    });
  }

  let imageInSV = checkExistedDestination.image;

  if (image && image.length > 1) {
    // Image request is array
    imageInSV.forEach((img, index) => {
      let imgInReq = image.includes(img);
      if (!imgInReq) {
        imageInSV.splice(index, 1);
        fs.unlink(img, (err) => {
          if (err) console.log(err);
          return;
        });
      }
    });
  } else {
    // Image request is string
    imageInSV.forEach((img, index) => {
      if (image !== img) {
        imageInSV.splice(index, 1);
        fs.unlink(img, (err) => {
          if (err) console.log(err);
          return;
        });
      }
    });
  }

  if (req.files && req.files !== "") {
    req.files.forEach((file) => {
      imageInSV.push(file.path);
    });
  }

  let arrAddress = address.split(",");
  let country = arrAddress[arrAddress.length - 1];
  let data = {
    title: title,
    description: description,
    address: address,
    country: country,
    image: imageInSV,
    status: status,
    updated_at: Date.now(),
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
