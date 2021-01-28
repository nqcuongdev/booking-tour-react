const express = require("express");
const multer = require("multer");
const path = require("path");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  all,
  create,
  show,
  getListPostByIdOption,
} = require("../controllers/post");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/posts");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).array(
  "banner",
  1
);

const router = express.Router();

router.get("/", all);
router.get("/:id/list-posts", getListPostByIdOption);
router.post("/create", upload, isAuth, checkRole, create);
router.get("/:id", show);

module.exports = router;
