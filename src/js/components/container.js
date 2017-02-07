/**
 * 主体容器
 * Created by lenovo on 2017/2/7.
 */
'use strict';
var EventEmitter = require('eventemitter3');
var $ = require('jquery');
// 主体容器ui
require('../../style/container.css');
var id = 'JJSIM' + new Date().getTime();
var container = require('../../html/container.html');
container.id = id;
document.body.appendChild(container);

var ctrl = new EventEmitter();
// 主体
ctrl.$container = $(container);
// 右侧容器
ctrl.$wrap = $(container).find('#wrap').eq(0);
// 左侧容器
ctrl.$win = $(container).find('#win').eq(0);
// 初始化UI
ctrl.init = function () {
  var _this = this;
  require.ensure([], function () {
    _this.$wrap.append(require('./init').$init);
    _this.emit('init-done');
  }, 'JJSIM-init');

};

module.exports = ctrl;



