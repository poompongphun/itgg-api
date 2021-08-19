const player = require("../../Models/players");
const playersValidation =
  require("../../Middleware/validation/players.middleware").players;

/* register player with discord. */
const registerDiscord = async (req, res, next) => {
  const validation = playersValidation.registerDiscord(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    const findDiscord = await player.findOne({
      discord_id: validation.value.discord_id,
    });
    if (!findDiscord) {
      try {
        const findPlayer = await player.findOneAndUpdate(
          {
            std_id: validation.value.std_id,
            discord_id: "",
          },
          {
            discord_id: validation.value.discord_id,
          },
          {
            new: true,
            useFindAndModify: false,
          }
        );
        if (findPlayer) {
          res.json(findPlayer);
        } else res.status(404).json("Not found player or registered");
      } catch (error) {
        res.status(400).json(error);
      }
    } else res.status(404).json("Your discord is registered");
  }
};

module.exports = { registerDiscord };
