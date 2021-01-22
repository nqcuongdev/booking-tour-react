const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  all,
  getListBookByUser,
  paymentSuccess,
  show,
  doBooking,
  getCarts,
} = require("../controllers/booking");
const { update } = require("../models/hotel");

const router = express.Router();

router.get("/", isAuth, checkRole, all);
router.get("/list-tour-booked", isAuth, getListBookByUser);
router.get("/:id", isAuth, show);
router.put("/:id/payment-success", paymentSuccess);
router.put("/:id", isAuth, checkRole, update);
router.post("/", isAuth, doBooking);
router.get("/cart", isAuth, getCarts);

module.exports = router;
