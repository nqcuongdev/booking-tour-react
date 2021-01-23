const Post = require("../models/post");

// Load validate
const postValidate = require("../validators/post/create");

exports.all = async (req, res) => {
  const posts = await Post.find({});

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

  const post = await Post.findOne({ _id });

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
    fs.unlink(req.files.path, (err) => {
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
    let banner = req.files.path;
    let created_by = req.user.id;
    const post = await Post.create({
      title,
      content,
      category,
      banner,
      isFeatured,
      destination,
      tags,
      created_by,
    });

    return res.status(200).json({
      success: !!post,
      message: "Create post success",
      data: post,
    });
  }

  //Remove upload file
  fs.unlink(req.files.path, (err) => {
    if (err) console.log(err);
    return;
  });

  return res.status(401).json({
    success: false,
    message: "This post has existed",
  });
};