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
        prop="werksName"
        label="鸡场"
        width="100">
      </el-table-column>
      <el-table-column
        fixed
        prop="inTime"
        label="入雏"
        width="70">
      </el-table-column>
      <el-table-column
        fixed
        prop="allRate"
        label="累计"
        width="70">
      </el-table-column>
      <el-table-column
        prop="week1"
        label="一周"
        width="70">
      </el-table-column>
      <el-table-column
        prop="week2"
        label="二周"
        width="70">
      </el-table-column>
      <el-table-column
        prop="week3"
        label="三周"
        width="70">
      </el-table-column>
      <el-table-column
        prop="week4"
        label="四周"
        width="70">
      </el-table-column>
      <el-table-column
        prop="week5"
        label="五周"
        width="70">
      </el-table-column>
      <el-table-column
        prop="week6"
        label="六周"
        width="70">
      </el-table-column>
      <el-table-column
        v-for="i in 45"
        :label="i"
        width="80">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="mjzhishu"-->
        <!--label="1"-->
        <!--width="80">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="sjzzl"-->
        <!--label="2"-->
        <!--width="80">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="sjzhishu"-->
        <!--label="3"-->
        <!--width="80">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="sjzzl"-->
        <!--label="4"-->
        <!--width="80">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="sjzzl"-->
        <!--label="2"-->
        <!--width="80">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="sjzzl"-->
        <!--label="2"-->
        <!--width="80">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="sjzzl"-->
        <!--label="2"-->
        <!--width="80">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--prop="sjzzl"-->
        <!--label="2"-->
        <!--width="80">-->
      <!--</el-table-column>-->
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
      // let date = new Date();
      // let year = date.getFullYear()
      // let month = date.getMonth() + 1
      // let day = date.getDate()
      // console.log(date);
      let params = {
        begda: '2019-03-01',
        endda: '2019-03-02'
      }
      this.iniliata(params);
    },
    methods: {
      iniliata(params) {
        let _that = this
        api.getSTHZ(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.dataResult = res.data.data.dataResult
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
