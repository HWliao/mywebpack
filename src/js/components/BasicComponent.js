/**
 * 基础组件类
 * Created by lenovo on 2017/2/10.
 */
'use strict';
function BasicComponent() {
  EventEmitter.call(this);
}
BasicComponent.prototype = new EventEmitter();
module.exports = BasicComponent;
