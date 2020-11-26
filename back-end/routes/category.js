const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { create, getAll } = require("../controllers/category");

const router = express.Router();

router.get("/:type", getAll);
router.post("/create", isAuth, checkRole, create);

module.exports = router;
