const express = require("express");
const multer = require("multer");
const path = require("path");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { all } = require("../controllers/tour");

const router = express.Router();

router.get("/", all);

module.exports = router;
