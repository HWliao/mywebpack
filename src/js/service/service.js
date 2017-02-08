/**
 * 服务统一
 * Created by lenovo on 2017/2/7.
 */
'use strict';
/**
 * method:
 * init(options) 初始化各个服务
 */
var service = new EventEmitter();

/**
 *
 * @param options
 */
service.init = function (options) {
  if (!PRODUCTION) logger.debug('[debug] JJSIM init service.the options:%o', options);

  var _this = this;


  _this.emit('done.init', {
    sessions: [
      {
        id: 'p2p-1111',
        scene: 'p2p',
        to: '1111',
        updateTime: new Date().getTime(),
        unread: 12,
        lastMsg: {
          scene:'p2p',
          from:'1111',
          to:'1123',
          time:new Date().getTime(),
          type:'text',
          sessionId:'p2p-1111',
          test:'test112346',
          flow:'in'
        },
        msgReceiptTime: new Date().getTime()
      }, {
        id: 'p2p-1111',
        scene: 'p2p',
        to: '1111',
        updateTime: new Date().getTime(),
        unread: 12,
        lastMsg: {
          scene:'p2p',
          from:'1111',
          to:'1123',
          time:new Date().getTime(),
          type:'text',
          sessionId:'p2p-1111',
          test:'test112346',
          flow:'in'
        },
        msgReceiptTime: new Date().getTime()
      }
    ]
  });
};


module.exports = service;