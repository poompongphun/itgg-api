const Joi = require('joi')

const createUsers = (data) => {
    const schema = Joi.object({
        id: Joi.string().min(8).max(8).pattern(new RegExp('^[0-9]+$')).required(),
        name: Joi.string().max(256),
        nickname: Joi.string().max(256),
        password: Joi.string().min(6).max(128),
    })
    return schema.validate(data)
}

module.exports = {createUsers}
