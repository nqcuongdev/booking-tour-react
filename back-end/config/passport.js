const passport = require("passport");
const User = require("../models/user");
const isAuth = require("../middleware/isAuth");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = (req) => {
  let token = null;
  if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "").trim();
  } else if (req.body.token) {
    token = req.body.token.trim();
  }
  if (token) {
    // Decrypts token
    token = isAuth.decrypt(token);
  }
  return token;
};

/**
 * Options object for jwt middleware
 */
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.data._id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    return !user ? done(null, false) : done(null, user);
  });
});

/**
 * Passport required
 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

/**
 * Login with google
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_CLIENT_ID,
      clientSecret: process.env.GG_CLIENT_SECRET,
      callbackURL: "/api/v1/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({
          $or: [
            { "social_login.social_id": profile.id, auth_type: "social" },
            { email: profile.emails[0].value },
          ],
        });

        if (user) {
          if (user.social_login.social_type === "google") {
            return done(null, user);
          }
        }

        const newUser = new User({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          auth_type: "social",
          social_login: {
            social_id: profile.id,
            social_type: "google",
          },
          email: profile.emails[0].value,
          full_name: profile.displayName,
          image: profile.photos[0].value,
        });

        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

/**
 * Login with facebook
 */

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email", "gender", "name"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({
        facebook_id: profile.id,
        authType: "facebook",
      });

      if (user) {
        return done(null, user);
      }

      let newUser;
      if (profile.email) {
        newUser = new User({
          authType: "facebook",
          facebook_id: profile.id,
          email: profile.email,
          name: profile.displayName,
          avatar: profile.photos[0].value,
        });
      } else {
        newUser = new User({
          authType: "facebook",
          facebook_id: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0].value,
        });
      }

      await newUser.save();

      return done(null, newUser);
    }
  )
);
