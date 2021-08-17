const player = require("../Models/players");

/* GET player data. */
const getPlayers = async (req, res, next) => {
  const searchQuery = req.query.search || "";
  const limit = parseInt(escape(req.query.limit)) || 10;
  const players = await player
    .find({
      $or: [
        { std_id: { $regex: new RegExp(RegExp(searchQuery), "i") } },
        { name: { $regex: new RegExp(RegExp(searchQuery), "i") } },
        { nickname: { $regex: new RegExp(RegExp(searchQuery), "i") } },
      ],
    })
    .select({ _id: false, __v: false })
    .limit(limit)
    .sort({ coin: -1 });
  res.json(players);
};

module.exports = { getPlayers };
