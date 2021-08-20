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
    nickname: Joi.string().max(256),
    house: Joi.string().max(16).required(),
    year: Joi.number().required(),
  });
  return schema.validate(data);
};

const addCoinDiscord = (data) => {
  const schema = Joi.object({
    discord_id: Joi.array().items(
      Joi.string().min(18).max(18).pattern(new RegExp("^[0-9]+$"))
    ),
    coin: Joi.number().required(),
    event: Joi.string().max(256),
    giver: Joi.string().max(256),
  });
  return schema.validate(data);
};

module.exports = { registerDiscord, addCoinDiscord };
