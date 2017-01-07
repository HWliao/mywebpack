/**
 * 应用入口
 * Created by lenovo on 2017/1/7.
 */
'use strict';
// 根据环境引入jquery 1.8.2
//if(!window.jQuery||!window.$){
//  require.ensure('!!script-loader!./js/jquery-min',function () {
//    require('./js/common/mCustomScrollbar/jquery.mCustomScrollbar.css');
//    require('!!script-loader!./js/common/mCustomScrollbar/jquery.mCustomScrollbar.concat.min');
//  });
//}else if(!window.$.mCustomScrollbar){
//  require('./js/common/mCustomScrollbar/jquery.mCustomScrollbar.css');
//  require('!!script-loader!./js/common/mCustomScrollbar/jquery.mCustomScrollbar.concat.min');
//}
// 还是要想办法加入Promise,异步回调太难搞了



if(!window.jQuery||!window.$){
  // 这里将jq单独切分出去,因为环境中很有可能已经存在了
  require.ensure('!!script-loader!./js/vender/jquery/jquery-min',function () {

  },'jq');
}



require('./style/im/im.css');
var mainHtml = require('./html/main.html');

document.body.appendChild(mainHtml);
//require('./js/index');