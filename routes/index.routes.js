const express = require('express');
const router = express.Router();
const playerController = require("../Controllers/players.controllers");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'IT GG' });
});

/* GET player data. */
router.get("/players", playerController.getPlayers);

//
router.post("/register", playerController.registerDiscord);

module.exports = router;
