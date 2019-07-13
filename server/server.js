const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const fs = require('fs')
const path = require('path')
const cacheControl = require('koa-cache-control')

const app = new Koa()
const router = new Router()

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

app.use(cacheControl({
    maxAge: 1000000
}));

app.listen('8099')
