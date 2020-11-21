const express = require("express");
const multer = require("multer");
const path = require("path");
const { create } = require("../controllers/destination");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/destinations");
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

const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/create", upload.single("image"), isAuth, checkRole, create);

module.exports = router;
