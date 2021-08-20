const player = require("../../Models/players");
const discordValidation = require("../../Middleware/validation/discord.middleware");

/* register player with discord. */
const registerDiscord = async (req, res, next) => {
  const validation = discordValidation.registerDiscord(req.body);
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
        } else {
          const players = new player({
            std_id: validation.value.std_id,
            discord_id: validation.value.discord_id,
            name: validation.value.name,
            house: validation.value.house,
            year: validation.value.year,
          });
          try {
            const createPlayer = await players.save();
            res.json(createPlayer);
          } catch (error) {
            res.status(400).json(error);
          }
        }
      } catch (error) {
        res.status(400).json(error);
      }
    } else res.status(404).json("Your discord is registered");
  }
};

const addCoinDiscord = async (req, res, next) => {
  const validation = discordValidation.addCoinDiscord(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    const addCoins = await player.updateMany(
      {
        discord_id: { $in: validation.value.discord_id },
      },
      {
        $inc: { coin: validation.value.coin },
        $push: {
          coinlog: {
            coin: validation.value.coin,
            giver: validation.value.giver || "",
            event: validation.value.event || "",
          },
        },
      }
    );
    if (addCoins) {
      const DiscordRegis = await player
        .find({
          discord_id: { $in: validation.value.discord_id },
        })
        .select({ _id: false, discord_id: true });
      const success = [];
      const fail = [];
      validation.value.discord_id.forEach((element) => {
        if (DiscordRegis.find(({ discord_id }) => discord_id == element))
          success.push(element);
        else fail.push(element);
      });
      res.json({ coin: validation.value.coin, success, fail });
    } else res.status(400).json("something went wrong");
  }
};

const removeDiscord = async (req, res, next) => {
  try {
    const removeDiscord = await player.findOneAndUpdate(
      { discord_id: req.params.id },
      { discord_id: "" }
    );
    if (removeDiscord) {
      res.json("Your discord is unlinked");
    } else res.status(404).json("Your discord is not registered");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { registerDiscord, addCoinDiscord, removeDiscord };
