/**
 * im 缓存数据
 * Created by lenovo on 2017/2/6.
 */
'use strict';
// 当前im
var _im;

/**
 * 初始化cache
 * @returns {*}
 */
function initCache() {
  var cache = {};
  cache.containerId;

  return cache;
}
/**
 * 获取cache对象
 * @param im
 * @returns {*}
 */
function cache(im) {
  if (im && !_im) {
    _im = im;
    _im._cache = initCache();
  }
  return _im.cache;
}

module.exports = cache;