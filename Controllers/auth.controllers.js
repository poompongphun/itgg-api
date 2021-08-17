const jwt = require("jsonwebtoken");
const passport = require("../Middleware/auth/passport.middleware");

const authLogin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json(info);
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    return res
      .header("authorization", token)
      .json({ user: user, access_token: token });
  })(req, res, next);
};

// me data
const authMe = (req, res, next) => {
  res.json(req.user);
};

module.exports = { authLogin, authMe };
