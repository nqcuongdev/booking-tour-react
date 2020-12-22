const express = require("express");
const { pay } = require("../controllers/paypal");

const router = express.Router();

router.get("/payment", pay);
router.get("/success", pay);
router.get("/cancel", pay);

module.exports = router;
