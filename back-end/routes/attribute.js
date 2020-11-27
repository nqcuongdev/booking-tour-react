const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { create } = require("../controllers/attribute");

const router = express.Router();

router.post("/create", isAuth, checkRole, create);

module.exports = router;
