<template>
  <div class="home_groud">
    <div style="padding: 30px 0">
      <div class="home_title">市场价格查询平台</div>
      <div class="home_title">欢迎您~</div>
    </div>
    <div style="margin: 10px auto;">
      <van-button type="info" class="home_btn" icon="chart-trending-o" size="large" round hairline to="/report">商品价格曲线图</van-button>
      <van-button type="info" class="home_btn" icon="hot-sale-o" size="large" round hairline to="/hotProduct">热销商品价格查询</van-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created: function () {
    },
    methods: {
    }
  }
</script>
<style lang="less">
  .home_groud {
    background-image: url("../../static/img/backimg.png");
    height: 100vh;
  }
  .home_btn {
    width: 70%;
    margin: 40px 0;
  }
  .home_title {
    font-size: 30px;
    color: #99CCFF;
    text-align: left;
    text-indent: 20px;
  }
</style>
<style>
  .van-button--large {
    height: 60px;
    font-size: 20px;
  }
</style>
