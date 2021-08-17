const player = require("../../Models/players");
const playerValidation = require("../../Middleware/validation/players.middleware").players;

/* create player */
const createPlayers = async (req, res, next) => {
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
};
/* add coins */
const addCoins = async (req, res, next) => {
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
                giver: `${req.user.name} (${req.user.nickname})`,
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
};
module.exports = { createPlayers, addCoins };
