const express = require("express");
const router = express.Router();
const passport = require("../Middleware/auth/passport.middleware");
const userControllers = require("../Controllers/admin/users.controllers");
const playersControllers = require("../Controllers/admin/players.controller");
const authMiddleware = passport.authenticate("jwt", { session: false });

/* create user */
router.post("/users/create", authMiddleware, userControllers.createUser);

/* create player */
router.post(
  "/players/create",
  authMiddleware,
  playersControllers.createPlayers
);

/* add player coins */
router.post("/players/:id/coin", authMiddleware, playersControllers.addCoins);

module.exports = router;
