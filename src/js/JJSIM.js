/**
 * web im 主体部分,作为整个组件协调控制
 * Created by lenovo on 2017/2/7.
 */
'use strict';
var $ = require('jquery');

/**
 *
 * @param options
 * @constructor
 */
function JJSIM(options) {
  // 继承envetemit,非必须代码,用来说明继承
  EventEmitter.call(this);

  var _this = this;

  // 检查参数
  if (!PRODUCTION) logger.debug('[debug] JJSIM instance. options:%o', options);
  // 参数
  _this._options = $.extend({}, options);
  // 数据缓存
  _this._cache = {};
  // ui容器组件
  _this._ctrl = require('./components/container');
  // service组件
  _this._service = require('./service/service');

  // 初始组件被点击,开启im控件
  _this._ctrl.on('click.init', initService.bind(_this));
  // 服务初始化完成
  _this._service.on('done.init', renderRight.bind(_this));

  // 渲染初始UI组件
  _this._ctrl.init();
}
JJSIM.prototype = new EventEmitter();

/**
 * 重置im,恢复到初始状态
 * @param options
 */
JJSIM.prototype.reset = function (options) {
  // todo
};

/**
 * 初始化服务
 */
function initService() {
  var _this = this;
  _this._service.init(_this._options);
}

/**
 * 渲染右侧列表
 */
function renderRight(sessions) {
  var _this = this;
  _this._ctrl.openRightList(sessions);
}

module.exports = JJSIM;