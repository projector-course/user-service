const Joi = require('joi');

const isName = Joi.string().required();
const isEmail = Joi.string().email().required();
const isId = Joi.number().integer().min(0).required();

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const createUserSchema = Joi.object({
  name: isName,
  email: isEmail,
  password: Joi.string().required().min(4),
});

const getUserSchema = Joi.object({
  id: isId,
});

const tokenUserSchema = Joi.object({
  id: isId,
  name: isName,
  email: isEmail,
});

module.exports = {
  createUserSchema,
  loginUserSchema,
  getUserSchema,
  tokenUserSchema,
};
