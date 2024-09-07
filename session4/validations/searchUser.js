const Joi = require("joi");
const validGenders = ["male", "female"];

const schema = Joi.object({
  gender: Joi.string().valid(...validGenders),
  age: Joi.number().integer().min(0).max(100),
}).or("gender", "age");

module.exports = schema;
