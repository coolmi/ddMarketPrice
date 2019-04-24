<template>
  <div>
    <div class="echats_all">
      <div id="main" style="width: 90%;height: 100vh;"></div>
      <!--<img src="../../static/bigs.png" alt="" style="height: 38px;width: 10%;margin: 10px 10px 0 0;" @click="newScreen">-->
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  // import baseConfig from '../api/baseConfig'
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/line')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    data() {
      return {
        option: {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            top: '380',
            data: []
          },
          grid: {
            show: 'true',
            height: '300'
          },
          xAxis: [{
            // type: 'category',
            // boundaryGap: true,
            data: []
          }],
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
        },
        deep: true
      }
    },
    created() {
      let params = this.$route.query
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
        api.getAc2000Info(params, function (res) {
          console.log(res)
          if (!res.data.code) {
            alert(res.data.message)
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
    width: 100%;
    margin-top: 30px;
    background-color: #f5f5f5;
    /*box-shadow:2px 2px 5px #333333;*/
  }
</style>
