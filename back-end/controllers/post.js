const Post = require("../models/post");
const Validator = require("validator");
const fs = require("fs");

// Load validate
const postValidate = require("../validators/post/create");

exports.all = async (req, res) => {
  const posts = await Post.find({})
    .populate("created_by")
    .populate("updated_by")
    .populate("category")
    .populate("destination")
    .populate("tags");

  return res.status(200).json({
    success: !!posts,
    data: posts,
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

  const post = await Post.findOne({ _id })
    .populate("created_by")
    .populate("updated_by")
    .populate("category")
    .populate("destination")
    .populate("tags");

  if (!post) {
    return res.status(404).json({
      success: !!post,
      message: "Can not found this post",
    });
  }

  return res.status(200).json({
    success: !!post,
    data: post,
  });
};

exports.getListPostByIdOption = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }

  const posts = await Blog.find({
    $or: [{ category: _id }, { destination: _id }, { tags: { $in: [_id] } }],
  });

  return res.status(200).json({
    success: !!posts,
    data: posts,
  });
};

exports.create = async (req, res) => {
  const { errors, isValid } = postValidate(req.body);

  //Check value request
  if (!isValid) {
    //Remove upload file
    fs.unlink(req.files[0].path, (err) => {
      if (err) console.log(err);
      return;
    });

    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: "Please select file before upload",
    });
  }

  const { title, content, category, isFeatured, destination, tags } = req.body;

  const checkExistedPost = await Post.findOne({ title: title });
  if (!checkExistedPost) {
    let banner = req.files[0].path;
    let created_by = req.user.id;
    let arrTags = [];
    JSON.parse(tags).map((tag) => {
      arrTags.push(tag.value);
    });
    const post = await Post.create({
      title,
      content,
      category,
      banner,
      isFeatured,
      destination,
      tags: arrTags,
      created_by,
    });

    return res.status(200).json({
      success: !!post,
      message: "Create post success",
      data: post,
    });
  }

  //Remove upload file
  fs.unlink(req.files[0].path, (err) => {
    if (err) console.log(err);
    return;
  });

  return res.status(401).json({
    success: false,
    message: "This post has existed",
  });
};

exports.update = async (req, res) => {
  let _id = req.params.id;
  let checkIDValid = Validator.isMongoId(_id);
  if (!checkIDValid) {
    return res.status(400).json({
      success: false,
      message: "Your ID is not valid",
    });
  }
  const { errors, isValid } = postValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { title, content, category, isFeatured, destination, tags } = req.body;

  const checkExistedPost = await Post.findOne({ _id });
  if (!checkExistedPost) {
    if (req.files && req.files !== "") {
      req.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          if (err) console.log(err);
          return;
        });
      });
    }

    return res.status(404).json({
      success: false,
      message: "Can not found this post",
    });
  }

  let banner = checkExistedPost.banner;
  if (req.files && req.files.length > 0 && req.files !== "") {
    fs.unlink(checkExistedPost.banner, (err) => {
      if (err) console.log(err);
      return;
    });
    banner = req.files[0].path;
  }

  let updated_by = req.user.id;
  let arrTags = [];

  JSON.parse(tags).map((tag) => {
    if (tag && tag.value) {
      arrTags.push(tag.value);
    }
    if (tag && tag._id) {
      arrTags.push(tag._id);
    }
  });
  const post = await Post.findByIdAndUpdate(
    { _id },
    {
      banner,
      updated_by,
      title,
      content,
      category: category,
      isFeatured,
      destination: destination,
      tags: arrTags,
    },
    {
      new: true,
    }
  );

  return res.status(200).json({
    success: !!post,
    message: "Update post success",
    data: post,
  });
};
