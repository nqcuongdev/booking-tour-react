const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { create, update, getAll, all } = require("../controllers/category");

const router = express.Router();

router.get("/", all);
router.get("/:type", getAll);
router.post("/create", isAuth, checkRole, create);
router.put("/update/:id", isAuth, checkRole, update);

module.exports = router;
