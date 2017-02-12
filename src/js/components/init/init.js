/**
 * 组件初始状态
 * Created by lenovo on 2017/2/10.
 */
'use strict';
require('../../../style/init.css');
var initHtml = require('../../../html/init.html');

var $ = require('jquery');
var BasicComponent = require('../BasicComponent');

var initComponent = new BasicComponent();

initComponent.create = function (im) {
  var _this = this;
  if (_this._state) return;
  _this.$body = $(initHtml);
  im.$container.append(_this.$body);
  _this._state = true;
  // click init
  _this.$body.on('click.init', '.jjsim-hd', function (e) {
    if (!PRODUCTION) logger.debug('[debug] jjsim init emit click event.');
    $(e.currentTarget).hide().siblings('img').show();
    _this.emit('click.init');
  });
};

initComponent.destroy = function () {
  var _this = this;
  if (_this._state) {
    _this._state = undefined;
    _this.$body.remove();
    _this.removeAllListeners();
    if (!PRODUCTION) logger.debug('[debug] jjsim init destroyed.');
  }
};

module.exports = initComponent;