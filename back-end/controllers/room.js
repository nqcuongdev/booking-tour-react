const Room = require("../models/room");

exports.all = async (req, res) => {
  let id = req.params.id;
  const rooms = await Room.find({ hotel: id }).populate("hotel");

  return res.status(200).json({
    success: !!rooms,
    data: rooms,
  });
};

exports.create = async (req, res) => {
  req.body.image = req.files[0].path;
  req.body.options = {
    buffer_price: req.body.buffer_price,
    bed: req.body.bed,
  };
  let attributes = [];
  JSON.parse(req.body.attributes).map((item) => {
    attributes.push(item._id);
  });
  req.body.attributes = attributes;
  const room = await Room.create(req.body);

  return res.status(200).json({
    success: !!room,
    data: room,
  });
};

exports.update = async (req, res) => {
  let _id = req.params.id;
  req.body.options = {
    buffer_price: req.body.buffer_price,
    bed: req.body.bed,
  };

  const room = await Room.findByIdAndUpdate({ _id }, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: !!room,
    data: room,
  });
};
