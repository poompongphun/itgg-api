const express = require("express");
const router = express.Router();
const passport = require("../Middleware/auth/passport.middleware");
const authControllers = require("../Controllers/auth.controllers");
const authMiddleware = passport.authenticate("jwt", { session: false });

/* local login */
router.post("/login", authControllers.authLogin);

/* get me data */
router.get("/me", authMiddleware, authControllers.authMe);

module.exports = router;
