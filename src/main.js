/**
 * 应用入口
 * Created by lenovo on 2017/1/7.
 */
'use strict';

/**
 *
 * @param options
 * @constructor
 */
function JJSIM(options) {
  var im = this;
  // 判断是否引入jquery，以及jquery是否为指定版本
  if (window.jQuery && window.jQuery().jquery === '1.8.2') {
    domain(im);
  } else {
    // 这里将jq单独切分出去, 因为环境中很有可能已经存在了
    require.ensure('!!script-loader!./js/vender/jquery/jquery-min', function () {
      require('!!script-loader!./js/vender/jquery/jquery-min');
      domain(im);
    }, 'jq');
  }
}

function domain(im) {
  // 环境检查
  var check = require('./js/utils/envCheck');
  if (check()) {
    require.ensure(['./js/init/index', './js/service/cache'], function () {
      // 初始化数据缓存
      require('./js/service/cache')(im);
      // 初始ui
      require('./js/init/index');
    }, 'im_init');
  } else {
    logger.error('the browser must be > IE8!');
  }
}
module.exports = JJSIM;