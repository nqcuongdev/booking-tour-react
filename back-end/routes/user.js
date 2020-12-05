const express = require("express");
const { show } = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/me", isAuth, show);

module.exports = router;
