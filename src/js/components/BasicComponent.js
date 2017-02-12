/**
 * 基础组件类
 * Created by lenovo on 2017/2/10.
 */
'use strict';
function noop() {
  if (!PRODUCTION) logger.debug('[debug] this is a noop function.');
}
function BasicComponent() {
  EventEmitter.call(this);
}
BasicComponent.prototype = new EventEmitter();
BasicComponent.prototype.create = noop;
BasicComponent.prototype.destroy = noop;
module.exports = BasicComponent;
