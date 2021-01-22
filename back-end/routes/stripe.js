const express = require("express");
const { charge } = require("../controllers/stripe");

const router = express.Router();

router.post("/charge", charge);

module.exports = router;
