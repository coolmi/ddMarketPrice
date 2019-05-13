<template>
  <div>
    <div class="title_select" @click="hideCheck()">
      <span>鸡场</span>
      <span class="text_show">{{chang}}</span>
      <img src="../../static/right_arrow.png" style="width: 15px">
    </div>
    <div class="title_select" @click="checkBarton(1)">
      <span>鸡舍</span>
      <span class="text_show" style="white-space:normal;word-break:break-all;word-wrap:break-word;">{{she}}</span>
      <img src="../../static/right_arrow.png" style="width: 15px">
    </div>
    <div class="title_select" @click="checkBarton(2)">
      <span>批次</span>
      <span class="text_show">{{pici}}</span>
      <img src="../../static/right_arrow.png" style="width: 15px">
    </div>
    <div v-show="showcs" style="background-color: #ffffff;">
      <div style="padding:10px;">
        <popup v-model="showcs" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p
              style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择鸡场</span>
              <span @click="hideCheck()" class="btn_srue">确定</span>
            </p>
          </div>
          <div v-for="(per, index) in farmslist" :key="index"
               style="font-size: 20px;text-align: left;border-bottom: 1px solid #e5e5e5;">
            <span style="margin: 10px;">{{per.name}}</span>
            <checker
              v-model="demo1"
              default-item-class="demo4-item"
              selected-item-class="demo4-item-selected"
              disabled-item-class="demo4-item-disabled">
              <checker-item v-for="(item, index) in per.list" :key="index" v-model="item.name">{{item.name}}
              </checker-item>
            </checker>
          </div>
        </popup>
      </div>
    </div>
    <div v-show="showjs" style="background-color: #ffffff;">
      <div style="padding:10px;">
        <popup v-model="showjs" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p
              style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择鸡舍</span>
              <span
                style="font-size: 14px;background-color: aqua;border-radius: 5px;width: 45px;height: 25px;line-height: 25px;color: black"
                @click="checkallBarton" v-show="allcheck">全选</span>
              <span
                style="font-size: 14px;background-color: aqua;border-radius: 5px;width: 45px;height: 25px;line-height: 25px;color: black"
                @click="checkallBarton" v-show="!allcheck">反选</span>
              <span @click="hideBarton()" class="btn_srue">确定</span>
            </p>
          </div>
          <checker
            v-model="demo2"
            type="checkbox"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in bartons" :key="index" v-model="item.name">{{item.name}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
    <div v-show="showpc" style="background-color: #ffffff;">
      <div style="padding:10px;">
        <popup v-model="showpc" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p
              style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择批次</span>
              <span @click="hideCheckpc()" class="btn_srue">确定</span>
            </p>
          </div>
          <checker
            v-model="demo3"
            type="checkbox"
            default-item-class="demo4-item-pc"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in picilist" :key="index" v-model="item.name">{{item.name}}
            </checker-item>
          </checker>
        </popup>
      </div>
    </div>
    <box gap="40px 30px">
      <x-button text="生成报表" @click.native="makeReport" :gradients="['#1D62F0', '#19D5FD']"></x-button>
    </box>
  </div>
</template>

<script>
  import api from '../api/api'
  import ding from './../lib/ding'

  export default {
    data() {
      return {
        showcs: false,
        showjs: false,
        showpc: false,
        allcheck: true,
        demo1: '',
        demo2: '',
        demo3: '',
        chang: '',
        changId: '',
        she: '',
        sheId: '',
        pici: '',
        piciId: '',
        farmslist: [],
        picilist: [],
        bartons: [],
        flag: ''
      }
    },
    watch: {
      demo1() {
        let list = [];
        let _that = this;
        _that.chang = _that.demo1.toString()
        _that.farmslist.forEach(function (item) {
          item.list.forEach(function (far) {
            _that.chang.split(',').forEach(function (im) {
              if (im === far.name) {
                list.push(far.id)
              }
            })
          })
        })
        _that.changId = list.toString()
      },
      demo2() {
        let list = [];
        let listname = [];
        let _that = this;
        _that.she = _that.demo2.toString()
        _that.bartons.forEach(function (item) {
          listname.push(item.name)
          if (_that.demo2 === listname.toString()) {
            _that.sheId = 'ALL'
          }
          _that.she.split(',').forEach(function (im) {
            if (im === item.name) {
              list.push(item.id)
            }
          })
        })
        _that.sheId = list.toString()
      },
      demo3() {
        let list = [];
        let _that = this;
        _that.pici = _that.demo3.toString()
        _that.picilist.forEach(function (item) {
          _that.pici.split(',').forEach(function (im) {
            if (im === item.name) {
              list.push(item.id)
            }
          })
        })
        _that.piciId = list.toString()
      }
    },
    created() {
      this.flag = this.$route.query.flag
      this.getFarms();
    },
    methods: {
      // 关闭弹窗
      hideCheck() {
        this.showcs = !this.showcs
      },
      // 关闭弹窗
      hideBarton() {
        this.showjs = !this.showjs
      },
      // 关闭弹窗
      hideCheckpc() {
        this.showpc = !this.showpc
      },
      // 全选舍功能
      checkallBarton() {
        this.allcheck = !this.allcheck
        let list = []
        this.bartons.forEach(function (item) {
          list.push(item.name)
        })
        if (!this.allcheck) {
          this.demo2 = list.toString()
        } else {
          this.demo2 = ''
        }
      },
      // 获取场
      getFarms() {
        let _that = this
        let params = {}
        api.getAc2000Select(params, function (res) {
          console.log(res);
          let farmobj = res.data.data.farms
          if (res.data.code) {
            for (let obj in farmobj) {
              let par = {
                name: obj.substr(1),
                list: res.data.data.farms[obj]
              }
              _that.farmslist.push(par)
            }
          }
        })
      },
      // 通过场拿舍、批次
      checkBarton(val) {
        let _that = this
        let params = {
          farmId: this.changId || ''
        }
        if (params.farmId === '') {
          ding.showToast('请选择鸡场!')
          return;
        }
        if (val === 1) {
          if (params.farmId.indexOf(',') >= 0) {
            ding.showToast('鸡场数量大于1，鸡舍不允许选，请选择批次!')
            return;
          }
          api.getBartonByMoreFarm(params, function (res) {
            console.log(res);
            if (res.data.code) {
              _that.bartons = res.data.data.bartons;
              _that.showjs = !_that.showjs
            }
          })
        }
        if (val === 2) {
          api.getBatchByFarm(params, function (res) {
            console.log(res);
            if (res.data.code) {
              if (!res.data.data) {
                ding.showToast('该场下暂无批次!')
              } else {
                _that.picilist = res.data.data
                _that.showpc = !_that.showpc
              }
            }
          })
        }
      },
      // 生成报表
      makeReport() {
        let params = {
          flag: this.flag,
          werks: this.changId,
          barto: this.sheId,
          batch: this.piciId
        }
        if (this.changId === '') {
          ding.showToast('场不能为空!')
          return;
        }
        if (this.piciId === '') {
          ding.showToast('批次不能为空!')
          return;
        }
        this.$router.push({ path: '/makeReportManage', query: { params: params } })
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

  .demo4-item-pc {
    background-color: #ddd;
    color: #222;
    font-size: 14px;
    text-align: center;
    margin: @check-width2 / 6;
    padding: 5px 0;
    line-height: 18px;
    border-radius: 5px;
    width: @check-width;
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

  .checker-popup {
    min-height: 50%;
  }

  .title_select {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 50px;
    padding: 0 10px;
    font-weight: bold;
    border-bottom: 1px solid #e5e5e5;
    /*border: 1px solid red*/
  }

  .text_show {
    font-size: 9px;
    color: lawngreen;
    width: 70%;
  }

  .btn_srue {
    background-color: #e5e5e5;
    width: 15%;
    border-radius: 5px;
    color: black;
    margin-right: 10px;
  }
</style>
