const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  getListRatingsOfPackage,
  create,
  show,
} = require("../controllers/rating");

const router = express.Router();

router.get("/:id/list-rating", getListRatingsOfPackage);
router.post("/create", create);
router.get("/:id", isAuth, checkRole, show);

module.exports = router;
