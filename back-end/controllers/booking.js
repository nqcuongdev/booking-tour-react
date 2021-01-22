const Book = require("../models/booking");

exports.all = async (req, res) => {
  const books = await Book.find({}).sort({ created_at: 1 });

  return res.status(200).json({
    success: !!books,
    data: books,
  });
};

exports.getListBookByUser = async (req, res) => {
  let user = req.user;
  const books = await Book.find({
    $or: [{ email: user.email }, { user: user.id }],
  }).sort({ created_at: 1 });

  return res.status(200).json({
    success: !!books,
    data: books,
  });
};

exports.show = async (req, res) => {
  let _id = req.params.id;
  let user = req.user;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const bookTransaction = await Book.findOne({
    $and: [{ _id }, { $or: [{ user: user.id }, { email: user.email }] }],
  });

  if (!bookTransaction) {
    return res.status(404).json({
      success: !!bookTransaction,
      message: "Can not found this transaction",
    });
  }

  return res.status(200).json({
    success: !!bookTransaction,
    data: bookTransaction,
  });
};

exports.paymentSuccess = async (req, res) => {
  const { errors, isValid } = paymentValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { booking_id, transaction_id, package } = req.body;

  let transactionBookTour = await Booking.findOne({
    $and: [{ _id: booking_id }, { package: package }],
  });

  if (!transactionBookTour) {
    return res.status(404).json({
      success: !!transactionBookTour,
      message: "Can not found this booking transaction",
    });
  }

  let book = await Booking.findOneAndUpdate(
    { _id: tour._id },
    { status: "success", "payment.transaction_id": transaction_id },
    {
      new: true,
    }
  );

  return res.json({
    success: !!book,
    message: "Payment Success",
    data: book,
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

  const bookTransaction = await Book.findOne({ _id });

  if (!bookTransaction) {
    return res.status(404).json({
      success: !!bookTransaction,
      message: "Can not found this transaction",
    });
  }

  const { status } = req.body;

  let book = await Booking.findOneAndUpdate(
    { _id: tour._id },
    { status: status },
    {
      new: true,
    }
  );

  return res.json({
    success: !!book,
    message: "Update Transaction Success",
    data: book,
  });
};
