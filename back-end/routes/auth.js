const express = require("express");
const { register, login, loginWithGoogle } = require("../controllers/auth");
require("../config/passport");
const passport = require("passport");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google",
  }),
  loginWithGoogle
);

module.exports = router;
