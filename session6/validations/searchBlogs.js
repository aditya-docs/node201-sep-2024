const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string(),
  author: Joi.string().email()
}).or("title", "author");

module.exports = schema;
