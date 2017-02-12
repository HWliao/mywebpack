/**
 * 容器
 * Created by HWliao on 2017/2/12.
 */
'use strict';
require('../../../../style/container.css');
var containerHtml = require('../../../../html/container.html');
var $ = require('jquery');
var BasicComponent = require('../../BasicComponent');

var containerComponent = new BasicComponent();

containerComponent.create = function (main) {
  if (!PRODUCTION) logger.debug('[debug] jjsim main container component created.');
  this.$body = $(containerHtml);
  this.$content = this.$body.find('#content');
  main.$container.append(this.$body);
  this.down();
};

containerComponent.destroy = function () {
  if (!PRODUCTION) logger.debug('[debug] jjsim main container component destroied.');
  this.$body.remove();
  this.$body = undefined;
  this.$content = undefined;
  this.removeAllListeners();
};

containerComponent.toggle = function () {
  if (this.isUp) {
    this.down();
  } else {
    this.up();
  }
};

containerComponent.up = function () {
  this.isUp = true;
  this.$body.removeClass('im-fold');
};

containerComponent.down = function () {
  this.isUp = false;
  this.$body.addClass('im-fold');
};

module.exports = containerComponent;