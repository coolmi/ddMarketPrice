<template>
  <div>
    <div class="title_select" @click="hideCheck()">
      <span>鸡场</span>
      <span class="text_show">{{chang}}</span>
      <img src="../../static/right_arrow.png" style="width: 15px">
    </div>
    <div class="title_select" @click="checkBarton()">
      <span>鸡舍</span>
      <span class="text_show" style="white-space:normal;word-break:break-all;word-wrap:break-word;">{{she}}</span>
      <img src="../../static/right_arrow.png" style="width: 15px">
    </div>
    <div class="title_select" @click="hideCheckzb()">
      <span>指标</span>
      <span class="text_show" >{{zhib}}</span>
      <img src="../../static/right_arrow.png" style="width: 15px">
    </div>
    <div v-show="showcs" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showcs" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择鸡场</span>
              <span @click="hideCheck()" class="btn_srue">确定</span>
            </p>
          </div>
          <checker
            v-model="demo1"
            type="checkbox"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in farmslist" :key="index" v-model="item.name">{{item.name}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
    <div v-show="showjs" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showjs" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择鸡舍</span>
              <span style="font-size: 14px;background-color: aqua;border-radius: 5px;width: 45px;height: 25px;line-height: 25px;color: black" @click="checkallBarton" v-show="allcheck">全选</span>
              <span style="font-size: 14px;background-color: aqua;border-radius: 5px;width: 45px;height: 25px;line-height: 25px;color: black" @click="checkallBarton" v-show="!allcheck">反选</span>
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
    <div v-show="showzb" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showzb" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择指标</span>
              <span @click="hideCheckzb()" class="btn_srue">确定</span>
            </p>
          </div>
          <checker
            v-model="demo3"
            type="checkbox"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in zb" :key="index" v-model="item.name">{{item.name}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
    <box gap="80px 30px">
      <x-button text="生成报表" @click.native="makeReport" :gradients="['#1D62F0', '#19D5FD']"></x-button>
    </box>
  </div>
</template>

<script>
  import api from '../api/api'
  export default {
    data() {
      return {
        showcs: false,
        showjs: false,
        showzb: false,
        allcheck: true,
        demo1: '',
        demo2: '',
        demo3: '',
        chang: '',
        changId: '',
        she: '',
        sheId: '',
        zhib: '',
        zhibId: '',
        farmslist: [],
        zb: [],
        bartons: []
      }
    },
    mounted() {
    },
    watch: {
      demo1 () {
        let list = [];
        let _that = this;
        _that.chang = _that.demo1.toString()
        _that.farmslist.forEach(function (item) {
          _that.chang.split(',').forEach(function (im) {
            if (im === item.name) {
              list.push(item.id)
            }
          })
        })
        _that.changId = list.toString()
      },
      demo2 () {
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
      demo3 () {
        let list = [];
        let _that = this;
        _that.zhib = _that.demo3.toString()
        _that.zb.forEach(function (item) {
          _that.zhib.split(',').forEach(function (im) {
            if (im === item.name) {
              list.push(item.id)
            }
          })
        })
        _that.zhibId = list.toString()
      }
    },
    created() {
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
      hideCheckzb() {
        this.showzb = !this.showzb
      },
      // 全选舍功能
      checkallBarton () {
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
      // 获取场、指标
      getFarms () {
        let _that = this
        let params = {}
        api.getAc2000Select(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.farmslist = res.data.data.farms
            _that.zb = res.data.data.zb
          }
        })
      },
      // 通过场拿舍
      checkBarton () {
        let _that = this
        let params = {
          farmId: this.changId
        }
        if (params.farmId === '') {
          alert('请选择鸡场!')
          return;
        }
        api.getBartonByMoreFarm(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.bartons = res.data.data.bartons;
            _that.showjs = !_that.showjs
          }
        })
      },
      // 生成报表
      makeReport () {
        let params = {
          werks: this.changId,
          bartno: this.sheId || '',
          zb: this.zhibId
        }
        if (this.changId === '') {
          alert('场不能为空！')
          return;
        }
        if (this.zhibId === '') {
          alert('指标不能为空！')
          return;
        }
        this.$router.push({ path: '/environContrastReport', query: params })
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
  .demo4-item-selected {
    background-color: lightgreen;
    color: #fff;
  }
  .demo4-item-disabled {
    color: #999;
  }
  .checker-popup{
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
