const User = require("../models/user");

//Load validate
const registerValidate = require("../validators/auth/register");
const loginValidate = require("../validators/auth/login");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GG_CLIENT_ID);

exports.register = async (req, res) => {
  const { errors, isValid } = registerValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { first_name, last_name, phone, email, password } = req.body;

  const checkExistedUser = await User.findOne({ email });

  if (!checkExistedUser) {
    let full_name = `${first_name} ${last_name}`;
    // Create user
    const user = await User.create({
      first_name,
      last_name,
      full_name,
      email,
      password,
      phone,
    });

    let token = sendTokenResponse(user);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "An error occur!",
      });
    }

    return res.status(200).json({
      success: true,
      token: token,
      data: user,
    });
  }

  return res.status(401).json({
    success: false,
    message: "User existed please try with another email",
  });
};

exports.login = async (req, res) => {
  const { errors, isValid } = loginValidate(req.body);

  //Check value request
  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: errors,
    });
  }

  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: { email: "User not found please try with another email" },
    });
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: {
        password: "Password wrong please try again with another password",
      },
    });
  }

  let token = sendTokenResponse(user);

  return res.status(200).json({
    success: !!user,
    token: token,
    data: user,
  });
};

exports.loginWithSocial = async (req, res) => {
  const { tokenId, googleId } = req.body;

  client
    .verifyIdToken({ idToken: tokenId, audience: process.env.GG_CLIENT_ID })
    .then(async (response) => {
      let { email, name, picture, given_name, family_name } = response.payload;
      let user = await User.findOne({
        $or: [
          {
            $and: [
              { auth_type: "social" },
              { "social_login.social_type": "google" },
              { "social_login.social_id": googleId },
            ],
          },
          { email },
        ],
      });
      if (user) {
        if (user.auth_type === "email") {
          user = await User.findOneAndUpdate(
            {
              _id: user._id,
            },
            {
              $set: [
                { "social_login.social_type": "google" },
                { "social_login.social_id": googleId },
              ],
            },
            {
              new: true,
            }
          );
        }
      } else {
        user = await User.create({
          full_name: name,
          email: email,
          avatar: picture,
          first_name: given_name,
          last_name: family_name,
          auth_type: "social",
          "social_login.social_type": "google",
          "social_login.social_id": googleId,
        });
      }

      let token = sendTokenResponse(user, 200, res);

      return res.status(200).json({
        success: !!user,
        token: token,
        data: user,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err,
        });
      }
    });
};
// Get token from model, create cookie and send response
const sendTokenResponse = (user) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  return token;
};
