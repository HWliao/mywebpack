/**
 * JJSIM组件
 * Created by lenovo on 2017/2/10.
 */
'use strict';
var $ = require('jquery');
/**
 * JJSIM构造函数
 * @param options
 * @constructor
 */
function JJSIM(options) {
  if (!PRODUCTION) logger.debug('[debug] jjsim new JJSIM. the options:%o', options);
  var _this = this;
  // 非必须语句,表明继承自EventEmitter
  EventEmitter.call(_this);
  
  _this._options = $.extend({}, options);
  // 构造容器
  var container = document.createElement('div');
  container.id = 'JJSIM' + new Date().getTime();
  document.body.appendChild(container);
  _this.$container = $('#' + container.id);
  if (!PRODUCTION) logger.debug('[debug] jjsim build container. the id:%s', container.id);
  // 进入初始化状态
  gotoInit.call(_this);
}
JJSIM.prototype = new EventEmitter();
JJSIM.prototype.reset = function () {
  var _this = this;
  // todo
};
/**
 * 进入初始状态
 */
function gotoInit() {
  if (!PRODUCTION) logger.debug('[debug] jjsim go to init state.');
  var _this = this;
  _this.initComponent = require('./components/init/init');
  _this.initComponent.create(_this);
  // 监听init组件的点击事件
  // 只有init组件被点击之后,才会进行主体构建
  _this.initComponent.once('click.init', gotoMain.bind(_this));
}
/**
 * 进入主状态
 */
function gotoMain() {
  // 主体的加载和创建全部都是异步的
  if (!PRODUCTION) logger.debug('[debug] jjsim go to main state.');
  var _this = this;
  require.ensure('./components/main/main', function () {
    if (!PRODUCTION) logger.debug('[debug] jjsim main js loaded.');
    _this.mainComponent = require('./components/main/main');
    _this.mainComponent.on('error', errorHandler.bind(_this));
    // 主体构造完成,销毁init
    _this.mainComponent.create(_this).then(_this.initComponent.destroy.bind(_this.initComponent));
    // toLogin
    _this.mainComponent.on('toLogin', toLogin.bind(_this));
  }, 'jjsim_main');
}

/**
 * 触发登入
 */
function toLogin() {
  if (!PRODUCTION) logger.debug('[debug] jjsim emit toLogin event.');
  if (this._options && this._options.toLogin) this._options.toLogin();
  this.emit('toLogin');
}
/**
 * 用以异常处理
 * @param err
 */
function errorHandler(err) {
  logger.error(err);
  this.emit('error', err);
}
module.exports = JJSIM;