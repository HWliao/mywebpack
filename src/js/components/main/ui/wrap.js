/** 右侧列表
 * Created by HWliao on 2017/2/12.
 */
'use strict';
require('../../../../style/wrap.css');
require('../../../../style/custom-scroll-bar.css');
var wrapHtml = require('../../../../html/wrap.html');
var $ = require('jquery');
var BasicComponent = require('../../BasicComponent');
var wrapComponent = new BasicComponent();

wrapComponent.create = function (main) {
  if (!PRODUCTION) logger.debug('[debug] jjsim main wrap component created.');
  this.$body = $(wrapHtml);
  main.containerComponent.$content.append(this.$body);
  // title click
  this.$body.on('click.wrap.title', '.jjsim-hd', clickTitle.bind(this));
  // body list item click
  this.$body.on('click.wrap.bodyItem', '.jjsim-bd-item', clickBodyItem.bind(this));
  // noagent click
  this.$body.on('click.wrap.noagent', '.jjsim-noagent', clickNoagent.bind(this));
};

wrapComponent.destroy = function () {
  if (!PRODUCTION) logger.debug('[debug] jjsim main wrap component destroied.');
  this.$body.remove();
  this.$body = undefined;
  this.removeAllListeners();
};

wrapComponent.up = function () {
  this.isUp = true;
  this.emit('wrap.toggle', this.isUp);
  this.$body.find('.jjsim-hd a').attr('title', '收起');
};
wrapComponent.down = function () {
  this.isUp = false;
  this.emit('wrap.toggle', this.isUp);
  this.$body.find('.jjsim-hd a').attr('title', '展开');
};
function clickTitle() {
  if (!PRODUCTION) logger.debug('[debug] jjsim main wrap title emit click.   wrap.toggle');
  this.isUp ? this.down() : this.up();
}
function clickBodyItem() {
  if (!PRODUCTION) logger.debug('[debug] jjsim main wrap body item emit click.  wrap.openChat');
  this.emit('wrap.openChat', 'p2p-123106');
}
function clickNoagent() {
  if (!PRODUCTION) logger.debug('[debug] jjsim main wrap noagent emit click.  wrap.toLogin');
  this.emit('wrap.toLogin');
}
module.exports = wrapComponent;

