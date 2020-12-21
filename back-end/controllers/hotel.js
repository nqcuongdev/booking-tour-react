const Hotel = require("../models/hotel");

const hotelValidate = require("../validators/hotel/create");

exports.all = async (req, res) => {
  const hotels = await Hotel.find({}).sort({ created_at: 1 });

  return res.status(200).json({
    success: !!hotels,
    data: hotels,
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
    attribute,
    price,
    sale_price,
    destination,
  } = req.body;

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
      attribute,
      price,
      image,
      sale_price,
      destination,
      create_by,
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
