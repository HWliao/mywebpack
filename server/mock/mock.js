/**
 * mock merge
 * Created by lenovo on 2017/1/6.
 */
'use strict';

const glob = require('glob');
const mockRouter = require('koa-router')();

// 找到所有mock模块,合并mock路由
let mockfiles = glob.sync('./!(mock).js', {cwd: __dirname});
mockfiles.forEach(function (file) {
  let mock = require(file);
  mockRouter.use('', mock.routes(), mock.allowedMethods());
});

module.exports = mockRouter;
