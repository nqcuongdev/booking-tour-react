const Destination = require("../controllers/destination");

//Load validate
const destinationValidate = require("../validators/destination/create");

exports.create = async (req, res) => {
  const { errors, isValid } = destinationValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, description, address, image } = req.body;

  const checkExistedDestination = await Destination.findOne({ title });
  if (!checkExistedDestination) {
    const destination = await Destination.create({
      title,
      description,
      address,
      image,
    });

    return res.status(200).json({
      success: true,
      message: "Create destination success",
      data: destination,
    });
  }

  //Remove upload file
  fs.unlink(req.file.path, (err) => {
    if (err) console.log(err);
    return;
  });

  return res.status(401).json({
    success: false,
    message: "This destination has existed",
  });
};
