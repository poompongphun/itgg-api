const NodeCache = require("node-cache");
const scoreCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
const player = require("../Models/players");

const getGateScore = async (req, res, next) => {
  const cache = scoreCache.get(`gateScore`);
  if (cache === undefined) {
    const allPlayer = await player.find();
    const gate = [
      { name: "and", coin: 0, player: 0 },
      { name: "or", coin: 0, player: 0 },
      { name: "nor", coin: 0, player: 0 },
      { name: "not", coin: 0, player: 0 },
    ];
    allPlayer.forEach((player) => {
      if (player.house == "and") {
        gate[0].coin += player.coin;
        gate[0].player += 1;
      } else if (player.house == "or") {
        gate[1].coin += player.coin;
        gate[1].player += 1;
      } else if (player.house == "nor") {
        gate[2].coin += player.coin;
        gate[2].player += 1;
      } else if (player.house == "not") {
        gate[3].coin += player.coin;
        gate[3].player += 1;
      }
    });
    scoreCache.set(`gateScore`, gate);
    res.json(gate);
  } else res.json(cache);
};

/* GET player data. */
const getPlayers = async (req, res, next) => {
  const searchQuery = new RegExp(RegExp(req.query.search || ""), "i");
  const gateQuery = req.query.gate || "";
  const limit = parseInt(escape(req.query.limit)) || 10;
  const or = [
    { std_id: { $regex: searchQuery } },
    { name: { $regex: searchQuery } },
    { discord_id: { $regex: searchQuery } },
  ];
  const query =
    req.query.gate !== undefined
      ? {
          $or: or,
          house: gateQuery,
        }
      : {
          $or: or,
        };
  const players = await player
    .find(query)
    .select({ _id: false, __v: false })
    .limit(limit)
    .sort({ coin: -1 });
  res.json(players);
};

module.exports = { getGateScore, getPlayers };
