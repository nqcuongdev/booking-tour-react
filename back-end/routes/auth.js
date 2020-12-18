const express = require("express");
const { register, login, loginWithSocial } = require("../controllers/auth");
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
  loginWithSocial
);
router.get("/facebook", passport.authenticate("facebook", { session: false }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  loginWithSocial
);

module.exports = router;
