const { createUserSchema, getUserSchema } = require('../api/schema');
const { SERVICES } = require('../services/configService');

const validate = {
  post: async (ctx, next) => {
    const { request: { body } } = ctx;
    const { error } = createUserSchema.validate(body);
    if (error) ctx.throw(400, error.message);
    return next();
  },

  get: (ctx, next) => {
    const { params: { id, service } } = ctx;
    const { error } = getUserSchema.validate({ id });
    if (error) ctx.throw(400, error.message);
    if (service && !SERVICES.includes(service)) ctx.throw(404);
    return next();
  },

};

module.exports = { validate };
