/**
 * list
 * Created by lenovo on 2017/1/6.
 */
'use strict';

const listRouter = require('koa-router')();

let list = [
  {
    id: 1,
    name: 'leo'
  }, {
    id: 2,
    name: 'lhw'
  }
];

listRouter.get('/api/list', function *(next) {
  this.body = {
    code: 200,
    data: list
  };
});

module.exports = listRouter;
