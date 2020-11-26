const express = require("express");
const { register, login } = require("../controllers/auth");
require("../config/passport");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
