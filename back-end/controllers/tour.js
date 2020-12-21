const Validator = require("validator");
const fs = require("fs");
const { Tour, TourAvailability } = require("../models/tours");
const Booking = require("../models/booking");
// Load validate
const tourValidate = require("../validators/tour/create");
const bookingValidate = require("../validators/book/create");
const paymentValidate = require("../validators/book/payment");

exports.all = async (req, res) => {
  const tours = await Tour.find({});

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

  const tour = await Tour.findOne({ _id });

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

  const tours = await TourAvailability.findOne({ _id });

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

  const {
    title,
    description,
    address,
    isFeatured,
    attribute,
    category,
    itinerary,
    child_price,
    adult_price,
    sale_price,
    duration,
    min_people,
    max_people,
    destination,
    available,
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

    let price = {
      child: child_price,
      adult: adult_price,
    };
    let create_by = req.user.id;
    const tour = await Tour.create({
      title,
      description,
      address,
      isFeatured,
      attribute,
      category,
      itinerary,
      price,
      image,
      sale_price,
      duration,
      min_people,
      max_people,
      destination,
      create_by,
    });
    let d = new Date();
    if (tour) {
      let code = "";
      title.split(" ").forEach((item) => {
        code += item.charAt(0).toUpperCase();
      });

      code += `${d.getDate()}${d.getMonth()}${d.getFullYear()}`;

      await TourAvailability.create({
        code,
        tour: tour._id,
        start_date: tour.created_at,
        available,
      });
    }

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
