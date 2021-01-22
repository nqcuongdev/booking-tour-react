const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { getAll, create, update } = require("../controllers/facility");

const router = express.Router();

router.get("/", getAll);
router.post("/create", isAuth, checkRole, create);
router.put("/update/:id", isAuth, checkRole, update);

module.exports = router;
