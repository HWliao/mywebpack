/**
 * console兼容,当存在console时使用console。不存在时使用空函数取代
 * Created by HWliao on 2017/1/8.
 */
'use strict';

var method;
var noop = function () {
};
var methods = [
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
  'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
  'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
];
var length = methods.length;
var console = (window.console = window.console || {});

while (length--) {
  method = methods[length];
  
  // Only stub undefined methods.
  if (!console[method]) {
    console[method] = noop;
  }
}

module.exports = console;