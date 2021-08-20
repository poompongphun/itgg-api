const express = require("express");
const router = express.Router();
const playerController = require("../Controllers/players.controllers");

/* GET home page. */
router.get("/", playerController.getGateScore);

/* GET player data. */
router.get("/players", playerController.getPlayers);

module.exports = router;
