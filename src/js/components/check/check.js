/**
 * 依赖处理,环境检查
 * Created by lenovo on 2017/2/10.
 */
'use strict';
// es5-shim 引入在es3环境构建出es5特性
require('es5-shim');

function check(done) {
  // 1.jquery检查,必须要1.8版本的jquery
  if (window.jQuery && window.jQuery().jquery && window.jQuery().jquery.indexOf('1.8') === 0) {
    if (!PRODUCTION) logger.debug('[debug] jjsim check jq is exist. the version is %s', window.jQuery().jquery);
    docheck(done);
  } else {
    if (!PRODUCTION) logger.debug('[debug] jjsim check jq is not exist.');
    require.ensure([], function () {
      require('!!script-loader!../../vender/jquery/jquery-min');
      docheck(done);
    }, 'jq');
  }
}
// 检查浏览器版本
function docheck(done) {
  var $ = require('jquery');
  done = $.isFunction(done) ? done : function () {
  };
  var version = $.browser.version ? $.browser.version.substring(0, 1) : 0;
  if (!PRODUCTION) logger.debug('[debug] jjsim check browser version. the browser version:%o', $.browser);
  // 不小于ie8
  done(!($.browser.msie && version < 8));
}
module.exports = check;