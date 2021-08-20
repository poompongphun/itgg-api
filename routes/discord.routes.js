const express = require('express');
const router = express.Router();
const discordController = require("../Controllers/Discord/discord.controllers");

// register with discord
router.post("/register", discordController.registerDiscord);

// add coins with discord
router.post("/coins", discordController.addCoinDiscord);

// remove discord
router.delete("/register/:id", discordController.removeDiscord);

module.exports = router;
