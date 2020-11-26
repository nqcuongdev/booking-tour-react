const fs = require("fs");

// Grant access to specific roles
module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    //If exist file remove it
    if (req.file) {
      //Remove upload file
      fs.unlink(req.file.path, (err) => {
        if (err) console.log(err);
        return;
      });
    }

    if (req.files) {
      req.files.forEach((element) => {
        //Remove upload file
        fs.unlink(element.path, (err) => {
          if (err) console.log(err);
          return;
        });
      });
    }

    return res.status(403).send({
      success: false,
      message: "You can not authorized to access this route.",
    });
  }

  next();
};
