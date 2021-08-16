const Joi = require('joi')

const createPlayer = (data) => {
    const schema = Joi.object({
        std_id: Joi.string().min(8).max(8).pattern(new RegExp('^[0-9]+$')).required(),
        name: Joi.string().max(256).required(),
        nickname: Joi.string().max(256).required(),
        house: Joi.string().max(16).required()
    })
    return schema.validate(data)
}

const addCoin = (data) => {
    const schema = Joi.object({
        coin: Joi.number().required(),
        event: Joi.string().max(256).required(),
        giver: Joi.string().max(256).required(),
    })
    return schema.validate(data)
}

module.exports.players = {createPlayer, addCoin}
