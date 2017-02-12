/**
 * 主体入口,这里将会是一个超级大的文件
 * Created by lenovo on 2017/2/10.
 */
'use strict';
// 查看环境中是否存在
if (!window.jQuery.fn.mCustomScrollbar) {
  require('../../vender/mCustomScrollbar/jquery.mCustomScrollbar.min.css');
  require('!!script-loader!../../vender/mCustomScrollbar/jquery.mCustomScrollbar.concat.min');
}


var $ = require('jquery');
var BasicComponent = require('../BasicComponent');
var mainComponent = new BasicComponent();

mainComponent.create = function (im) {

  require('../../vender/nim-sdk/Web_SDK_Base_v3.1.0');
  require('../../vender/nim-sdk/Web_SDK_NIM_v3.1.0');


  var def = $.Deferred();
  setTimeout(function () {
    mainComponent.emit('click.toLogin');
    def.resolve();
  }, 1000);
  return def.promise();
};

module.exports = mainComponent;