const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const getUserSchema = Joi.object({
  id: Joi.number().integer().min(0).required(),
});

module.exports = { createUserSchema, getUserSchema };
