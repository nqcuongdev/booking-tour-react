const express = require("express");
const isAuth = require("../middleware/isAuth");
const checkRole = require("../middleware/checkRole");
const {
  all,
  show,
  getNotificationsByType,
  getNotificationsHasRead,
  getNotificationsHasUnRead,
  markAllRead,
} = require("../controllers/notification");

const router = express.Router();

router.get("/", isAuth, checkRole, all);
router.get("/:id", isAuth, checkRole, show);
router.get("/type", isAuth, checkRole, getNotificationsByType);
router.get("/has-read", isAuth, checkRole, getNotificationsHasRead);
router.get("/has-unread", isAuth, checkRole, getNotificationsHasUnRead);
router.get("/mark-all-read", isAuth, checkRole, markAllRead);

module.exports = router;
