<template>
  <div style="height: 100%;">
    <swiper class="bigboxs" style="background-color: #FFFFFF;" height="74vh" :show-dots= "false">
      <swiper-item>
        <div class="bgcard bgcard1">
          <div class="title-box">
          </div>
          <div class="img-box">
            <img src="../../static/breedImg/tpinfo.png">
          </div>
          <div class="forms-box">
            <ul>
              <li @click="toReport()">
                <img src="../../static/breedImg/menu1.png">
                <span style="font-size: 12px">报表管理</span>
              </li>
              <li @click="hkInfoShow()">
                <img src="../../static/breedImg/ZB.png">
                <span style="font-size: 12px">环控数据</span>
              </li>
              <li @click="toCons()">
                <img src="../../static/breedImg/menu3.png">
                <span style="font-size: 12px">环控对比</span>
              </li>
              <li @click="checkHk()">
                <img src="../../static/breedImg/menu4.png">
                <span style="font-size: 12px">环控配置</span>
              </li>
              <li @click="hkWarnShow()">
                <img src="../../static/breedImg/menu5.png">
                <span style="font-size: 12px">警告信息</span>
              </li>
              <li @click="fhhkWarnShow()">
                <img src="../../static/breedImg/CLYS.png">
                <span style="font-size: 12px">生产录入</span>
              </li>
            </ul>
          </div>
        </div>
      </swiper-item>
    </swiper>
    <div class="weatherinfo" @click="toWeather()">
      <weather> </weather>
    </div>
  </div>
</template>

<script>
  import weather from '../components/weather'
  // import api from '../api/api'
  import whole from '../lib/whole'
  export default {
    components: { weather },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      // 报表管理
      toReport () {
        this.$router.push({ path: '/reportList' })
      },
      // 环控数据
      hkInfoShow () {
        this.$router.push({ path: '/environmentalData' })
      },
      // 环控对比
      toCons () {
        this.$router.push({ path: '/environContrast' })
      },
      // 环控配置跳转
      checkHk() {
        this.$router.push({ path: '/table' })
      },
      // 警告信息
      hkWarnShow () {
        this.$router.push({ path: '/warning' })
      },
      // 生产录入
      fhhkWarnShow () {
        this.$router.push({ path: '/productionEntry' })
      },
      // 天气列表
      toWeather () {
        this.$router.push({ path: '/weather' })
      },
      showError() {
        whole.showTop('当前功能暂未开通,敬请期待')
      },
      // 孵化环控信息
      toFhhk () {
        this.$router.push({ path: '/hatch/encontrolchioce' })
      },
      // 孵化报表管理
      toFhReport () {
        // alert(1)
        this.$router.push({ path: '/reportForms/fhselect1' })
      },
      // 种禽生产指标查看
      toProduction () {
        this.$router.push({ path: '/production/production' })
        // window.location.href = encodeURI(baseConfig.baseURL + '/production/production?dd_orientation=landscape&dd_full_screen=true')
      },
      // 种禽产量预算
      toBudget () {
        this.$router.push({ path: '/budget/budget' })
      },
      // 孵化生产指标
      toFhProduction () {
        this.$router.push({ path: '/fhproduction/fhproduction' })
      }
    }
  }
</script>

<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: content-box;
    color: #ffffff;
    font-family: PingFangSC-Regular, sans-serif;
    -webkit-user-select: none!important;
  }
  .dtinfo{
    border-top: 14px solid #f1f1f1!important;
    height:5vh;
    background-color: #fff;
    padding-bottom: 5px;
    border-bottom: 1px solid #f1f1f1!important;
  }
  .weatherinfo{
    @wh: 20vh;
    height: @wh;
    padding-top: 5px;
    background-color: #fff;
  }
  @width: 100vw;
  @height: 100vh;
  @bh:75vh / 100;
  @bh2: @bh * 94 / 100;
  .bigboxs{
    height: @bh * 96!important;
  }
  .bgcard {
    width: 86%;
    margin-left: 7%;
    height: @bh2 * 100;
    border-radius: 10px;
  }
  .bgcard1{
    background: url("../../static/breedImg/bgc.png");
  }
  .title-box{
    width: 100%;
    height: @bh2 * 5;
    line-height: @bh * 10;
    text-align: center;
    font-size: 19px;
    color: red;
  }
  .img-box {
    height: @bh2 * 60;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  /*.img-box p {*/
    /*padding-top: 20px;*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  /*}*/
  .img-box img{
    width: 60%;
  }
  @w100: 100%;
  .forms-box {
    width: 100%;
    height: @bh2 * 35;
    ul{
      width: @w100;
      height: @bh2 * 35;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      li{
        box-sizing: border-box;
        width: @w100 / 3;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          height: 24px!important;
          width: auto;
        }
        span{
          font-size: 10px;
          margin-top: 8px;
        }
      }
    }
  }
</style>
