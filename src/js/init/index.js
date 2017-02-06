/**
 * web_im初始化
 * Created by lenovo on 2017/2/6.
 */
'use strict';
if(!PRODUCTION)logger.debug('init ...');
var $ = require('jquery');

// 初始化容器
var id = 'JJSIM' + new Date().getTime();
require('../../style/container.css');
var container = require('../../html/container.html');
container.id = id;
$(document.body).append(container);
// 初始组件引入
// 初始sdk引入
// sdk初始化
