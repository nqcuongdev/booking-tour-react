const express = require("express");
const { show, all, updateRoleUser } = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

router.get("/me", isAuth, show);
router.get("/all", isAuth, checkRole, all);
router.put("/:id", isAuth, checkRole, updateRoleUser);

module.exports = router;
