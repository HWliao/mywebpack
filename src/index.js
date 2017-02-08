/**
 * 入口
 * Created by lenovo on 2017/2/7.
 */
'use strict';


var cbs = [];
var _im, startFlag;

/**
 * 异步获取im实例,单例
 * @param options
 * @param cb cb中传入参数JJSIM类型对象
 */
function syncJjsImInstance(options, cb) {
  // 引入es5-shim,在es3环境中构造出es5特性
  require('es5-shim');
  if (!PRODUCTION) logger.debug('[debug] index get im.options:%o,cb:%o', options, cb);
  // 参数检查
  if (!(options && typeof options === 'object' && cb && typeof cb === 'function')) {
    cb({
      errorMessage: '参数错误!'
    });
  }
  // im实例已经存在,直接返回
  if (_im) {
    cb(_im);
    return;
  }
  cbs.push(cb);
  // 已经开始进行实例化了
  if (startFlag) return;

  startFlag = true;
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
    var $ = require('jquery');
    // 环境检查
    if (require('./js/utils/envCheck')()) {
      if (!PRODUCTION) {
        logger.debug('[debug] the browser:', require('jquery').browser);
      }
      var defs = [];
      // 检查jquery scroll插件是否已经存在了
      if (!window.$.fn.mCustomScrollbar) {
        defs.push(jqscroll($));
      } else {
        defs.push($.when({}));
      }
      var def = $.Deferred();
      defs.push(def);
      $.when(defs).then(function (results) {
        results[1].then(function (JJSIM) {
          _im = new JJSIM(options);
          while (cbs.length > 0) {
            cbs.shift()(null, _im);
          }
        });
      });
      require.ensure('./js/JJSIM', function () {
        def.resolve(require('./js/JJSIM'));
      }, 'JJSIM');
    } else {
      logger.error('the browser must be > IE8!');
      while (cbs.length > 0) {
        cbs.shift()({
          errorMessage: 'the browser must be > IE8!'
        });
      }
    }
  }

  /**
   * jquery scroll plugin异步引入
   * @param $
   * @returns {*}
   */
  function jqscroll($) {
    var defjs = $.Deferred();
    require.ensure('!!script-loader!./js/vender/mCustomScrollbar/jquery.mCustomScrollbar.concat.min', function () {
      require('!!script-loader!./js/vender/mCustomScrollbar/jquery.mCustomScrollbar.concat.min');
      defjs.resolve();
    }, 'jqscroll_js');
    var defcss = $.Deferred();
    require.ensure('./js/vender/mCustomScrollbar/jquery.mCustomScrollbar.min.css', function () {
      require('./js/vender/mCustomScrollbar/jquery.mCustomScrollbar.min.css');
      defcss.resolve();
    }, 'jqscroll_css');
    return $.when([defjs, defcss]);
  }
}

exports.syncJjsImInstance = syncJjsImInstance;





