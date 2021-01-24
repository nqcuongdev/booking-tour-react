const express = require("express");
const { add } = require("../controllers/contact");

const router = express.Router();

router.post("/add", add);

module.exports = router;