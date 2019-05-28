import axios from './axiosConfig';
import ding from '../lib/ding'

const AUTH_DINGTALKCODE = 'auth.dingtalkcode';
export default {
  /**
   * 获取JsApi参数
   * @param cb
   */
  getJsApiInfos: function (params, cb) {
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
    axios.get('/breed/api/ddtalk/miandeng/h5config?purl=' + params + '&dingtalk_code=' + dingtalkCode)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取Itcode参数
   * @param cb
   */
  getItcodeInfo: function (code, cb) {
    axios.get('/gmk-marketprice/api/ddtalk/miandeng/userid?code=' + code)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 登录
   * @param params
   * @param cb
   */
  getLogin: function (data, cb) {
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
    axios.post('/breed/dingding/pm/login?code=' + data + '&dingtalk_code=' + dingtalkCode)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 登出
   * @param params
   * @param cb
   */
  getLogout: function (cb) {
    axios.get('/app/logout')
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取登录 -- Debug模式用
   * @param params
   * @param cb
   */
  getDebugLogin: function (code, itcode, cb) {
    let dingtalkCode = ding.parseParam(window.location.href, 'dingtalk_code') || ding.getLocation(AUTH_DINGTALKCODE)
    axios.get('/dingding/es/login?code=' + code + '&debugitcode=' + itcode + '&dingtalk_code=' + dingtalkCode)
      .then((res) => {
        cb(res);
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取下拉数据
   * @param cb
   */
  getSelectData: function (cb) {
    axios.get('/gmk-marketprice/api/mpc/mpcOnlinesales/selectOptions')
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取列表数据
   * @param cb
   */
  getReportData: function (beginDate, endDate, weight, platform, merchant, product, cb) {
    axios.get('/gmk-marketprice/api/mpc/mpcOnlinesales/list2?beginDate=' + beginDate + '&endDate=' + endDate + '&weight=' + weight + '&platform=' + platform + '&merchant=' + merchant + '&product=' + product)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  }
}
