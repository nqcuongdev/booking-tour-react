// Grant access to specific roles
module.exports = (req, res, next) => {
  let roles = ["writer", "admin"];
  if (!roles.includes(req.user.role)) {
    return res.status(403).send({
      success: false,
      message: "You can not authorized to access this route.",
    });
  }

  next();
};
