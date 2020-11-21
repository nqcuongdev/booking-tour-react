const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const [prefix, token] = req.headers.authorization.split(" ");
    if (prefix === "Bearer") {
      return jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
          res.status(403).send({
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
