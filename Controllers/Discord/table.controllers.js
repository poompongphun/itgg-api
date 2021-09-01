const table = require("../../Models/table");
const discordValidation = require("../../Middleware/validation/discord.middleware");

const getTable = async (req, res, next) => {
  const getTable = await table.findOne({ discord_id: req.params.id });
  res.json(getTable);
};

const createTable = async (req, res, next) => {
  const validation = discordValidation.tableCasino(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    const tables = new table(validation.value);
    try {
      const createTable = await tables.save();
      res.json(createTable);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

const updateTable = async (req, res, next) => {
  const validation = discordValidation.updateTable(req.body);
  if (validation.hasOwnProperty("error"))
    return res.status(400).json(validation.error.details[0].message);
  else {
    try {
      const updateTable = await table.findOneAndUpdate(
        { discord_id: validation.value.discord_id },
        { result: validation.value.result },
        { new: true, useFindAndModify: false }
      );
      if (updateTable) res.json(updateTable);
      else res.status(404).json("Not found table");
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

const deleteTable = async (req, res, next) => {
  try {
    const delTable = await table.findOneAndDelete({
      discord_id: req.params.id,
    });
    if (delTable) res.json("Delete success");
    else res.status(404).json("Not found table");
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getTable, createTable, updateTable, deleteTable };
