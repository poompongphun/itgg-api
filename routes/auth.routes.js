const express = require("express");
const router = express.Router();
const passport = require("../Middleware/auth/passport.middleware");
const authControllers = require("../Controllers/auth.controllers");

/* local login */
router.post("/login", authControllers.authLogin);

// me data
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  authControllers.authMe
);

module.exports = router;
