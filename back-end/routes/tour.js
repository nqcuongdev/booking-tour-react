const express = require("express");
const multer = require("multer");
const path = require("path");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  all,
  show,
  create,
  getScheduleTour,
  bookTour,
  update,
  createScheduleTour,
  editScheduleTour,
  paginate,
  search,
  getAllSchedules,
} = require("../controllers/tour");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/tours");
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

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).any();

router.get("/", all);
router.get("/paginate", paginate);
router.get("/list-schedule", isAuth, checkRole, getAllSchedules);
router.post("/search", search);
router.get("/:id", show);
router.get("/:id/schedule", getScheduleTour);
router.post("/:id/schedule", isAuth, checkRole, createScheduleTour);
router.put("/schedule/:id", isAuth, checkRole, editScheduleTour);
router.post("/:id/booking", bookTour);
router.post("/create", upload, isAuth, checkRole, create);
router.put("/:id", upload, isAuth, checkRole, update);

module.exports = router;
