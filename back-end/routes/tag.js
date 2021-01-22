const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { create, all, show } = require("../controllers/tag");

const router = express.Router();

router.get("/", all);
router.post("/create", isAuth, checkRole, create);
router.get("/:id", isAuth, checkRole, show);

module.exports = router;
