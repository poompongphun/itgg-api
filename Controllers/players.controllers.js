const player = require("../Models/players");

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

module.exports = { getPlayers };
