const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const [prefix, token] = req.headers.authorization.split(" ");
    if (prefix === "Bearer") {
      return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
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
            message: "Failed to authenticate token.",
          });
        }

        req.user = decoded;
        return next();
      });
    }
  }

  return res.status(403).send({
    success: false,
    message: "No token provided",
  });
};
