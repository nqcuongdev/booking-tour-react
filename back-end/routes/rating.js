const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  getListRatingsOfPackage,
  create,
  show,
  deleteReview,
  all,
} = require("../controllers/rating");

const router = express.Router();

router.get("/", isAuth, checkRole, all);
router.get("/:id/list-rating", getListRatingsOfPackage);
router.post("/create", create);
router.get("/:id", isAuth, checkRole, show);
router.delete("/:id", isAuth, checkRole, deleteReview);

module.exports = router;
