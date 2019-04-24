<template>
  <div>
    <el-table
      :data="werksData"
      :stripe="showBorder"
      :border="showBorder"
      height="500"
      style="width: 100%;">
      <el-table-column
        fixed
        prop="werks"
        label="鸡场"
        width="120">
      </el-table-column>
      <el-table-column
        prop="leibieWerks"
        label="鸡源性质"
        width="80">
      </el-table-column>
      <el-table-column
        prop="inTimeWerks"
        label="进鸡日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="outTimeWerks"
        label="出栏日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="inTotalWerks"
        label="进鸡只数(万)"
        width="110">
      </el-table-column>
      <el-table-column
        prop="outZZLWerks"
        label="出栏重量(吨)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="daageWerks"
        label="日龄"
        width="50">
      </el-table-column>
      <el-table-column
        prop="dzzlWerks"
        label="单只重"
        width="70">
      </el-table-column>
      <el-table-column
        prop="chlWerks"
        label="成活率"
        width="70">
      </el-table-column>
      <el-table-column
        prop="lbWerks"
        label="料比"
        width="70">
      </el-table-column>
      <el-table-column
        prop="ouzhiWerks"
        label="欧指"
        width="70">
      </el-table-column>
      <el-table-column
        prop="pfcrWerks"
        label="平方产肉量(kg)"
        width="120">
      </el-table-column>
      <el-table-column
        prop="rzzWerks"
        label="日增重(g)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="yfWerks"
        label="药费"
        width="70">
      </el-table-column>
    </el-table>
    <div v-show="showcs" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showcs" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择鸡场</span>
              <span @click="hideCheckInfo" class="btn_srue">确定</span>
            </p>
          </div>
          <checker
            v-model="demo1"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in farmslist" :key="index" v-model="item.name">{{item.name}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
    <img src="../../static/hkwarn/searchitem.png" class="flex_img" @click="hideCheck">
  </div>
</template>

<script>
  import api from '../api/api'

  export default {
    data() {
      return {
        showBorder: true,
        showcs: false,
        demo1: '',
        farmslist: [],
        chang: '',
        changId: '',
        werksData: []
      }
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
      }
    },
    created() {
      this.getFarms();
    },
    methods: {
      iniliata(params) {
        let _that = this
        api.getWerksCHULAN(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.werksData = res.data.data.werksData
          }
        })
      },
      // 获取场
      getFarms () {
        let _that = this
        let params = {}
        api.getAc2000Select(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.farmslist = res.data.data.farms
            let obj = res.data.data.farms[0]
            let params = {
              werks: obj.id
            }
            _that.iniliata(params);
          }
        })
      },
      hideCheck() {
        this.showcs = !this.showcs
      },
      hideCheckInfo () {
        let params = {
          werks: this.changId
        }
        console.log(params)
        this.iniliata(params);
        this.showcs = !this.showcs
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
  .flex_img {
    flex: 100;
    position: fixed;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 30px;
    right: 30px;
    top: 10px;
  }
  .btn_srue {
    background-color: #e5e5e5;
    width: 15%;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
    color: black;
    margin-right: 10px;
  }
</style>
