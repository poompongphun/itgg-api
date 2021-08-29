const player = require("../../Models/players");
const discordValidation = require("../../Middleware/validation/discord.middleware");

const addGateScore = async (req, res, next) => {
  const validation = discordValidation.addGateCoinDiscord(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    const bulkUpdateOps = [
      {
        updateOne: {
          filter: { discord_id: "000000000000000000" },
          update: { $inc: { coin: validation.value.and } },
        },
      },
      {
        updateOne: {
          filter: { discord_id: "000000000000000001" },
          update: { $inc: { coin: validation.value.or } },
        },
      },
      {
        updateOne: {
          filter: { discord_id: "000000000000000002" },
          update: { $inc: { coin: validation.value.nor } },
        },
      },
      {
        updateOne: {
          filter: { discord_id: "000000000000000003" },
          update: { $inc: { coin: validation.value.not } },
        },
      },
    ];

    try {
      const updateGate = await player.bulkWrite(bulkUpdateOps, {
        ordered: true,
        w: 1,
      });
      if (updateGate) res.json("success");
      else res.status(400).json("fail");
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

module.exports = { addGateScore };
