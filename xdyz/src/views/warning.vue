<template>
  <div>
    <group>
      <div style="height:44px;">
        <sticky
          :check-sticky-support="scroll"
          :disabled="disabled">
          <tab :line-width="1" v-model="demoIndex" style="">
            <tab-item selected @on-item-click="tianwarning">天气预警</tab-item>
            <tab-item @on-item-click="huanwarning">环控预警</tab-item>
            <tab-item @on-item-click="sapwarning">SAP警告</tab-item>
          </tab>
        </sticky>
      </div>
      <div v-if="demoIndex === 0 && tianlist.length > 0">
        <div class="ul_all" v-for="info in tianlist" :key="info.id" @click="getaltInfo(info.altInfo)">
          <div class="li_content">
            <div class="li_title">{{info.alttype | gettitle}}</div>
            <div style="display: flex;justify-content: space-between;font-size: 8px">
              <span style="margin: 0 3px;color: #808080">{{info.reciveTime}}</span>
              <span
                style="margin: 0 3px;color: #3CC4C4">{{info.werks + '-' + info.barton + '鸡舍-' + info.daage + '日龄'}}</span>
            </div>
          </div>
          <div class="btn_info" @click="srueInfo(info.id)">确定</div>
        </div>
      </div>
      <div v-show="demoIndex === 0 && shownone" style="height: 50px;line-height: 50px;">暂无数据</div>
      <div v-if="demoIndex === 1 && huanlist.length > 0">
        <div class="ul_all" v-for="info in huanlist" :key="info.id" v-show="info.confirmFlag === '0'"
             @click="getaltInfo(info.altInfo)">
          <div class="li_content">
            <div class="li_title">{{info.alttype | gettitle}}</div>
            <div style="display: flex;justify-content: space-between;font-size: 8px">
              <span style="margin: 0 3px;color: #808080">{{info.reciveTime}}</span>
              <span
                style="margin: 0 3px;color: #3CC4C4">{{info.werks + '-' + info.barton + '鸡舍-' + info.daage + '日龄'}}</span>
            </div>
          </div>
          <div class="btn_info" @click="srueInfo(info.id)">确定</div>
        </div>
      </div>
      <div v-show="demoIndex === 1 && shownone" style="height: 50px;line-height: 50px;">暂无数据</div>
      <div v-if="demoIndex === 2 && asplist.length > 0">
        <div class="ul_all" v-for="info in asplist" :key="info.id">
          <div class="li_content">
            <div class="li_title" style="margin-left: -10px">{{info.werks + '-' + info.barton + '鸡舍'}}</div>
            <div style="display: flex;justify-content: space-between;font-size: 8px">
              <span style="margin: 0 3px;color: #808080">{{info.reciveTime | getLocalTime}}</span>
              <span style="margin: 0 3px;color: #3CC4C4">{{info.aufnr}}</span>
            </div>
          </div>
          <div class="btn_info" @click="getaltInfo(info.altInfo)">查看</div>
        </div>
      </div>
      <div v-show="demoIndex === 2 && shownone" style="height: 50px;line-height: 50px;">暂无数据</div>
    </group>
  </div>
</template>

<script>
  import api from '../api/api'
  import ding from './../lib/ding'
  export default {
    data() {
      return {
        scroll: false,
        demoIndex: 0,
        huanlist: [],
        shownone: true,
        tianlist: [],
        asplist: [],
        disabled: typeof navigator !== 'undefined' && /iphone/i.test(navigator.userAgent) && /ucbrowser/i.test(navigator.userAgent)
      }
    },
    filters: {
      gettitle(val) {
        if (val === 'A001') {
          return `舍外温度变化`
        }
        if (val === 'A002') {
          return `舍外湿度变化`
        }
        if (val === 'B001') {
          return `舍内温度同比`
        }
        if (val === 'B002') {
          return `舍内湿度同比`
        }
        if (val === 'B003') {
          return `舍内饮水同比`
        }
        if (val === 'B004') {
          return `舍内投料同比`
        }
        if (val === 'B005') {
          return `舍内通风级别同比`
        }
        if (val === 'C001') {
          return `舍内环控温度`
        }
      },
      getLocalTime(time) {
        function add0(m) {
          return m < 10 ? '0' + m : m
        }
        let val = new Date(time)
        let y = val.getFullYear();
        let m = val.getMonth() + 1;
        let d = val.getDate();
        let h = val.getHours();
        let mm = val.getMinutes();
        let s = val.getSeconds();
        return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
      }
    },
    created() {
      this.tianwarning();
    },
    methods: {
      // 天气预警列表信息
      tianwarning() {
        let _that = this
        let params = {
          pageNumber: 0,
          pageSize: 1000
        }
        api.getPushWeatherAlert(params, function (res) {
          console.log(res);
          if (res.data.code) {
            if (!res.data.data.list) {
              _that.shownone = true
            } else {
              _that.tianlist = res.data.data.list
              _that.shownone = false
            }
          }
        })
      },
      // 环控预警列表信息
      huanwarning() {
        let _that = this
        let params = {
          pageNumber: 0,
          pageSize: 10000
        }
        api.getMyAc2000Alert(params, function (res) {
          console.log(res)
          if (res.data.code) {
            if (!res.data.data.list) {
              _that.shownone = true
            } else {
              _that.huanlist = res.data.data.list
              _that.huanlist.every(function (item) {
                if (item.confirmFlag === '0') {
                  _that.shownone = false
                }
              })
            }
          }
        })
      },
      // 环控提示信息
      getaltInfo(info) {
        ding.showToast(info)
      },
      // 确认环控信息
      srueInfo(id) {
        console.log(id);
        let params = {
          id: id
        }
        api.confirmMyAc2000AlertInfo(params, function (res) {
          console.log(res);
          if (res.data.code) {
            ding.showToast(res.data.message)
          }
        })
        this.huanwarning();
      },
      // sap警告列表信息
      sapwarning() {
        let _that = this
        let params = {
          pageNumber: 0,
          pageSize: 1000
        }
        api.getMySAPAlert(params, function (res) {
          console.log(res)
          if (res.data.code) {
            if (!res.data.data.list) {
              _that.shownone = true
            } else {
              _that.asplist = res.data.data.list
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .ul_all {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-bottom: 1px solid #e5e5e5;
    min-height: 50px;
  }
  .li_content {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }
  .li_title {
    font-size: 15px;
    color: black;
    font-weight: bold;
    margin-left: -85px
  }
  .btn_info {
    background-color: #BBBBBB;
    width: 12%;
    height: 25px;
    line-height: 25px;
    border-radius: 10px;
    color: #FFFF66;
    font-size: 15px;
    margin-right: 15px
  }
</style>
