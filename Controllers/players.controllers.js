const player = require("../Models/players");

/* GET player data. */
const getPlayers = async (req, res, next) => {
  const searchQuery = new RegExp(RegExp(req.query.search || ""), "i");
  const gateQuery = new RegExp(RegExp(req.query.gate || ""), "i");
  const limit = parseInt(escape(req.query.limit)) || 10;
  const players = await player
    .find({
      $or: [
        { std_id: { $regex: searchQuery } },
        { name: { $regex: searchQuery } },
        { nickname: { $regex: searchQuery } },
      ],
      house: { $regex: gateQuery },
    })
    .select({ _id: false, __v: false })
    .limit(limit)
    .sort({ coin: -1 });
  res.json(players);
};

module.exports = { getPlayers };
