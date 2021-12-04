const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(0).required(),
});

module.exports = { createUserSchema, paramsSchema };
