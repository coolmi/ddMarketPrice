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
   * 获取天气情况
   * @param cb
   */
  getWeatherInfo: function (params, cb) {
    axios.post('/breed/api/v1/weather/myweather')
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取环控配置信息
   * @param cb
   */
  getFarmData: function (params, cb) {
    axios.post('/breed/api/v1/ac2000/getFarmData', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取环控配置所有场
   * @param cb
   */
  getALLFarm: function (params, cb) {
    axios.post('/breed/api/v1/batch/getALLFarm', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取环控数据(页面初始化)
   * @param cb
   */
  getEnvironment: function (params, cb) {
    axios.post('/breed/api/v1/homepage/homepageAc2000info', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 根据场拿舍(环控数据)
   * @param cb
   */
  getBartonByFarm: function (params, cb) {
    axios.post('/breed/api/v1/batch/getBartonByFarm', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 根据舍、间隔时间获取环控数据
   * @param cb
   */
  getac2000info: function (params, cb) {
    axios.post('/breed/api/v1/ac2000/ac2000info', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取所有场、指标(环控对比)
   * @param cb
   */
  getAc2000Select: function (params, cb) {
    axios.post('/breed/api/v1/ac2000/getAc2000Select', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 根据鸡场获取鸡舍
   * @param cb
   */
  getBartonByMoreFarm: function (params, cb) {
    axios.post('/breed/api/v1/organization/getBartonByMoreFarm', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 获取环控对比数据
   * @param cb
   */
  getAc2000Info: function (params, cb) {
    axios.post('/breed/api/v1/ac2000/getAc2000Info', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 环控预警列表
   * @param cb
   */
  getMyAc2000Alert: function (params, cb) {
    axios.post('/breed/api/v1/alert/getMyAc2000Alert', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 环控预警确认
   * @param cb
   */
  confirmMyAc2000AlertInfo: function (params, cb) {
    axios.post('/breed/api/v1/alert/confirmMyAc2000AlertInfo', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 天气预警列表
   * @param cb
   */
  getPushWeatherAlert: function (params, cb) {
    axios.post('/breed/api/v1/alert/getPushWeatherAlert', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * SAP警告列表
   * @param cb
   */
  getMySAPAlert: function (params, cb) {
    axios.post('/breed/api/v1/alert/getMySAPAlert', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 根据场拿批次
   * @param cb
   */
  getBatchByFarm: function (params, cb) {
    axios.post('/breed/api/v1/batch/getBatchByFarm', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 死淘采食等生成报表接口
   * @param cb
   */
  getTargetRepaort: function (params, cb) {
    axios.post('/breed/api/v1/breedproduct/getTargetRepaort', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 死淘采食BI报表
   * @param cb
   */
  getSTCSInfo: function (params, cb) {
    axios.post('/breed/api/v1/breedproduct/getSTCSInfo', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 出栏日汇总报表
   * @param cb
   */
  getDateCHULAN: function (params, cb) {
    axios.post('/breed/api/v1/breedproduct/getDateCHULAN', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 出栏鸡场汇总报表
   * @param cb
   */
  getWerksCHULAN: function (params, cb) {
    axios.post('/breed/api/v1/breedproduct/getWerksCHULAN', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 出栏鸡场汇总报表
   * @param cb
   */
  getSTHZ: function (params, cb) {
    axios.post('/breed/api/v1/breedproduct/getSTHZ', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 出栏鸡场汇总报表
   * @param cb
   */
  findOrderInfo: function (params, cb) {
    axios.post('/breed/api/v1/breedproduct/findOrderInfo', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  },
  /**
   * 出栏鸡场汇总报表
   * @param cb
   */
  saveModDailyEliInfoRecord: function (params, cb) {
    axios.post('/breed/api/v1/breedproduct/saveModDailyEliInfoRecord', params)
      .then((res) => {
        cb(res)
      }).catch((error) => {
      return Promise.reject(error)
    })
  }
}
