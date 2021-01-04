const Validator = require("validator");
const fs = require("fs");
const { Tour, TourAvailability } = require("../models/tours");
const Booking = require("../models/booking");
// Load validate
const tourValidate = require("../validators/tour/create");
const bookingValidate = require("../validators/book/create");

exports.all = async (req, res) => {
  const tours = await Tour.find({})
    .populate("destination")
    .populate("category")
    .populate("attribute")
    .populate("created_by", "full_name");

  return res.status(200).json({
    success: !!tours,
    data: tours,
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

  let tour = await Tour.findOne({ _id })
    .populate("destination")
    .populate("category")
    .populate("attribute");

  if (!tour) {
    return res.status(404).json({
      success: !!tour,
      message: "Can not found this tour",
    });
  }

  return res.status(200).json({
    success: !!tour,
    data: tour,
  });
};

exports.getScheduleTour = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const tours = await TourAvailability.find({ tour: _id });

  return res.status(200).json({
    success: !!tours,
    data: tours,
  });
};

exports.bookTour = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }
  const { errors, isValid } = bookingValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  let tour = await TourAvailability.findOne({ tour: _id });

  if (!tour) {
    return res.status(404).json({
      success: !!tour,
      message: "Can not found this tour",
    });
  }

  if (tour.available === 0 || tour.available === tour.remainder) {
    return res.status(400).json({
      success: !!tour,
      message: "Can not book this tour",
    });
  }

  let checkUserHasBooked = await Booking.findOne({
    $and: [{ code: tour.code }, { package: tour._id }],
  });

  if (checkUserHasBooked) {
    return res.status(400).json({
      success: !!tour,
      message: "You have already booked this tour",
    });
  }

  let user = req.user;
  if (user) {
    const { notes } = req.body;
    const book = await Booking.create({
      code: tour.code,
      package: tour._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: `${user.first_name} ${user.last_name}`,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      zip_code: user.zip_code,
      country: user.country,
      notes,
      user: user.id,
      status: "process",
    });

    return res.status(200).json({
      success: !!book,
      message: "Book success",
      data: book,
    });
  }

  const {
    email,
    first_name,
    last_name,
    phone,
    address,
    city,
    state,
    zip_code,
    country,
    notes,
  } = req.body;

  const book = await Booking.create({
    code: tour.code,
    package: tour._id,
    email: email,
    last_name: last_name,
    first_name: first_name,
    full_name: `${first_name} ${last_name}`,
    phone: phone,
    address: address,
    city: city,
    state: state,
    zip_code: zip_code,
    country: country,
    notes,
  });

  if (book) {
    await TourAvailability.findOneAndUpdate(
      { _id: tour._id },
      { remainder: tour.remainder + 1 },
      {
        new: true,
      }
    );
  }

  return res.status(200).json({
    success: !!book,
    message: "Book success",
    data: book,
  });
};

exports.create = async (req, res) => {
  const { errors, isValid } = tourValidate(req.body);

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

  let {
    title,
    description,
    address,
    isFeatured,
    attributes,
    category,
    itinerary,
    child_price,
    adult_price,
    adult_sale_price,
    child_sale_price,
    duration,
    min_people,
    max_people,
    destination,
  } = req.body;

  const checkExistedTour = await Tour.findOne({ title: title });
  if (!checkExistedTour) {
    let image = [];
    req.files.forEach((element) => {
      if (element.fieldname === "image") {
        image.push(element.path);
      } else {
        // Get index of itinerary for save
        let index = element.fieldname.split("[")[1].charAt(0);
        itinerary[index].image = element.path;
      }
    });

    let arr_atr = [];
    attributes.split(",").forEach((atr) => {
      arr_atr.push(atr);
    });

    let price = {
      child: child_price,
      adult: adult_price,
    };

    let sale_price = {
      child: child_sale_price > 0 ? child_sale_price : 0,
      adult: adult_sale_price > 0 ? adult_sale_price : 0,
    };

    let created_by = req.user.id;
    const tour = await Tour.create({
      title,
      description,
      address,
      isFeatured,
      attributes: arr_atr,
      category,
      itinerary,
      price,
      image,
      sale_price,
      duration,
      min_people,
      max_people,
      destination,
      created_by,
    });
    // let d = new Date();
    // if (tour) {
    //   let code = "";
    //   title.split(" ").forEach((item) => {
    //     code += item.charAt(0).toUpperCase();
    //   });

    //   code += `${d.getDate()}${d.getMonth()}${d.getFullYear()}`;

    //   await TourAvailability.create({
    //     code,
    //     tour: tour._id,
    //   });
    // }

    return res.status(200).json({
      success: !!tour,
      message: "Create tour success",
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

  const { errors, isValid } = tourValidate(req.body);
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

  let {
    title,
    description,
    address,
    isFeatured,
    attributes,
    category,
    itinerary,
    child_price,
    adult_price,
    adult_sale_price,
    child_sale_price,
    duration,
    min_people,
    max_people,
    destination,
    image,
    status,
  } = req.body;

  const checkExistedTour = await Tour.findOne({ _id });

  if (!checkExistedTour) {
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
      message: "Can not found this tour",
    });
  }

  let imageInSV = checkExistedTour.image;
  let imageItiInSV = checkExistedTour.itinerary;

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

  if (itinerary.length >= 1) {
    imageItiInSV.forEach((img, index) => {
      if (itinerary[index].image !== img.image) {
        fs.unlink(img.image, (err) => {
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
      } else {
        // Get index of itinerary for save
        let index = file.fieldname.split("[")[1].charAt(0);
        itinerary[index].image = file.path;
      }
    });
  }

  let arr_atr = [];
  attributes.split(",").forEach((atr) => {
    arr_atr.push(atr);
  });

  let price = {
    child: child_price,
    adult: adult_price,
  };

  let sale_price = {
    child: child_sale_price > 0 ? child_sale_price : 0,
    adult: adult_sale_price > 0 ? adult_sale_price : 0,
  };

  let updated_by = req.user.id;
  let data = {
    title: title,
    description: description,
    address: address,
    isFeatured: isFeatured,
    attributes: arr_atr,
    category: category,
    itinerary: itinerary,
    price: price,
    sale_price: sale_price,
    duration: duration,
    min_people: min_people,
    max_people: max_people,
    destination: destination,
    updated_by: updated_by,
    status: status,
    isFeatured: isFeatured,
  };

  const tour = await Tour.findByIdAndUpdate({ _id }, data, {
    new: true,
  });

  return res.status(200).json({
    success: !!tour,
    message: "Update tour success",
    data: tour,
  });
};
