<template>
  <div>
    <el-table
      :data="dataResult"
      :stripe="showBorder"
      :border="showBorder"
      height="500"
      style="width: 100%;">
      <el-table-column
        fixed
        align="center"
        prop="werksName"
        label="鸡场"
        width="100">
      </el-table-column>
      <el-table-column
        fixed
        align="center"
        prop="inTime"
        label="入雏"
        width="70">
      </el-table-column>
      <el-table-column
        fixed
        align="center"
        prop="allRate"
        label="累计"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="week1"
        label="一周"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="week2"
        label="二周"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="week3"
        label="三周"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="week4"
        label="四周"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="week5"
        label="五周"
        width="70">
      </el-table-column>
      <el-table-column
        align="center"
        prop="week6"
        label="六周"
        width="70">
      </el-table-column>
      <el-table-column
        v-for="i in 45" :key="i"
        :prop="'daage' + i"
        :label="i + ''"
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
          <calendar v-model="starttime" title="开始日期" placeholder="请选择日期"></calendar>
          <calendar v-model="endtime" title="结束日期" placeholder="请选择日期"></calendar>
        </popup>
      </div>
    </div>
    <img src="../../static/hkwarn/searchitem.png" class="flex_img" @click="hideCheck">
  </div>
</template>

<script>
  import api from '../api/api'
  import ding from './../lib/ding'
  export default {
    data() {
      return {
        showBorder: true,
        dataResult: [],
        showrl: false,
        starttime: '',
        endtime: ''
      }
    },
    created() {
      let now = new Date();
      let yy = now.getFullYear(); // 年
      let mm = now.getMonth() + 1; // 月
      let dd = now.getDate();
      let clock = yy + '-';
      if (mm < 10) clock += '0';
      clock += mm + '-';
      if (dd < 10) clock += '0';
      clock += dd;
      this.starttime = clock;
      this.endtime = clock;
      let params = {
        begda: '',
        endda: ''
      }
      this.iniliata(params);
    },
    methods: {
      iniliata(params) {
        let _that = this
        api.getSTHZ(params, function (res) {
          console.log(res);
          if (res.data.code) {
            if (res.data.data.dataResult.length > 0) {
              _that.dataResult = res.data.data.dataResult
            } else {
              ding.showToast('暂无数据!')
            }
          }
          if (!res.data.code) {
            ding.showToast(res.data.message)
          }
        })
      },
      hideCheck() {
        this.showrl = !this.showrl
      },
      hideCheckInfo () {
        let sdate = this.starttime.replace(/-/g, '/');
        let stimestamp = new Date(sdate).getTime();
        let edate = this.endtime.replace(/-/g, '/');
        let etimestamp = new Date(edate).getTime();
        if (stimestamp > etimestamp) {
          ding.showToast('开始时间不能大于结束时间!')
          return;
        }
        if (etimestamp < stimestamp) {
          ding.showToast('结束时间不能大于开始时间!')
          return;
        }
        let params = {
          begda: this.starttime,
          endda: this.endtime
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
