/**
 * 主要逻辑
 * Created by HWliao on 2017/1/8.
 */
'use strict';
var $ = require('jquery');
// 载入并执行jq scroll插件
require('../vender/mCustomScrollbar/jquery.mCustomScrollbar.min.css');
require('!!script-loader!../vender/mCustomScrollbar/jquery.mCustomScrollbar.concat.min');
require('../../style/im/im.css');
var mainHtml = require('../../html/main.html');
$(document.body).append(mainHtml);

var personImg = require('../../images/im/person.jpg');
var isLogin = true;
/* 如果已经登录 */
if (isLogin) {
  $(".jjsim-noagent").hide();
  $(".jjsim-service").hide();
  $(".jjsim-list").show();
}
//if (isIE7) {
//  $(".jjsim-shandow").css("width", "237px");
//}
/* 展开、收起咨询经纪人 */
$(".jjsim-hd").click(function () {
  $(".jjsim").toggleClass("im-fold");
  $(".jjsim-window").hide();
//  if (isIE7) {
//    $(".jjsim-shandow").css("width", "237px");
//  }
});

/*  */
$(".jjsim-list").on("click", ".jjsim-bd-item", function () {
  $(".jjsim-window").show();
//  if (isIE7) {
//    $(".jjsim-shandow").css("width", "618px");
//  }
});

/* 关闭聊天窗口 */
$(".im-wt-closebtn").click(function () {
  $(".jjsim-window").hide();
//  if (isIE7) {
//    $(".jjsim-shandow").css("width", "237px");
//  }
});

/* 关闭时间提示 */
$(".chat-tophint-closebtn").click(function () {
  $(this).parent().remove();
  $(".im-wc-chat ul").css({"height": "265px", "padding-top": "0"});
});

/* 添加滚动条事件 */
$(".jjsim-bd").mCustomScrollbar({theme: "dark"});
$(".im-wc-chat ul").mCustomScrollbar({
  theme: "dark",
  setTop: "32px",
  scrollSpeed: 30,
  callbacks: {
    onInit: function () {
      $(".im-wc-chat ul").mCustomScrollbar("scrollTo", "bottom", {
        scrollInertia: 1
      });
    }
  }
});

$(".imchat-more-btn").click(function () {
  $(this).hide();
  $(".imchat-loading").show();
  // 请求查看更多
  setTimeout(function () {
    var more = '<li class="im-msg-item im-msg-right">' +
      '<div class="msg-img">' +
      '<img src="' + personImg + '">' +
      '</div>' +
      '<div class="msg-text">' +
      '<span class="text">这是加载的内容</span>' +
      '</div>' +
      '</li>' +
      '<li class="im-msg-item im-msg-left">' +
      '<div class="msg-img">' +
      '<img src="' + personImg + '">' +
      '</div>' +
      '<div class="msg-text">' +
      '<span class="text">这是加载的内容</span>' +
      '</div>' +
      '</li>';
    $(".imchat-loading").hide();
    $(".im-msg-more").after(more);
    $(".imchat-more-btn").show();
  }, 3000);
});

/* 发送信息内容 */
$(".send").click(function () {
  var text = $.trim($("#im-msg-content").val());
  if (text) {
    var li = '<li class="im-msg-item im-msg-right">' +
      '<div class="msg-img">' +
      '<img src="' + personImg + '">' +
      '</div>' +
      '<div class="msg-text">' +
      '<span class="text">' + text + '</span>' +
      '</div>' +
      '</li>';
    $(".im-chat-content .mCSB_container").append(li);
    $("#im-msg-content").val("");
    $(".im-wc-chat ul").mCustomScrollbar("scrollTo", "bottom", {
      scrollInertia: 10
    });
  } else {
    $(".im-errorlog").text("请输入内容");
  }
});







