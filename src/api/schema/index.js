const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
});

const paramsSchema = Joi.object({
  id: Joi.number().integer().min(0),
});

module.exports = { createUserSchema, paramsSchema };
