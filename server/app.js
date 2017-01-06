/**
 * 开发服务器
 * Created by lenovo on 2017/1/6.
 */
'use strict';

// load native modules
const http = require('http');
const path = require('path');
const util = require('util');
const fs = require('fs');
// load 3rd modules
const koa = require('koa');
const render = require('koa-ejs');
const router = require('koa-router')();
const proxy = require('koa-proxy');

const colors = require('colors');
const open = require('open');

// load local modules
const mock = require('./mock/mock.js');
const pkg = require('../package.json');
const env = process.argv[2] || process.env.NODE_ENV;
const dev = 'production' !== env;
const viewDir = dev ? 'src' : 'assets';
const staticDir = path.resolve(__dirname, '../' + (dev ? 'src' : 'assets'));

// console style
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

// init framework
let app = koa();

// basic setting
app.name = pkg.name;
app.keys = [pkg.name, pkg.description];
app.proxy = true;

// handling error
app.on('error', function (err, ctx) {
  err.url = err.url || ctx.request.url;
  console.error(err.stack, ctx);
});

// Middleware

// handle favicon.ico
app.use(function *(next) {
  if (this.url.match(/favicon\.ico$/)) this.body = '';
  yield next;
});

// logging
app.use(function *(next) {
  console.log(this.method.info, this.url);
  yield next;
});

//router
// mock api
router.use('', mock.routes(), mock.allowedMethods());
// proxy api
router.get('/api/baidu', proxy({host: 'http://172.16.2.254'}));
// the dev static file in the root/server,setting ejs template
render(app, {
  root: __dirname,
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: true
});
router.get('/', function *() {
  yield this.render('index', {text: 'hello world!'});
});

// binding route
app.use(router.routes());
app.use(router.allowedMethods());

// start
app.listen(pkg.localServer.port, function () {
  let url = util.format('http://%s:%d', 'localhost', pkg.localServer.port);
  console.log('Listening at %s', url);
  open(url);
});


