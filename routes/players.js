var express = require("express");
var router = express.Router();
const player = require("../model/players");
const playerValidation = require("../Middleware/validation/players").players;

/* GET player data. */
router.get("/", async (req, res, next) => {
  const searchQuery = req.query.search || "";
  const limit = parseInt(escape(req.query.limit)) || 10;
  const players = await player
    .find({
      $or: [
        { std_id: { $regex: new RegExp(RegExp(searchQuery), "i") } },
        { name: { $regex: new RegExp(RegExp(searchQuery), "i") } },
        { nickname: { $regex: new RegExp(RegExp(searchQuery), "i") } },
      ],
    })
    .select({ _id: false, __v: false })
    .limit(limit)
    .sort({ coin: -1 });
  res.json(players);
});

/* create player */
router.post("/", async (req, res, next) => {
  const validation = playerValidation.createPlayer(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    const players = new player({
      std_id: validation.value.std_id,
      name: validation.value.name,
      nickname: validation.value.nickname,
      house: validation.value.house,
    });
    try {
      const createPlayer = await players.save();
      res.json(createPlayer);
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

/* add coins */
router.post("/:id/coin", async (req, res, next) => {
  const validation = playerValidation.addCoin(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    try {
      const players = await player
        .findOneAndUpdate(
          { std_id: req.params.id },
          {
            $inc: { coin: validation.value.coin },
            $push: {
              coinlog: {
                coin: validation.value.coin,
                giver: validation.value.giver,
                event: validation.value.event,
              },
            },
          },
          { useFindAndModify: false, new: true }
        )
        .select({ _id: false, __v: false });
      if (players) {
        res.json(players);
      } else res.status(404).json("Not found player");
    } catch (error) {
      res.status(400).json(error);
    }
  }
});

module.exports = router;
