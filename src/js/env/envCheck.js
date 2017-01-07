/**
 * 环境检查
 * Created by lenovo on 2017/1/7.
 */
'use strict';
// 依赖$做浏览器版本检查,
// ie8以上,第三方sdk需要
var $ = require('jquery');

// 检查版本是否为ie8以上
module.exports = function () {
  var version = $.browser.version ? $.browser.version.substring(0, 1) : 0;
  return !($.browser.msie && version < 8);
};