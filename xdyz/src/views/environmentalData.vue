<template>
  <div>
    <div class="top_title">
      <p class="xs_title" @click="hideCheck">
        <span style="font-weight: bold;margin-right: 5px">选舍</span>
        {{bart}}
        <img src="../../static/right_arrow.png" style="width: 15px;margin-left: 5px">
      </p>
      <p class="sj_title">
        <span style="font-weight: bold">选时间</span>
        <selector v-model="timeValue" :options="timelist" @on-change="checkBartonDataByTime"></selector>
      </p>
    </div>
    <div class="echats_all">
      <div id="main" style="width: 90%;height: 400px;margin-top: 30px"></div>
      <!--<img src="../../static/bigs.png" alt="" style="height: 38px;width: 10%;margin: 10px 10px 0 0;" @click="newScreen">-->
    </div>
    <div v-show="showcs" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showcs" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;">选择鸡场</span>
              <span @click="hideCheck()" class="btn_srue">确定</span>
            </p>
          </div>
          <checker
            v-model="demo4"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in farmslist" :key="index" v-model="item.label" @on-item-click="checkBarton(item.value)">{{item.label}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
    <div v-show="showjs" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showjs" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;">选择鸡舍</span>
              <span @click="hideBarton()" class="btn_srue">确定</span>
            </p>
          </div>
          <checker
            v-model="demo6"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in bartons" :key="index" v-model="item.label" @on-item-click="checkBartonData(item.value)">{{item.label}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import baseConfig from '../api/baseConfig'
  import ding from './../lib/ding'
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        bart: '',
        bartId: '',
        swwd: '',
        tfsp: '',
        targetWd: '',
        szq: '',
        snwd: '',
        rwl: '',
        Xtimes: '',
        min: '',
        max: '',
        YtargetWd: '',
        YmaxData: '',
        snsd: '',
        jrwd: '',
        tgwd: '',
        showcs: false,
        showjs: false,
        demo: '',
        demo4: '',
        demo6: '',
        farmslist: [],
        bartons: [],
        timelist: [{ key: '4', value: '4小时' }, { key: '6', value: '6小时' }, { key: '24', value: '24小时' }, { key: '48', value: '48小时' }],
        timeValue: '',
        option: {
          grid: {
            top: 30,
            show: 'true',
            height: '250',
            left: '12%',
            right: '10%'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            bottom: '10%',
            data: [
              { icon: 'roundRect', name: '设置温度' },
              { icon: 'roundRect', name: '平均温度' },
              { icon: 'roundRect', name: '加热温度' },
              { icon: 'roundRect', name: '室内湿度' },
              { icon: 'roundRect', name: '通风级别' }]
          },
          xAxis: {
            axisLine: {
              onZero: false
            },
            splitLine: { show: false },
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: [{
            splitLine: { show: false }, // 去除网格线
            name: '温度(℃)',
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            min: '',
            max: '',
            interval: 1
          }, {
            splitLine: { show: false }, // 去除网格线
            name: '湿度(%)',
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            boundaryGap: [0.1, 0.1]
          }],
          series: [{
            name: '设置温度',
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#2cc8c6'
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.1,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#2cc8c6' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: []
          }, {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#b8a1d6'
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.1,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#b8a1d6' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: []
          }, {
            name: '加热温度',
            type: 'line',
            yAxisIndex: 0,
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#db5149'
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.1,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#db5149' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: []
          }, {
            name: '室内湿度',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: '#8ca3ca'
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.1,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#8ca3ca' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: []
          }, {
            name: '通风级别',
            type: 'line',
            yAxisIndex: 1,
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
              normal: {
                color: 'blue'
              }
            },
            areaStyle: {
              normal: {
                opacity: 0.1,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 1, color: 'white' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            data: []
          }]
        }
      }
    },
    mounted() {
      this.drawLine()
    },
    watch: {
      option: {
        handler: function (val, oldval) {
          this.drawLine()
        },
        deep: true
      }
    },
    created() {
      let params = {}
      this.initData(params);
      this.getChiHouse();
    },
    methods: {
      // 页面初始化
      initData(params) {
        let _that = this;
        api.getEnvironment(params, function (res) {
          console.log(res)
          if (!res.data.code) {
            _that.showjs = false
            ding.showToast(res.data.message)
          }
          if (res.data.code) {
            let jsonData = res.data.data;
            _that.min = jsonData.YtargetWd[0];
            // 竖轴最高温度
            for (let m = 0; m < jsonData.YmaxData.length; m++) {
              if (_that.max < jsonData.YmaxData[m]) {
                _that.max = (Number(jsonData.YmaxData[m]) + 0.5)
              }
            }
            for (let n = 0; n < jsonData.YtargetWd.length; n++) {
              if (_that.min > jsonData.YtargetWd[n]) {
                _that.min = jsonData.YtargetWd[n] - 0.5
              }
              let dumin = _that.min
              if (jsonData.tgwd[n] === '') {
                _that.min = dumin;
              } else {
                if (_that.min > jsonData.tgwd[n]) {
                  _that.min = jsonData.tgwd[n] - 0.5
                }
              }
              if (_that.min > jsonData.YmaxData[n]) {
                _that.min = jsonData.YmaxData[n] - 0.5;
              }
              if (_that.min > jsonData.jrwd[n]) {
                _that.min = jsonData.jrwd[n] - 0.5;
              }
            }
            _that.bart = jsonData.bart;
            _that.bartId = jsonData.bartId;
            _that.timeValue = jsonData.historyTime;
            _that.swwd = jsonData.swwd;
            _that.targetWd = jsonData.targetWd;
            _that.szq = jsonData.szq;
            _that.snwd = jsonData.snwd;
            _that.rwl = jsonData.rwl;
            _that.option.xAxis.data = jsonData.Xtimes;
            _that.option.yAxis[0].min = _that.min;
            _that.option.yAxis[0].max = _that.max;
            _that.option.series[0].data = jsonData.YtargetWd;
            _that.option.series[1].data = jsonData.YmaxData;
            _that.option.series[2].data = jsonData.jrwd;
            _that.option.series[3].data = jsonData.snsd;
            _that.option.series[4].data = jsonData.tfsp;
            _that.tgwd = jsonData.tgwd;
            _that.demo = jsonData.tgwdFlag;
          }
        })
      },
      // 延迟时间
      async sleep(time) {
        return new Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve()
          }, time)
        })
      },
      /**
       *echats初始化
       */
      drawLine() {
        this.sleep(1000);
        let test = echarts.init(document.getElementById('main'))
        test.setOption(this.option);
      },
      /**
       *放大
       */
      newScreen () {
        window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(baseConfig.baseURL + '/monthwd?dd_orientation=landscape&dd_full_screen=true&bartno=' + this.bart)
      },
      // 关闭弹窗
      hideCheck() {
        this.showcs = !this.showcs
      },
      // 关闭弹窗
      hideBarton() {
        this.showjs = !this.showjs
      },
      // 获取鸡场列表
      getChiHouse (data) {
        let _that = this;
        api.getALLFarm(data, function (res) {
          console.log(res)
          if (res.data.code) {
            _that.farmslist = res.data.data.farms
          }
        })
      },
      // 获取鸡舍列表
      checkBarton(value1) {
        let _that = this
        let params = {
          id: value1
        }
        if (!this.disabled) {
          this.showcs = false
        }
        api.getBartonByFarm(params, function (res) {
          console.log(res);
          if (res.data.code) {
            if (res.data.data.bartons.length > 0) {
              _that.bartons = res.data.data.bartons
              _that.showjs = true
            }
          }
        })
      },
      // 根据舍、间隔时间拿环控数据
      checkBartonData(val) {
        let params = {
          bartno: val,
          historyTime: this.timeValue
        }
        this.bartonDataInfo(params);
      },
      // 间隔时间变化拿环控数据
      checkBartonDataByTime () {
        let params = {
          bartno: this.bartId,
          historyTime: this.timeValue
        }
        this.bartonDataInfo(params);
      },
      /**
       * 环控数据初始化
       * @param params
       */
      bartonDataInfo (params) {
        let _that = this
        api.getac2000info(params, function (res) {
          console.log(res)
          if (!res.data.code) {
            _that.showjs = false
            ding.showToast(res.data.message)
          }
          if (res.data.code) {
            _that.showjs = false
            let jsonData = res.data.data;
            _that.min = jsonData.YtargetWd[0];
            // 竖轴最高温度
            for (let m = 0; m < jsonData.YmaxData.length; m++) {
              if (_that.max < jsonData.YmaxData[m]) {
                _that.max = (Number(jsonData.YmaxData[m]) + 0.5)
              }
            }
            for (let n = 0; n < jsonData.YtargetWd.length; n++) {
              if (_that.min > jsonData.YtargetWd[n]) {
                _that.min = jsonData.YtargetWd[n] - 0.5
              }
              let dumin = _that.min
              if (jsonData.tgwd[n] === '') {
                _that.min = dumin;
              } else {
                if (_that.min > jsonData.tgwd[n]) {
                  _that.min = jsonData.tgwd[n] - 0.5
                }
              }
              if (_that.min > jsonData.YmaxData[n]) {
                _that.min = jsonData.YmaxData[n] - 0.5;
              }
              if (_that.min > jsonData.jrwd[n]) {
                _that.min = jsonData.jrwd[n] - 0.5;
              }
            }
            _that.bart = jsonData.bart;
            _that.bartId = jsonData.bartId;
            _that.timeValue = jsonData.historyTime;
            _that.swwd = jsonData.swwd;
            _that.targetWd = jsonData.targetWd;
            _that.szq = jsonData.szq;
            _that.snwd = jsonData.snwd;
            _that.rwl = jsonData.rwl;
            _that.option.xAxis.data = jsonData.Xtimes;
            _that.option.yAxis[0].min = _that.min;
            _that.option.yAxis[0].max = _that.max;
            _that.option.series[0].data = jsonData.YtargetWd;
            _that.option.series[1].data = jsonData.YmaxData;
            _that.option.series[2].data = jsonData.jrwd;
            _that.option.series[3].data = jsonData.snsd;
            _that.option.series[4].data = jsonData.tfsp;
            _that.tgwd = jsonData.tgwd;
            _that.demo = jsonData.tgwdFlag;
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @check-width: 90vw;
  @check-width2: 10vw;
  .demo4-item {
    background-color: #ddd;
    color: #222;
    font-size: 14px;
    text-align: center;
    margin: @check-width2 / 6;
    padding: 5px 0;
    line-height: 18px;
    border-radius: 5px;
    width: @check-width / 3;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .demo4-item-selected {
    background-color: lightgreen;
    color: #fff;
  }
  .demo4-item-disabled {
    color: #999;
  }
  .checker-popup{
    min-height: 50%;
  }
  .top_title {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 35px;
    width: 100%;
  }
  .xs_title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sj_title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .echats_all {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
    background-color: #f5f5f5;
    box-shadow:2px 2px 5px #333333;
  }
  .btn_srue {
    background-color: #e5e5e5;
    width: 15%;
    border-radius: 5px;
    color: black;
    margin-right: 10px;
  }
</style>
<style>
  .weui-cell_select:before {
    border: none;
  }
</style>
