const Hotel = require("../models/hotel");
const hotelValidate = require("../validators/hotel/create");
const fs = require("fs");
const Validator = require("validator");
const Room = require("../models/room");
const Rating = require("../models/rating");

exports.paginate = async (req, res) => {
  let page = req.query.page;
  let options = {
    sort: { created_at: -1 },
    populate: "attributes",
    limit: 10,
    page: page,
  };
  const hotels = await Hotel.paginate({}, options);
  return res.status(200).json({
    success: !!hotels,
    data: hotels,
  });
};

exports.all = async (req, res) => {
  const hotels = await Hotel.find({}).sort({ created_at: 1 });

  return res.status(200).json({
    success: !!hotels,
    data: hotels,
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

  let hotel = await Hotel.findOne({ _id })
    .populate("destination")
    .populate({
      path: "facility",
      populate: {
        path: "facility_id",
        model: "facility",
      },
    })
    .populate("attributes");

  let rooms = await Room.find({ hotel: _id }).populate("attributes");
  let reviews = await Rating.find({ target_id: _id }).populate("user");

  if (!hotel) {
    return res.status(404).json({
      success: !!tour,
      message: "Can not found this hotel",
    });
  }

  return res.status(200).json({
    success: !!hotel,
    data: hotel,
    rooms: rooms,
    reviews: reviews,
  });
};

exports.create = async (req, res) => {
  const { errors, isValid } = hotelValidate(req.body);

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

  const {
    title,
    description,
    address,
    isFeatured,
    attributes,
    destination,
    facility,
    adult_price,
    adult_sale_price,
    child_price,
    child_sale_price,
    status,
    star,
  } = req.body;

  let types = {};
  for (let index = 0; index < JSON.parse(facility).length; index++) {
    let facilityType = JSON.parse(facility)[index].type_fac;
    if (!types[facilityType]) {
      types[facilityType] = [];
    }
    types[facilityType].push(JSON.parse(facility)[index].facility_id);
  }

  let facilities = [];
  for (let groupType in types) {
    facilities.push({ type_fac: groupType, facility_id: types[groupType] });
  }

  let price = {
    child: parseFloat(child_price),
    adult: parseFloat(adult_price),
  };

  let sale_price = {
    adult: parseFloat(adult_sale_price),
    child: parseFloat(child_sale_price),
  };

  let arr_atr = [];
  attributes.split(",").forEach((atr) => {
    arr_atr.push(atr);
  });

  const checkExistedHotel = await Hotel.findOne({ title: title });
  if (!checkExistedHotel) {
    let image = [];
    req.files.forEach((element) => {
      image.push(element.path);
    });

    let create_by = req.user.id;
    const tour = await Hotel.create({
      title,
      description,
      address,
      isFeatured,
      attributes: arr_atr,
      price,
      image,
      sale_price,
      destination,
      facility: facilities,
      status,
      create_by,
      star,
    });

    return res.status(200).json({
      success: !!tour,
      message: "Create hotel success",
      data: tour,
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
    message: "This tour has existed",
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

  const { errors, isValid } = hotelValidate(req.body);

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

  const {
    title,
    description,
    address,
    isFeatured,
    attributes,
    destination,
    facility,
    adult_price,
    adult_sale_price,
    child_price,
    child_sale_price,
    status,
    star,
    image,
  } = req.body;

  let types = {};
  for (let index = 0; index < JSON.parse(facility).length; index++) {
    let facilityType = JSON.parse(facility)[index].type_fac;
    if (!types[facilityType]) {
      types[facilityType] = [];
    }
    types[facilityType].push(JSON.parse(facility)[index].facility_id);
  }

  let facilities = [];
  for (let groupType in types) {
    facilities.push({ type_fac: groupType, facility_id: types[groupType] });
  }

  let price = {
    child: parseFloat(child_price),
    adult: parseFloat(adult_price),
  };

  let sale_price = {
    adult: parseFloat(adult_sale_price),
    child: parseFloat(child_sale_price),
  };

  let arr_atr = [];
  attributes.split(",").forEach((atr) => {
    arr_atr.push(atr);
  });

  const checkExistedHotel = await Hotel.findById(_id);
  if (!checkExistedHotel) {
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
      message: "Can not found this hotel",
    });
  }

  let imageInSV = checkExistedHotel.image;
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
      if (file.fieldname === "image") {
        imageInSV.push(file.path);
      }
    });
  }

  let updated_by = req.user.id;
  let data = {
    title: title,
    description: description,
    address: address,
    isFeatured: isFeatured,
    attributes: arr_atr,
    price: price,
    sale_price: sale_price,
    destination: destination,
    updated_by: updated_by,
    status: status,
    isFeatured: isFeatured,
    star: parseInt(star),
  };

  const hotel = await Hotel.findByIdAndUpdate({ _id }, data, {
    new: true,
  });

  return res.status(200).json({
    success: !!hotel,
    message: "Update hotel success",
    data: hotel,
  });
};

exports.searchHotel = async (req, res) => {
  let destination = req.query.destination;
  const results = await Hotel.find({ destination: destination }).limit(10);

  return res.status(200).json({
    success: !!results,
    data: results,
  });
};
