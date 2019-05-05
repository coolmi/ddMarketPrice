<template>
  <div>
    <div style="background-color: #e5e5e5;">
      <group label-width="5rem" label-align="left" style="box-shadow: 2px 2px 5px #B3B3B3;">
        <x-input title="鸡舍" v-model="barInfo.bartonName" text-align="center" readonly style="color: #B8B8B8"></x-input>
        <x-input title="订单编号" v-model="barInfo.batchAufnr" text-align="center" readonly style="color: #B8B8B8"></x-input>
        <x-input title="日龄" v-model="barInfo.daage" text-align="center" readonly style="color: #B8B8B8"></x-input>
        <x-input title="日期" v-model="barInfo.datum" text-align="center" readonly style="color: #B8B8B8"></x-input>
      </group>
      <group label-width="7rem" label-align="left" style="box-shadow: 2px 2px 5px #B3B3B3;">
        <x-input :title="'死亡只数(' + barInfo.fedea + ')'" v-model="deadnum" text-align="center"></x-input>
        <x-input :title="'淘汰只数(' + barInfo.feeli + ')'" v-model="outnum" text-align="center"></x-input>
        <x-textarea title="备注" placeholder="录入为负数请备注!" v-if="Number(deadnum) < 0 || Number(outnum) < 0" v-model="remarkbz" autosize></x-textarea>
      </group>
    </div>
    <div>
      <box gap="40px 30px" >
        <x-button text="保存" @click.native="savebarInfo" :gradients="['#1D62F0', '#19D5FD']"></x-button>
      </box>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import ding from './../lib/ding'
  export default {
    data() {
      return {
        datum: '',
        deadnum: '',
        outnum: '',
        remarkbz: '',
        barInfo: {
          bartonName: '',
          batchAufnr: '',
          daage: '',
          datum: '',
          feeli: '',
          fedea: ''
        }
      }
    },
    created() {
      let params = this.$route.query.params
      this.initData(params);
    },
    methods: {
      initData (params) {
        let _that = this
        console.log(JSON.stringify(params));
        api.findOrderInfo(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.barInfo = res.data.data
            let timeval = res.data.data.datum
            _that.barInfo.feeli = res.data.data.feeli
            _that.barInfo.fedea = res.data.data.fedea
            let ti = new Date(timeval);
            let y = ti.getFullYear();
            let m = ti.getMonth() + 1;
            let d = ti.getDate();
            _that.barInfo.datum = y + '-' + _that.add0(m) + '-' + _that.add0(d);
          }
        })
      },
      savebarInfo () {
        let _that = this
        let reg = /^-?\d+$/
        if (!reg.test(Number(_that.deadnum)) || _that.deadnum === '') {
          ding.showToast('请正确录入死亡只数!')
          return;
        }
        if (!reg.test(Number(_that.outnum)) || _that.outnum === '') {
          ding.showToast('请正确录入淘汰只数!')
          return;
        }
        if (Number(_that.deadnum) < 0 || Number(_that.outnum) < 0) {
          if (_that.remarkbz === '') {
            ding.showToast('录入为负数请备注!')
            return;
          }
        }
        let params = {
          batchInId: _that.barInfo.id,
          batchAufnr: _that.barInfo.batchAufnr,
          batchEarliestdate: _that.barInfo.batchEarliestdate,
          datum: _that.barInfo.datum,
          daage: _that.barInfo.daage,
          fedea: _that.deadnum,
          feeli: _that.outnum,
          remarkbz: _that.remarkbz
        }
        alert(JSON.stringify(params));
        api.saveModDailyEliInfoRecord(params, function (res) {
          console.log(res);
          if (res.data.code) {
            ding.showToast(res.data.message)
            setTimeout(function () {
              _that.$router.go(-1)
            }, 800)
          }
        })
      },
      add0(m) {
        return m < 10 ? '0' + m : m
      }
    }
  }
</script>

<style scoped lang="less">
  * {
    list-style: none;
  }
</style>
<style>
  .weui-cells:before {
    content: none;
  }
  .weui-cells:after {
    content: none;
  }
</style>
