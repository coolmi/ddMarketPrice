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
          title: {
            top: 10,
            text: '',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' //  默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            top: '300',
            left: '7%',
            data: []
            // right: 0,
            // width: '1%'
          },
          dataZoom: [
            {
              show: true,
              startValue: 0,
              endValue: 6,
              bottom: '57%'
            }
          ],
          grid: {
            left: '0%',
            // right: '25%',
            bottom: '64%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisLabel: { interval: 0 }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
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
            _that.option.title.text = res.data.data.title_subtext
            _that.option.legend.data = res.data.data.titles
            _that.option.xAxis[0].data = res.data.data.xAxisData
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
    /*width: 100%;*/
    margin-top: 30px;
    background-color: #f5f5f5;
    /*box-shadow:2px 2px 5px #333333;*/
  }
</style>
