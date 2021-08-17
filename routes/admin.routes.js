const express = require("express");
const router = express.Router();
const passport = require("../Middleware/auth/passport.middleware");
const userControllers = require("../Controllers/admin/users.controllers");
const playersControllers = require("../Controllers/admin/players.controller");

/* create user */
router.post(
  "/users/create",
  passport.authenticate("jwt", { session: false }),
  userControllers.createUser
);

/* create player */
router.post(
  "/players/create",
  passport.authenticate("jwt", { session: false }),
  playersControllers.createPlayers
);

/* add player coins */
router.post(
  "/players/:id/coin",
  passport.authenticate("jwt", { session: false }),
  playersControllers.addCoins
);

module.exports = router;
