/**
 * 右侧列表
 * Created by lenovo on 2017/2/8.
 */
'use strict';
require('../../style/wrap-hd.css');
require('../../style/wrap-bd.css');
require('../../style/custom-scroll-bar.css');

var wrapHd = require('../../html/wrap-hd.html');
var wrapDb = '<div>' + require('../../html/wrap-bd.html') + '</div>';

var $ = require('jquery');

/**
 * method:
 * create 创建组件
 * destroyUI 销毁组件
 * openRightList 打开并更新组件
 */
var rightWrap = new EventEmitter();

rightWrap.create = function (ctrl) {
  var _this = this;
  if (!PRODUCTION) logger.debug('[debug] JJSIM init right list.');
  if (_this.state) return this;
  _this.state = true;
  _this.$title = $(wrapHd);
  _this.$body = $(wrapDb);

  ctrl.$wrap.append(_this.$title);
  ctrl.$wrap.append(_this.$body);
  _this.$list = _this.$body.find('.jjsim-bd');
  _this.$list.mCustomScrollbar({theme: "dark"});
  // title click
  _this.$title.on('click.wrap.title', function () {
    if (!PRODUCTION) logger.debug('[debug] JJSIM wrap title clicked.');
    _this.emit('click.wrap.title');
  });
  // bd item click
  _this.$body.on('click.wrap.dbitem', '.jjsim-bd-item', function () {
    if (!PRODUCTION) logger.debug('[debug] JJSIM wrap bd-item clicked.');
    _this.emit('click.wrap.bd-item', 'team-test');
  });
  // noagent click
  _this.$body.on('click.wrap.noagent', '.jjsim-noagent p a', function () {
    if (!PRODUCTION) logger.debug('[debug] JJSIM wrap noagent clicked.');
    _this.emit('click.wrap.noagent');
  });

  return _this;
};

rightWrap.destroyUI = function () {
  if (this.state) {
    if (!PRODUCTION) logger.debug('[debug] JJSIM destroy right list.');
    this.$title.remove();
    this.$body.remove();
    this.state = undefined;
    this.removeAllListeners();
  }
};

rightWrap.openRightList = function (data) {
  // todo
  if (!this.state) return;
  if (!PRODUCTION) logger.debug('[debug] JJSIM open/update right list. data:%o', data);
};

module.exports = rightWrap;



