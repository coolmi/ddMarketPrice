<template>
  <div>
    <div>
      <ul style="display: flex;flex-direction: row;position: fixed;background-color: aqua;width: 100%;top: 8px;font-size: 12px;z-index: -1">
        <li style="display: flex;flex-direction: column;">
          <div class="li_div" style="width: 80px">鸡场</div>
          <div v-for="(ch, index) in werksResult" :key="index">
            <div class="li_div" style="width: 80px">{{ch}}</div>
          </div>
        </li>
        <li style="display: flex;flex-direction: column;">
          <div class="li_div" style="width: 40px">鸡舍</div>
          <div v-for="(bar, index) in bartonResult" :key="index">
            <div class="li_div" style="width: 40px">{{bar}}</div>
          </div>
        </li>
        <li style="display: flex;flex-direction: row;width: 800px;">
          <div class="li_div" style="width: 10%">出栏日期</div>
          <div class="li_div" style="width: 10%">进鸡日期</div>
          <div class="li_div" style="width: 10%">进鸡只数</div>
          <div class="li_div" style="width: 6%">日龄</div>
          <div class="li_div" style="width: 10%">九块重量</div>
          <div class="li_div" style="width: 10%">九块只数</div>
          <div class="li_div" style="width: 10%">大鸡重量</div>
          <div class="li_div" style="width: 10%">大鸡只数</div>
          <div class="li_div" style="width: 10%">死鸡重量</div>
          <div class="li_div" style="width: 10%">死鸡只数</div>
          <div class="li_div" style="width: 10%">单只重量</div>
          <div class="li_div" style="width: 10%">成活率</div>
        </li>
      </ul>
      <ul style="display: flex;flex-direction: column;margin: 50px 0 0 124px;background-color: aqua;width: 100%;font-size: 12px;overflow: scroll;" >
        <li style="display: flex;flex-direction: row;width: 800px;" v-for="(obj, index) in datas" :key="index">
          <div class="li_div" style="width: 10%;">{{obj.outTime}}</div>
          <div class="li_div" style="width: 10%">{{obj.inTime}}</div>
          <div class="li_div" style="width: 10%">{{obj.inTotal}}</div>
          <div class="li_div" style="width: 6%">{{obj.daage}}</div>
          <div class="li_div" style="width: 10%">{{obj.jkzzl}}</div>
          <div class="li_div" style="width: 10%">{{obj.jkzhishu}}</div>
          <div class="li_div" style="width: 10%">{{obj.mjzzl}}</div>
          <div class="li_div" style="width: 10%">{{obj.mjzhishu}}</div>
          <div class="li_div" style="width: 10%">{{obj.sjzzl}}</div>
          <div class="li_div" style="width: 10%">{{obj.sjzhishu}}</div>
          <div class="li_div" style="width: 10%">{{obj.mjrate}}</div>
          <div class="li_div" style="width: 10%">{{obj.chrate}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  // import ding from '@/lib/ding'
  export default {
    data () {
      return {
        werksResult: [],
        bartonResult: [],
        datas: [],
        shedata: [],
        showshe: false,
        farmslist: [],
        demo4: '',
        showrl: false,
        allcheck: true,
        seltime: '',
        chang: '',
        changId: ''
      }
    },
    watch: {},
    created () {
      let params = {
        mydate: '2019-04-09'
      }
      this.iniliata(params);
    },
    methods: {
      iniliata (params) {
        let _that = this
        api.getDateCHULAN(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.werksResult = res.data.data.werksResult
            _that.bartonResult = res.data.data.bartonResult
            _that.datas = res.data.data.datas
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .li_div {
    height: 40px;
    line-height: 40px;
    border: 1px solid red;
  }
</style>
