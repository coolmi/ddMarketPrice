<template>
  <div>
    <el-table
      :data="datas"
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
        fixed
        prop="barton"
        label="鸡舍"
        width="50">
      </el-table-column>
      <el-table-column
        prop="outTime"
        label="出栏日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="inTime"
        label="进鸡日期"
        width="100">
      </el-table-column>
      <el-table-column
        prop="inTotal"
        label="进鸡只数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="daage"
        label="日龄"
        width="50">
      </el-table-column>
      <el-table-column
        prop="jkzzl"
        label="九块重量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="jkzhishu"
        label="九块只数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="mjzzl"
        label="大鸡重量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="mjzhishu"
        label="大鸡只数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sjzzl"
        label="死鸡重量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="sjzhishu"
        label="死鸡只数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="mjrate"
        label="单只重量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="chrate"
        label="成活率"
        width="80">
      </el-table-column>
    </el-table>
    <div v-show="showrl" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showrl" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="padding: 5px 0 5px 20px;color:#888; display: flex;align-items: center;justify-content: flex-end;">
              <span @click="hideCheckInfo" class="btn_srue">确定</span>
            </p>
          </div>
          <calendar v-model="seltime" title="日期" placeholder="请选择日期"></calendar>
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
        datas: [],
        showrl: false,
        seltime: ''
      }
    },
    created() {
      let date = new Date();
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      console.log(date);
      let params = {
        mydate: year + '-' + month + '-' + day
      }
      this.iniliata(params);
    },
    methods: {
      iniliata(params) {
        let _that = this
        api.getDateCHULAN(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.werksResult = res.data.data.werksResult
            _that.bartonResult = res.data.data.bartonResult
            _that.datas = res.data.data.datas
          }
        })
      },
      hideCheck() {
        this.showrl = !this.showrl
      },
      hideCheckInfo () {
        let params = {
          mydate: this.seltime
        }
        this.iniliata(params);
        this.showrl = !this.showrl
      }
    }
  }
</script>
<style scoped lang="less">
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
