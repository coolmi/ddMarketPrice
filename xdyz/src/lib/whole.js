/**
 * Created by lzl on 17/2/14.
 */
import store from '../index'

export function showMore(flag) {
  store.dispatch('showMore', flag);
}

export function showTop(obj = {}) {
  store.dispatch('showTopMessage', true);
  store.dispatch('saveFlowError', obj);
}

/**
 *   页面正在请求
 */
export function busy() {
  store.dispatch('isLoading', true);
}

/**
 *   页面请求结束
 */
export function leave() {
  store.dispatch('isLoading', false);
}

export default {
  showMore,
  showTop,
  busy,
  leave
}
