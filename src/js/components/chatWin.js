/**
 * 聊天窗体
 * Created by lenovo on 2017/2/9.
 */
'use strict';
require('../../style/window-title.css');
require('../../style/window-bd.css');
require('../../style/custom-scroll-bar.css');

var title = require('../../html/window-title.html');
var body = require('../../html/window-bd.html');

var $ = require('jquery');

var winChat = new EventEmitter();

winChat.create = function (ctrl) {
  var _this = this;
  if (_this.state) return _this;
  if (!PRODUCTION) logger.debug('[debug] JJSIM init chat win.');
  _this.state = true;
  _this.$title = $(title);
  _this.$body = $(body);

  ctrl.$win.append(_this.$title);
  ctrl.$win.append(_this.$body);

  _this.$chatPannel = _this.$body.find('.im-wc-chat ul');
  _this.$chatPannel.mCustomScrollbar({
    theme: "dark",
    setTop: "32px",
    scrollSpeed: 30,
    callbacks: {
      onInit: chatPannelScrollToButtom.bind(_this)
    }
  });

  // click title close
  _this.$title.on('click.title.close', 'a', function () {
    if (!PRODUCTION) logger.debug('[debug] JJSIM chat win title close clicked.');
    _this.emit('click.title.close');
  });
  // click body tip close
  _this.$body.on('click.win.chat-tophint.close', '.chat-tophint a', function (e) {
    $(e.currentTarget).parent().remove();
    $(".im-wc-chat ul").css({"height": "265px", "padding-top": "0"});
    _this.$chatPannel.mCustomScrollbar('update');
  });
  // click more
  _this.$body.on('click.win.im-msg-more', '.im-msg-more a', function (e) {
    $(e.currentTarget).hide().siblings('img').show();
    if (!PRODUCTION) logger.debug('[debug] JJSIM chat win im-msg-more clicked.');
    _this.emit('click.win.im-msg-more');
  });
  // click send
  _this.$body.on('click.win.send', '.send', function (e) {

    if (!$(e.currentTarget).attr('data-disable')) {
      if (!PRODUCTION) logger.debug('[debug] JJSIM chat win send clicked.');
      $(e.currentTarget).attr('data-disable', true);
      var text = $.trim($("#im-msg-content").val());
      if (text) {
        var li = '<li class="im-msg-item im-msg-right">' +
          '<div class="msg-img">' +
          '<img src="' + require('../../images/im/person.jpg') + '">' +
          '</div>' +
          '<div class="msg-text">' +
          '<span class="text">' + text + '</span>' +
          '</div>' +
          '</li>';
        _this.$chatPannel.find('.mCSB_container').append(li);
        $("#im-msg-content").val("");
        chatPannelScrollToButtom.call(_this);
      } else {
        $(".im-errorlog").text("请输入内容");
      }
      $(e.currentTarget).removeAttr('data-disable');
    }

  });
  return _this;
};

winChat.destroyUI = function () {
  if (this.state) {
    this.$title.remove();
    this.$body.remove();
    this.state = undefined;
    this.removeAllListeners();
  }
};

/**
 * 渲染聊天窗口
 * @param data
 */
winChat.renderChatWin = function (data) {
  if (!PRODUCTION) logger.debug('[debug] JJSIM render chat win. the data:%o', data);
  chatPannelScrollToButtom.call(this);
  // todo
};
/**
 * 加载更多消息
 * @param data
 */
winChat.doMoreMsg = function (data) {
  var img = require('../../images/im/person.jpg');
  var more = '<li class="im-msg-item im-msg-right">' +
    '<div class="msg-img">' +
    '<img src="' + img + '">' +
    '</div>' +
    '<div class="msg-text">' +
    '<span class="text">这是加载的内容</span>' +
    '</div>' +
    '</li>' +
    '<li class="im-msg-item im-msg-left">' +
    '<div class="msg-img">' +
    '<img src="' + img + '">' +
    '</div>' +
    '<div class="msg-text">' +
    '<span class="text">这是加载的内容</span>' +
    '</div>' +
    '</li>';
  $(".imchat-loading").hide();
  $(".im-msg-more").after(more);
  $(".imchat-more-btn").show();
  chatPannelScrollToButtom.call(this, 'top');
};

/**
 * 滚动到指定位置,默认bottom
 */
function chatPannelScrollToButtom(position) {
  position = position || 'bottom';
  this.$chatPannel.mCustomScrollbar('scrollTo', position, {
    scrollInertia: 0
  });
}
module.exports = winChat;