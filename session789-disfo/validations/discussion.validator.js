const Joi = require("joi");

const commentValidationSchema = Joi.object().keys({
  author: Joi.string().required(),
  content: Joi.string().required().max(500),
});

const discussionValidationSchema = Joi.object().keys({
  title: Joi.string().required().max(150),
  author: Joi.string().required(),
  content: Joi.string().default(""),
  comments: Joi.array().items(commentValidationSchema),
});

module.exports = { discussionValidationSchema, commentValidationSchema };
