/**
 * web im 主体部分,作为整个组件协调控制
 * Created by lenovo on 2017/2/7.
 */
'use strict';
var EventEmiter = require('eventemitter3');

/**
 *
 * @param options
 * @constructor
 */
function JJSIM(options) {
  // 继承envetemit
  EventEmiter.call(this);

  var _this = this;

  // 检查参数
  if (!PRODUCTION) logger.debug('[debug] JJSIM options:%o', options);

  // 初始化容器
  _this._ctrl = require('./components/container');
  // 初始化服务
  _this._service = require('./service/ ');

  _this._ctrl.init();
}
JJSIM.prototype = new EventEmiter();

module.exports = JJSIM;