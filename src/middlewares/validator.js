const { createUserSchema, getUserSchema } = require('../api/schema');

const validate = {
  post: async (ctx, next) => {
    const { request: { body } } = ctx;
    const { error } = createUserSchema.validate(body);
    if (error) ctx.throw(400, error.message);
    return next();
  },

  get: (ctx, next) => {
    const { params: { id } } = ctx;
    const { error } = getUserSchema.validate({ id });
    if (error) ctx.throw(400, error.message);
    return next();
  },

};

module.exports = { validate };
