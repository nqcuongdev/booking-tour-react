const Room = require("../models/room");

exports.all = async (req, res) => {
  let id = req.params.id;
  const rooms = await Room.find({ hotel: id });

  return res.status(200).json({
    success: !!rooms,
    data: rooms,
  });
};

exports.create = async (req, res) => {
  req.body.image = req.files[0].path;
  const room = await Room.create(req.body);

  return res.status(200).json({
    success: !!room,
    data: room,
  });
};
