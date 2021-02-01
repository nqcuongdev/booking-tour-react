const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const { create, all, show, update } = require("../controllers/tag");

const router = express.Router();

router.get("/", all);
router.post("/create", isAuth, checkRole, create);
router.get("/:id", isAuth, checkRole, show);
router.put("/:id/update", isAuth, checkRole, update);

module.exports = router;
