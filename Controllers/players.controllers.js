const NodeCache = require("node-cache");
const scoreCache = new NodeCache({ stdTTL: 30, checkperiod: 60 });
const player = require("../Models/players");

const getGateScore = async (req, res, next) => {
  const cache = scoreCache.get(`gateScore`);
  if (cache === undefined) {
    const allPlayer = await player.aggregate([
      {
        $match: {
          $or: [
            { house: "and" },
            { house: "or" },
            { house: "nor" },
            { house: "not" },
          ],
        },
      },
      {
        $group: { _id: "$house", coin: { $sum: "$coin" }, player: { $sum: 1 } },
      },
      {
        $project: {
          _id: false,
          name: "$_id",
          coin: true,
          player: true,
        },
      },
      { $sort : { coin : -1 } }
    ]);
    scoreCache.set(`gateScore`, allPlayer);
    res.json(allPlayer);
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
