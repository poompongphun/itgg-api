const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcryptjs");
const users = require("../../Models/users");
require('dotenv').config()

// JWT Verify
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.SECRET_KEY,
};
const jwtAuth = new JwtStrategy(jwtOptions, async (payload, done) => {
  if (payload._id) {
    const user = await users.findById(payload._id).select({
      password: false,
      __v: false,
      join_date: false,
      ipAddress: false,
    });

    if (user) {
      done(null, user);
    } else done(null, false);
  } else done(null, false);
});

// Local Login
const localAuth = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  function (email, password, done) {
    users
      .findOne({ email: email.toLowerCase() }, async (err, user) => {
        const errMessage = "Email or Password is wrong"
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { error: errMessage });
        }
        if (!user.password) {
          return done(null, false, { error: errMessage });
        }
        if (await checkPassword(password, user.password)) {
          return done(null, false, { error: errMessage });
        }

        // remove password (hide password) before send
        const removeKey = ["password", "__v"];
        removeKey.forEach((key) => (user[key] = undefined));

        return done(null, user, { message: "success" });
      })
  }
);

passport.use(jwtAuth);
passport.use(localAuth);

async function checkPassword(password, hasPassword) {
  const check = await bcrypt.compare(password, hasPassword);
  return !check;
}

module.exports = passport;
