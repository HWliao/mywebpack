/**
 * 入口
 * Created by lenovo on 2017/2/7.
 */
'use strict';
/**
 * 异步获取im实例
 * @param options
 * @param cb cb中传入参数JJSIM类型对象
 */
function syncJjsImInstance(options, cb) {
  if (!PRODUCTION) logger.debug('[debug] index get im.options:%o,cb:%o', options, cb);
  // 参数检查
  if (!(options && typeof options === 'object' && cb && typeof cb === 'function')) {
    cb({
      errorMessage: '参数错误!'
    });
  }

  // 需要依赖jquery 1.8.2,检查环境中是否存在
  if (window.jQuery && window.jQuery().jquery === '1.8.2') {
    domain();
  } else {
    require.ensure([], function () {
      require('!!script-loader!./js/vender/jquery/jquery-min');
      domain();
    }, 'jq');
  }

  function domain() {
    // 环境检查
    if (require('./js/utils/envCheck')()) {
      if (!PRODUCTION) {
        logger.debug('[debug] the browser:', require('jquery').browser);
      }
      require.ensure([], function () {
        var JJSIM = require('./js/JJSIM');
        cb(null, new JJSIM(options));
      }, 'JJSIM');

    } else {
      logger.error('the browser must be > IE8!');
    }
  }
}

exports.syncJjsImInstance = syncJjsImInstance;





