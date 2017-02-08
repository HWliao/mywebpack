/**
 * 主体容器
 * Created by lenovo on 2017/2/7.
 */
'use strict';
var $ = require('jquery');
/**
 * method
 * init 初始化
 * events
 * done.init ui初始化完成
 * click.init 初始化ui被点击
 */
var ctrl = new EventEmitter();

/**
 * 初始UI
 */
ctrl.init = function () {
  var _this = this;
  // 已经经历过初始化
  if (_this._state) return;

  _this._state = 'init';

  // 主体容器ui
  require('../../style/container.css');
  var id = 'JJSIM' + new Date().getTime();
  var container = require('../../html/container.html');
  container.id = id;
  document.body.appendChild(container);
  // 主体
  _this.$container = $(container);
  // 右侧容器
  _this.$wrap = $(container).find('#wrap').eq(0);
  // 左侧容器
  _this.$win = $(container).find('#win').eq(0);

  _this.initUI = require('./init');
  _this.$wrap.append(_this.initUI.create());

  _this.initUI.once('click.init', function () {
    if (!PRODUCTION) logger.debug('[debug] JJSIM container emit click.init');
    _this.emit('click.init');
  });
};
/**
 * 渲染右侧
 * @param data
 */
ctrl.openRightList = function (data) {
  var _this = this;

  // ui处于初始状态为第一次打开右侧面板
  if (_this._state === 'init') {
    if (!PRODUCTION) logger.debug('[debug] JJSIM init end,go to render right list.data:%o', data);
    _this._state = 'wrap.init';
    _this._state = 'wrap';
    _this.rightWrapUI = require('./rightWrap');
    _this.rightWrapUI.create();
    _this.$wrap.append(_this.rightWrapUI.$title);
    _this.$wrap.append(_this.rightWrapUI.$body);
    // 初始过程结束
    _this.initUI.destroyUI();
    _this.up();
  }
  if (!PRODUCTION) logger.debug('[debug] JJSIM update render right list.data:%o', data);
  _this.rightWrapUI.openRightList(data);
};

ctrl.up = function () {
  this.$container.find('.jjsim').removeClass('im-fold');
};
ctrl.down = function () {
  this.$container.find('.jjsim').addClass('im-fold');
};
module.exports = ctrl;



