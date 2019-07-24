const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const conditional = require('koa-conditional-get');
const etag = require('koa-etag');
const app = new Koa()
const router = new Router()


app.use(conditional());
app.use(etag());
const staticPath = '../dist'

app.use(static(
  path.join( __dirname,  staticPath)
))

router.get('*', (ctx, next) => {
  const html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  ctx.body = html;
  next()
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen('8099')
