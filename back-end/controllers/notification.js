const Notification = require("../models/notification");
const Validator = require("validator");

exports.all = async (req, res) => {
  const notifications = await Notification.find({}).sort("-1").limit(10);

  return res.status(200).json({
    success: !!notifications,
    data: notifications,
  });
};

exports.show = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const notification = await Notification.findOne({ _id });

  if (!notification) {
    return res.status(404).json({
      success: !!notification,
      message: "Can not found this notification",
    });
  }

  return res.status(200).json({
    success: !!notification,
    data: notification,
  });
};

exports.getNotificationsByType = async (req, res) => {
  if (Validator.isEmpty(req.body.type)) {
    return res.status(400).json({
      success: false,
      message: "Type field is require",
    });
  }

  const notifications = await Notification.find({ type: req.body.type });

  return res.status(200).json({
    success: !!notifications,
    data: notifications,
  });
};

exports.getNotificationsHasRead = async (req, res) => {
  const notifications = await Notification.find({ isRead: true });

  return res.status(200).json({
    success: !!notifications,
    data: notifications,
  });
};

exports.getNotificationsHasUnRead = async (req, res) => {
  const notifications = await Notification.find({ isRead: false });

  return res.status(200).json({
    success: !!notifications,
    data: notifications,
  });
};

exports.markAllRead = async (req, res) => {
  let listNotification = req.body.listNotification;

  listNotification.forEach(async (element) => {
    return await Notification.findByIdAndUpdate(
      { _id: element },
      { isRead: true },
      {
        new: true,
      }
    );
  });

  return res.status(200).json({
    success: true,
    message: "Mark all read success",
  });
};
