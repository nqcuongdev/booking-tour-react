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
  deleteCart,
} = require("../controllers/booking");
const { update } = require("../models/hotel");

const router = express.Router();

router.get("/", isAuth, checkRole, all);
router.get("/list-tour-booked", isAuth, getListBookByUser);
router.get("/cart", isAuth, getCarts);
router.get("/:id", isAuth, show);
router.put("/:id/payment-success", paymentSuccess);
router.put("/:id", isAuth, checkRole, update);
router.post("/", isAuth, doBooking);
router.delete("/:id", isAuth, deleteCart);

module.exports = router;
