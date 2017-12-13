const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const fs = require('fs');
const path = require('path');


const app = new Koa();
const router = new Router();
const static_dir = serve(path.join(__dirname, 'dist'));

app.use(static_dir);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

router
  .get('/', async (ctx, next) => {
    // ctx.router available
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./dist/index.html');
  })
  .get('/test', async (ctx, next) => {
    // ctx.router available
    ctx.body = 'this is test url';
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);