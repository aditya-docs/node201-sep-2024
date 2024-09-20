const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
  fullName: Joi.string().default("").max(50),
  username: Joi.string().required().max(25),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required(),
});

module.exports = { userValidationSchema };
