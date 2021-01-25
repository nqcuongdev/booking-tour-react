const Book = require("../models/booking");
const Validator = require("validator");
const { TourAvailability } = require("../models/tours");

exports.all = async (req, res) => {
  const books = await Book.find({}).sort({ created_at: 1 });

  return res.status(200).json({
    success: !!books,
    data: books,
  });
};

exports.doBooking = async (req, res) => {
  const book = await Book.create(req.body);
  if (book) {
    await TourAvailability.findOneAndUpdate(
      {
        _id: req.body.code,
      },
      {
        $inc: { available: -1 },
      }
    );
  }

  return res.status(200).json({
    success: !!book,
    data: book,
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
  const { booking_id, transaction_id } = req.body;

  let transactionBookTour = await Book.findOne({
    $and: [{ _id: booking_id }],
  });

  if (!transactionBookTour) {
    return res.status(404).json({
      success: !!transactionBookTour,
      message: "Can not found this booking transaction",
    });
  }

  let book = await Book.findOneAndUpdate(
    { _id: transactionBookTour._id },
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

exports.getCarts = async (req, res) => {
  const card = await Book.find({
    $and: [{ status: "process" }, { user: req.user.id }],
  })
    .populate({
      path: "code",
      populate: {
        path: "tour",
        model: "tour",
      },
    })
    .populate({
      path: "room",
      populate: {
        path: "hotel",
        model: "hotel",
      },
    });

  if (!card) {
    return res.status(404).json({
      success: !!card,
      message: "Can not found this card",
    });
  }

  return res.json({
    success: !!card,
    data: card,
  });
};

exports.deleteCart = async (req, res) => {
  let id = req.params.id;
  let checkIDValid = Validator.isMongoId(id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  let checkExistedCart = await Book.findById(id);
  if (!checkExistedCart) {
    return res.status(404).json({
      success: false,
      message: "Not found",
    });
  }

  let cart = await Book.deleteOne({ _id: id });

  await TourAvailability.findOneAndUpdate(
    {
      _id: checkExistedCart.code,
    },
    {
      $inc: { available: 1 },
    }
  );

  return res.json({
    success: !!cart,
    message: "Delete success",
  });
};
