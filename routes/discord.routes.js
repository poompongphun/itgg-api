const express = require('express');
const router = express.Router();
const discordController = require("../Controllers/Discord/discord.controllers");

// register with discord
router.post("/register", discordController.registerDiscord);

module.exports = router;
