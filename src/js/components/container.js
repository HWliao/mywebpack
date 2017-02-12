/**
 * 主体容器
 * Created by lenovo on 2017/2/7.
 */
'use strict';
var $ = require('jquery');

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
  var $container = $(require('../../html/container.html'));
  $container.attr('id', id);
  $(document.body).append($container);
  // 主体
  _this.$container = $container;
  // 右侧容器
  _this.$wrap = $container.find('#wrap').eq(0);
  // 左侧容器
  _this.$win = $container.find('#win').eq(0);

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
    _this._state = 'wrap';
    _this.rightWrapUI = require('./rightWrap');
    _this.rightWrapUI.create(_this);

    // 收起/展开
    _this.rightWrapUI.on('click.wrap.title', _this.toggle.bind(_this));
    // 打开聊天面板
    _this.rightWrapUI.on('click.wrap.bd-item', _this.toOpenChat.bind(_this));
    // 登入
    _this.rightWrapUI.on('click.wrap.noagent', _this.clickNoagent.bind(_this));
    // 初始过程结束
    _this.initUI.destroyUI();
    _this.up();
  }
  if (!PRODUCTION) logger.debug('[debug] JJSIM update render right list.data:%o', data);
  _this.rightWrapUI.openRightList(data);
};

ctrl.openChat = function (data) {
  var _this = this;
  _this.$win.show();
  if (_this._state === 'wrap') {
    _this._state = 'done';
    _this.chatWin = require('./chatWin');
    _this.chatWin.create(_this);

    // 关闭
    _this.chatWin.on('click.title.close', _this.closeChatWin.bind(_this));
    // 更多消息
    _this.chatWin.on('click.win.im-msg-more', emitMsgMore.bind(_this));
    _this.chatWin.renderChatWin(data);
  } else if (_this._state === 'done') {
    _this.chatWin.renderChatWin(data);
  }

};
ctrl.doMoreMsg = function (data) {
  this.chatWin.doMoreMsg(data);
};
ctrl.closeChatWin = function () {
  this.$win.hide();
};
ctrl.toOpenChat = function (sessionId) {
  this.emit('click.wrap.bd-item', sessionId);
};
ctrl.clickNoagent = function () {
  this.emit('click.wrap.noagent');
};
ctrl.toggle = function () {
  if (this.$container.hasClass('im-fold')) {
    this.up();
  } else {
    this.down();
  }
};
ctrl.up = function () {
  this.$container.removeClass('im-fold');
};
ctrl.down = function () {
  this.closeChatWin();
  this.$container.addClass('im-fold');
};
function emitMsgMore() {
  this.emit('click.win.im-msg-more');
}
module.exports = ctrl;



