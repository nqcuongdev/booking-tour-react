const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  all,
  create,
  show,
  getListPostByIdOption,
} = require("../controllers/post");

const router = express.Router();

router.get("/", all);
router.get("/:id/list-posts", getListPostByIdOption);
router.post("/create", isAuth, checkRole, create);
router.get("/:id", isAuth, checkRole, show);

module.exports = router;
