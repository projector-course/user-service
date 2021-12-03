const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
});

const paramsSchema = Joi.object({
  id: Joi.number().integer().positive(),
});

module.exports = { createUserSchema, paramsSchema };
