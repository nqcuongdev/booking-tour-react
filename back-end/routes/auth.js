const express = require("express");
const { register, login, loginWithSocial } = require("../controllers/auth");
require("../config/passport");
const passport = require("passport");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", loginWithSocial);
router.get("/facebook", passport.authenticate("facebook", { session: false }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  loginWithSocial
);

module.exports = router;
