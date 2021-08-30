const express = require('express');
const router = express.Router();
const discordController = require("../Controllers/Discord/discord.controllers");
const casinoController = require("../Controllers/Discord/casino.controllers");

// register with discord
router.post("/register", discordController.registerDiscord);

// add coins with discord
router.post("/coins", discordController.addCoinDiscord);

// remove discord
router.delete("/register/:id", discordController.removeDiscord);

router.post("/gateCoin", casinoController.addGateScore);
router.post("/addBuff", casinoController.addBuff);
router.get("/getBuff/:id", casinoController.getBuff);

module.exports = router;
