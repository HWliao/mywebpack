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

function domain() {
  var check = require('./js/env/envCheck');
  if (check()) {
    require('./style/im/im.css');
    var mainHtml = require('./html/main.html');
    $(document.body).append(mainHtml);
    require('./js/main/main');
  } else {
    logger.error('the browser must be > IE8!');
  }
}
// 判断是否引入jquery，以及jquery是否为指定版本
if (window.jQuery && window.jQuery().jquery === '1.8.2') {
  domain();
} else {
  // 这里将jq单独切分出去, 因为环境中很有可能已经存在了
  require.ensure('!!script-loader!./js/vender/jquery/jquery-min', function () {
    require('!!script-loader!./js/vender/jquery/jquery-min');
    domain();
  }, 'jq');
}
