/**
 * 初始化ui,这里负责ui的动作
 * Created by lenovo on 2017/2/7.
 */
'use strict';
var $ = require('jquery');
require('../../style/wrap-hd.css');
var init = require('../../html/init.html');

/**
 * event:
 * click.init 初始ui组件被点击
 * method:
 * create 创建一个组件
 * destroy 销毁
 */
var initUI = new EventEmitter();

// 销毁当前初始组件
initUI.destroyUI = function () {
  if (this.state) {
    if (!PRODUCTION) logger.debug('[debug] JJSIM destroy init ui.');
    this.$init.remove();
    this.$init = undefined;
    this.state = false;
  }
};
// 创建初始组件
initUI.create = function () {
  if (this.$init) return this.$init;
  this.$init = $(init).clone();
  // 初始组件点击行为触发后续动作
  this.$init.one('click.init', function (e) {
    if (!PRODUCTION) logger.debug('[debug] JJSIM initUI emit click.init');
    initUI.$init.find('img').show();
    initUI.emit('click.init');
  });
  // 设置有效状态
  this.state = true;
  return this.$init;
};

if (!PRODUCTION) logger.debug('[debug] JJSIM initUI done.');
module.exports = initUI;

