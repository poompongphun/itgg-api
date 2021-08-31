const player = require("../../Models/players");
const buff = require("../../Models/buff");
const discordValidation = require("../../Middleware/validation/discord.middleware");
const moment = require("moment");

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

const addBuff = async (req, res, next) => {
  const validation = discordValidation.addBuffDiscord(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    try {
      const expireAt = moment().add(validation.value.exp, "seconds");
      const buffName = validation.value.name;
      const insertData = [];
      validation.value.discord_id.forEach((id) => {
        insertData.push({
          discord_id: id,
          buff_name: buffName,
          expireAt: expireAt,
        });
      });
      const createBuffs = await buff.insertMany(insertData);
      res.json(createBuffs);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

const getBuff = async (req, res, next) => {
  const buffs = await buff.find({ discord_id: req.params.id });
  if (buffs) {
    res.json(buffs);
  } else res.status(404).json("Not Found Buff");
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

module.exports = { addGateScore, addBuff, getBuff };
