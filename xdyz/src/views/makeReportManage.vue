<template>
  <div>
    <div style="background-color: #e5e5e5;height: 100vh;line-height: 50vh" v-show="show_loading">
      <inline-loading></inline-loading><span style="margin-left: 10px">{{jiazai}}</span>
    </div>
    <div class="echats_all" >
      <div id="main" style="width: 90%;height: 100vh;"></div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import ding from './../lib/ding'
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        show_loading: true,
        jiazai: '数据加载中',
        option: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            top: '400',
            left: '12%',
            data: []
          },
          grid: {
            top: '10%',
            left: '14%',
            right: '12%',
            show: 'true',
            height: '300'
          },
          xAxis: [
            {
              axisLine: {
                onZero: false
              },
              type: 'category',
              boundaryGap: true,
              data: [],
              name: '日龄'
            }
          ],
          yAxis: [],
          series: []
        }
      }
    },
    mounted() {
      this.drawLine();
    },
    watch: {
      option: {
        handler: function (val, oldval) {
          this.drawLine()
          this.show_loading = false;
        },
        deep: true
      }
    },
    created() {
      let params = this.$route.query.params
      console.log(params);
      this.initData(params);
    },
    methods: {
      // 加深
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
        // debugger
        this.sleep(1000);
        let test = echarts.init(document.getElementById('main'))
        test.setOption(this.option);
      },
      initData(params) {
        let _that = this;
        api.getTargetRepaort(params, function (res) {
          console.log(res)
          if (!res.data.code) {
            ding.showToast(res.data.message)
            setTimeout(function () {
              _that.$router.go(-1)
            }, 1000)
          }
          if (res.data.code) {
            _that.option.legend.data = res.data.data.titles
            _that.option.xAxis[0].data = res.data.data.xAxisData
            _that.option.yAxis = res.data.data.yyAxis
            _that.option.series = res.data.data.myseries
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .echats_all {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #f5f5f5;
    box-shadow:2px 2px 5px #333333;
  }
</style>
