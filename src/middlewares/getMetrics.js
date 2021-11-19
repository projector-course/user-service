let counter = 0;

async function getMetrics(ctx, next) {
  const time = Date.now();
  counter += 1;
  ctx.counter = counter;
  ctx.req.on('end', () => {
    ctx.time = Date.now() - time;
  });
  return next();
}

module.exports = { getMetrics };
