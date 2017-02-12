/**
 * 项目入口文件
 * Created by lenovo on 2017/2/10.
 */
'use strict';
// 提供一个异步加载及获取实例的函数
function syncJjsImInstance(options, done) {
  done = done || function () {
    };
  var _this = this;
  if (_this._state === 'done') {
    done(null, _this._im);
  } else if (_this._state === 'init') {
    _this.cbs.push(done);
  } else {
    _this._state = 'init';
    _this.cbs.push(done);
    require('./js/components/check/check')(function (flag) {
      if (!flag) {
        if (!PRODUCTION) logger.debug('[debug] jjsim the browser is not support.');
        _this._state = 'done';
        while (_this.cbs.length > 0) {
          _this.cbs.shift()({
            errorMessage: 'browser must be ie8+'
          });
        }
      } else {
        require.ensure('./js/JJSIM', function () {
          var JJSIM = require('./js/JJSIM');
          _this._im = new JJSIM(options);
          _this._state = 'done';
          while (_this.cbs.length > 0) {
            _this.cbs.shift()(null, _this._im);
          }
        }, 'jjsim_init');
      }
    });
  }
}
module.exports = {
  _im: undefined,
  _state: undefined,
  cbs: [],
  syncJjsImInstance: syncJjsImInstance
};