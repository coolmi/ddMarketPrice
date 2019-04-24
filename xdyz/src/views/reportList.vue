<template>
  <div>
    <div class="report_all">
      <div class="left_rep">
        <img src="../../static/report/sitao2.png" style="width: 35px">
        <div>
          <div style="font-size: 14px">日死淘率</div>
          <div style="font-size: 6px;color: #919191">日死淘率图形展示</div>
        </div>
      </div>
      <li style="border-right: 1px solid #e5e5e5;margin-bottom: 5px"></li>
      <li class="left_rep">
        <img src="../../static/report/sitao2.png" style="width: 35px">
        <div class="b_title">
          <div style="font-size: 14px">日死淘率</div>
          <div style="font-size: 6px;color: #919191">日死淘率图形展示</div>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
  // import api from '../api/api'
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    watch: {},
    created() {
    },
    methods: {
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
    /*display: flex;*/
    /*flex-direction: column;*/
  }
</style>
