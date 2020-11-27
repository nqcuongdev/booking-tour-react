const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { create, update, getAll } = require("../controllers/category");

const router = express.Router();

router.get("/:type", getAll);
router.post("/create", isAuth, checkRole, create);
router.post("/update/:id", isAuth, checkRole, update);

module.exports = router;
