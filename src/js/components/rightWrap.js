/**
 * 右侧列表
 * Created by lenovo on 2017/2/8.
 */
'use strict';
require('../../style/wrap-hd.css');
require('../../style/wrap-bd.css');
require('../../style/custom-scroll-bar.css');

var wrapHd = require('../../html/wrap-hd.html');
var wrapDb = require('../../html/wrap-bd.html');

var $ = require('jquery');

/**
 * method:
 * create 创建组件
 * destroyUI 销毁组件
 * openRightList 打开并更新组件
 */
var rightWrap = new EventEmitter();

rightWrap.create = function () {
  if (!PRODUCTION) logger.debug('[debug] JJSIM init right list.');
  if (this.state) return this;
  this.state = true;
  this.$title = $(wrapHd).clone();
  this.$body = $(wrapDb).clone();
  return this;
};

rightWrap.destroyUI = function () {
  if (this.state) {
    if (!PRODUCTION) logger.debug('[debug] JJSIM destroy right list.');
    this.$title.remove();
    this.$body.remove();
    this.state = undefined;
  }
};

rightWrap.openRightList = function (data) {
  // todo
  if (!this.state) return;
  if (!PRODUCTION) logger.debug('[debug] JJSIM open/update right list. data:%o', data);





};

module.exports = rightWrap;



