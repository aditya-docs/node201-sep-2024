const Joi = require("joi");

const loginValidationSchema = Joi.object({
    username: Joi.string().required(), 
    password: Joi.string().required()
})

module.exports = { loginValidationSchema }