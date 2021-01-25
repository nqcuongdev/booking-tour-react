const express = require("express");
const { add } = require("../controllers/subscribe");

const router = express.Router();

router.post("/add", add);

module.exports = router;