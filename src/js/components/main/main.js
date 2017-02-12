/**
 * 主体入口,这里将会是一个超级大的文件
 * Created by lenovo on 2017/2/10.
 */
'use strict';
// 主容器
var containerComponent = require('./ui/container');
// wrap列表组件
var wrapComponent = require('./ui/wrap');
// win聊天窗口组件
var winComponent = require('./ui/win');
// 云信sdk service组件
var linkComponent = require('./service/sdkLink');
// 外部输入处理service组件
var outinComponent = require('./service/outin');


var $ = require('jquery');
var BasicComponent = require('../BasicComponent');
var mainComponent = new BasicComponent();

mainComponent.create = function (im) {
  var _this = this;
  // 立即成功
  if (_this._state) return $.when();
  if (!PRODUCTION) logger.debug('[debug] jjsim main to creating.');
  _this._state = 'loading';
  _this.$container = im.$container;
  _this.containerComponent = containerComponent;
  _this.wrapComponent = wrapComponent;
  _this.winComponent = winComponent;
  _this.linkComponent = linkComponent;
  _this.outinComponent = outinComponent;
  
  
  var def = $.Deferred();
  // 加载插件
  loadJqScrollPlugin().then(function () {
    // 创建各个组件
    return $.when.apply($, [
      containerComponent.create(_this),
      wrapComponent.create(_this),
      winComponent.create(_this),
      linkComponent.create(_this),
      outinComponent.create(_this)
    ]);
  }).then(function () {
    if (!PRODUCTION) logger.debug('[debug] jjsim main sub component created return.arguments:%o', arguments);
    if (!PRODUCTION) logger.debug('[debug] jjsim main created.');
    initUIComponents.call(_this);
    handlerEvents.call(_this);
    def.resolve();
  });
  return def.promise();
};

mainComponent.destroy = function () {
  var _this = this;
  if (_this._state) {
    _this._state = undefined;
    _this.removeAllListeners();
  }
};
/**
 * 处理各个子节点emit出来的事件
 */
function handlerEvents() {
  var _this = this;
  // 展开/收起
  _this.wrapComponent.on('wrap.toggle', toggle.bind(_this));
  // 打开聊天窗口
  _this.wrapComponent.on('wrap.openChat', function (sessionId) {
    logger.log(sessionId);
  });
  // toLogin
  _this.wrapComponent.on('wrap.toLogin', toLogin.bind(_this));
  
}
function toLogin() {
  this.emit('toLogin');
}
function toggle(isUp) {
  isUp ? this.containerComponent.up() : this.containerComponent.down();
}
/**
 * 初始化ui
 */
function initUIComponents() {
  if (!PRODUCTION) logger.debug('[debug] jjsim main to init ui components.');
  //todo
}
/**
 * 加载jq滚动插件
 * @return {*}
 */
function loadJqScrollPlugin() {
  var def = $.Deferred();
  if (!$.fn.mCustomScrollbar) {
    require.ensure([], function () {
      require('../../vender/mCustomScrollbar/jquery.mCustomScrollbar.min.css');
      require('!!script-loader!../../vender/mCustomScrollbar/jquery.mCustomScrollbar.concat.min');
      def.resolve();
    }, 'jq_scrroll');
  } else {
    def.resolve();
  }
  return def.promise();
}
module.exports = mainComponent;