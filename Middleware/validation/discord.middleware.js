const Joi = require("joi");

const registerDiscord = (data) => {
  const schema = Joi.object({
    std_id: Joi.string()
      .min(8)
      .max(8)
      .pattern(new RegExp("^[0-9]+$"))
      .required(),
    discord_id: Joi.string()
      .min(18)
      .max(18)
      .pattern(new RegExp("^[0-9]+$"))
      .required(),
    name: Joi.string().max(256).required(),
    house: Joi.string().max(16).required(),
    year: Joi.number().required(),
  });
  return schema.validate(data);
};

const addCoinDiscord = (data) => {
  const schema = Joi.array().items({
    discord_id: Joi.string()
      .min(18)
      .max(18)
      .pattern(new RegExp("^[0-9]+$"))
      .required(),
    coin: Joi.number().required(),
    event: Joi.string().max(256),
    giver: Joi.string().max(256),
  });
  return schema.validate(data);
};

const addGateCoinDiscord = (data) => {
  const schema = Joi.object({
    and: Joi.number(),
    or: Joi.number(),
    nor: Joi.number(),
    not: Joi.number(),
    event: Joi.string().max(256),
    giver: Joi.string().max(256),
  });
  return schema.validate(data);
};

const addBuffDiscord = (data) => {
  const schema = Joi.object({
    discord_id: Joi.array().items(
      Joi.string().min(18).max(18).pattern(new RegExp("^[0-9]+$"))
    ),
    name: Joi.string().max(512).required(),
    exp: Joi.number().required(),
  });
  return schema.validate(data);
};

const tableCasino = (data) => {
  const schema = Joi.object({
    discord_id: Joi.string()
      .min(18)
      .max(18)
      .pattern(new RegExp("^[0-9]+$"))
      .required(),
    bet: Joi.number().required(),
    profit: Joi.number().required(),
    result: Joi.string().max(256),
    emoji: Joi.array().items({
      icon: Joi.string().max(256),
      member: Joi.array().items(
        Joi.string().min(18).max(18).pattern(new RegExp("^[0-9]+$"))
      ),
    }),
  });
  return schema.validate(data);
};

const updateTable = (data) => {
  const schema = Joi.object({
    discord_id: Joi.string()
      .min(18)
      .max(18)
      .pattern(new RegExp("^[0-9]+$"))
      .required(),
    result: Joi.string().max(256),
  });
  return schema.validate(data);
};

module.exports = {
  registerDiscord,
  addCoinDiscord,
  addGateCoinDiscord,
  addBuffDiscord,
  tableCasino,
  updateTable,
};
