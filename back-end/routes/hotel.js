const express = require("express");
const multer = require("multer");
const path = require("path");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  all,
  create,
  show,
  update,
  paginate,
  searchHotel,
} = require("../controllers/hotel");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/hotels");
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
  "image",
  10
);

router.get("/", all);
router.get("/paginate", paginate);
router.get("/search-hotel", searchHotel);
router.get("/:id", show);
router.post("/create", upload, isAuth, checkRole, create);
router.put("/:id", upload, isAuth, checkRole, update);

module.exports = router;
