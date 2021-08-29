const player = require("../../Models/players");
const discordValidation = require("../../Middleware/validation/discord.middleware");

const addGateScore = async (req, res, next) => {
  const validation = discordValidation.addGateCoinDiscord(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    const bulkUpdateOps = [];
    if (validation.value.and && validation.value.and != 0)
      bulkUpdateOps.push(
        pushUpdate(
          "000000000000000000",
          validation.value.and,
          validation.value.giver,
          validation.value.event
        )
      );
    if (validation.value.or && validation.value.or != 0)
      bulkUpdateOps.push(
        pushUpdate(
          "000000000000000001",
          validation.value.or,
          validation.value.giver,
          validation.value.event
        )
      );
    if (validation.value.nor && validation.value.nor != 0)
      bulkUpdateOps.push(
        pushUpdate(
          "000000000000000002",
          validation.value.nor,
          validation.value.giver,
          validation.value.event
        )
      );
    if (validation.value.not && validation.value.not != 0)
      bulkUpdateOps.push(
        pushUpdate(
          "000000000000000003",
          validation.value.not,
          validation.value.giver,
          validation.value.event
        )
      );

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

function pushUpdate(id, coins, giver, event) {
  return {
    updateOne: {
      filter: { discord_id: id },
      update: {
        $inc: { coin: coins },
        $push: {
          coinlog: {
            coin: coins,
            giver: giver || "",
            event: event || "",
          },
        },
      },
    },
  };
}

module.exports = { addGateScore };
