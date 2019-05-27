<template>
  <div>
    <div class="report_all">
      <div class="left_rep" @click="reportInfo(1)">
        <img src="../../static/report/houbeiliaoliang1.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">死淘采食对比</div>
          <div style="font-size: 6px;color: #919191">死淘采食对比图形展示</div>
        </div>
      </div>
      <div style="border-right: 1px solid #e5e5e5;margin-bottom: 5px"></div>
      <div class="left_rep" @click="reportInfo(3)">
        <img src="../../static/report/liaoliang2.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">日死淘率</div>
          <div style="font-size: 6px;color: #919191">日死淘率图形展示</div>
        </div>
      </div>
    </div>
    <div class="report_all">
      <div class="left_rep" @click="reportInfo(4)">
        <img src="../../static/report/fhimg/fuhualv1.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">日采食</div>
          <div style="font-size: 6px;color: #919191">日采食图形展示</div>
        </div>
      </div>
      <div style="border-right: 1px solid #e5e5e5;margin-bottom: 5px"></div>
      <div class="left_rep" @click="reportInfoPage(6)">
        <img src="../../static/report/tizhong1.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">周体重</div>
          <div style="font-size: 6px;color: #919191">周体重图形展示</div>
        </div>
      </div>
    </div>
    <div class="report_all">
      <div class="left_rep" @click="stBI">
        <img src="../../static/hkwarn/queren.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">死淘采食BI报表</div>
          <div style="font-size: 6px;color: #919191">死淘采食BI报表展示</div>
        </div>
      </div>
      <div style="border-right: 1px solid #e5e5e5;margin-bottom: 5px"></div>
      <div class="left_rep" @click="stRate">
        <img src="../../static/report/fhimg/jianchulv1.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">死淘率汇总</div>
          <div style="font-size: 6px;color: #919191">死淘率汇总图形展示</div>
        </div>
      </div>
    </div>
    <div class="report_all">
      <div class="left_rep" @click="slaughterDayInfo">
        <img src="../../static/report/junyundu.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">出栏日汇总</div>
          <div style="font-size: 6px;color: #919191">出栏日汇总图形展示</div>
        </div>
      </div>
      <div style="border-right: 1px solid #e5e5e5;margin-bottom: 5px"></div>
      <div class="left_rep" @click="slaughterWerks">
        <img src="../../static/production/zhongqin.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px;width: 100px">出栏鸡场汇总</div>
          <div style="font-size: 6px;color: #919191">出栏鸡场汇总图形展示</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import baseConfig from '../api/baseConfig'
  export default {
    data() {
      return {
      }
    },
    watch: {},
    created() {
    },
    methods: {
      reportInfo(val) {
        this.$router.push({ path: '/reportManage', query: { flag: val } })
      },
      // 周体重
      reportInfoPage(val) {
        this.$router.push({ path: '/weekWeight', query: { flag: val } })
      },
      // 死淘BI
      stBI () {
        window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(baseConfig.baseUrlPub + '/stBIreport?dd_orientation=landscape&dd_full_screen=true')
      },
      // 死淘率汇总
      stRate () {
        window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(baseConfig.baseUrlPub + '/stlSum?dd_orientation=landscape&dd_full_screen=true')
      },
      // 出栏日汇总
      slaughterDayInfo () {
        window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(baseConfig.baseUrlPub + '/slaughterDay?dd_orientation=landscape&dd_full_screen=true')
      },
      // 出栏鸡场汇总
      slaughterWerks () {
        window.location.href = 'dingtalk://dingtalkclient/page/link?url=' + encodeURI(baseConfig.baseUrlPub + '/slaughterWerks?dd_orientation=landscape&dd_full_screen=true')
      }
    }
  }
</script>

<style scoped lang="less">
  * {
    list-style: none;
  }
  .report_all {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
  }
  .left_rep {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 5px;
    border-bottom: 1px solid #e5e5e5;
    min-height: 50px;
    min-width: 150px;
  }
  .b_title {
    margin-left: 8px;
  }
</style>
