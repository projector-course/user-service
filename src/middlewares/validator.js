const { createUserSchema, loginUserSchema, getUserSchema } = require('../api/schema');
const { SERVICES } = require('../services/configService');

const validate = {
  post: async (ctx, next) => {
    const { request: { body } } = ctx;
    const { error } = createUserSchema.validate(body);
    if (error) ctx.throw(400, error.message);
    return next();
  },

  login: async (ctx, next) => {
    const { request: { body } } = ctx;
    const { error } = loginUserSchema.validate(body);
    if (error) ctx.throw(400, error.message);
    return next();
  },

  get: async (ctx, next) => {
    const { params } = ctx;
    const { error } = getUserSchema.validate(params);
    if (error) ctx.throw(400, error.message);
    return next();
  },

  service: (ctx, next) => {
    const { params: { service } } = ctx;
    if (service && !SERVICES.includes(service)) ctx.throw(404);
    return next();
  },

};

module.exports = { validate };
