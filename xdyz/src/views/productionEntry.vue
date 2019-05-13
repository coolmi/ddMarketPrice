<template>
  <div>
    <calendar v-model="datum" title="日期" placeholder="请选择日期" style="border-bottom: 1px solid #e5e5e5"></calendar>
    <div v-for="bar in bartons" :key="bar.id">
      <div class="she_div" @click="sheDetail(bar.id)">{{bar.name}}</div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import ding from './../lib/ding'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        farmslist: [],
        changId: '',
        bartons: [],
        datum: ''
      }
    },
    computed: {
      ...mapGetters({
        getriqi: 'getTime'
      })
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
      this.datum = this.getriqi || clock;
      this.getFarms();
      this.fanhui();
    },
    methods: {
      // 返回键
      fanhui () {
        let _that = this
        let dd = window.dd
        dd.ready(function () {
          _that.$store.dispatch('clearTime')
          dd.biz.navigation.setLeft({
            control: false,
            text: '返回', // 显示文字信息
            onSuccess: function(result) {
            },
            onFail: function() {}
          })
        });
      },
      // 获取场
      getFarms () {
        let _that = this
        let params = {}
        api.getAc2000SelectSCLR(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.farmslist = res.data.data.farms
            let obj = res.data.data.farms[0]
            _that.changId = obj.id
            let params = {
              id: _that.changId
            }
            api.getWerkByPerson(params, function (res) {
              if (res.data.code) {
                _that.bartons = res.data.data.bartons;
              } else {
                ding.showToast(res.data.message)
              }
            })
          }
        })
      },
      sheDetail (id) {
        let params = {
          farmId: this.changId,
          bartonId: id,
          datum: this.datum
        }
        this.$store.dispatch('saveTime', this.datum)
        this.$router.push({ path: '/productionEntryDetail', query: { params: params } })
      }
    }
  }
</script>

<style scoped lang="less">
  * {
    list-style: none;
  }
  .she_div {
    background-color: #99ffff;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
    color: #ff9933;
    margin: 10px 0;
    border-radius: 10px;
  }
</style>
<style>
  .vux-calendar:before {
    content: none;
  }
</style>
