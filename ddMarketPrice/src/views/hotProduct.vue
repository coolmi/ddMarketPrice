<template>
  <div>
    <div>
      <van-field
        v-model="form.platform"
        label="平台"
        placeholder="选择平台"
        input-align="center"
        readonly="readonly"
        required
        @click="platformflag = true"/>
      <van-popup v-model="platformflag" position="bottom" :overlay="true" style="height: 60%">
        <van-checkbox-group v-model="platformresult">
          <van-cell-group>
            <van-cell
              style="text-align: left"
              v-for="item in platformList"
              clickable
              :key="item.value"
              :title="item.text">
              <van-checkbox :name="item.value" style="margin-left: 150px"/>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-popup>
      <van-field
        v-model="form.merchant"
        label="商家"
        placeholder="选择商家"
        input-align="center"
        readonly="readonly"
        required
        @click="merchantflag = true"/>
      <van-popup v-model="merchantflag" position="bottom" :overlay="true" style="height: 60%">
        <van-checkbox-group v-model="merchantresult">
          <van-cell-group>
            <van-cell
              style="text-align: left"
              v-for="item in merchantList"
              clickable
              :key="item.value"
              :title="item.text">
              <van-checkbox :name="item.value" style="margin-left: 150px"/>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-popup>
      <van-field
        v-model="form.timeDate"
        placeholder="选择开始时间"
        label="开始时间"
        input-align="center"
        readonly="readonly"
        required
        @click="beginDateflag = true"/>
      <van-popup v-model="beginDateflag" label="开始时间" position="bottom" :overlay="true">
        <van-datetime-picker
          v-model="time1"
          type="date"
          :formatter="formatter"
          @cancel="canceltime"
          @confirm="confirmtime"/>
      </van-popup>
      <van-button plain type="primary" style="width: 80%;margin: 30px 0;" @click="getDatainfo">查询</van-button>
    </div>
    <div>
      <van-tabs animated v-model="active" color="#9dca70">
        <van-tab v-for="(item, index) in showList" :key="index" :title="item.title" style="background-color: #e5e5e5">
          <div v-for="(obj, index) in item.itemList" :key="index">
            <div class="div1">
              <div class="div2">
                <div class="div3" style="font-weight: bold;color: #9dca70">{{obj.title}}g</div>
                <div style="display: flex;align-items: center;font-size: 14px">
                  <span v-show="obj.price">{{obj.price}}￥</span>
                  <span>较前一日</span>
                  <span v-show="obj.rate === 0">{{obj.rate}}%</span>
                  <span v-show="obj.rate > 0" style="color: #ff0000">{{obj.rate}}%</span>
                  <span v-show="obj.rate < 0" style="color: #17b3a3">{{obj.rate}}%</span>
                  <span v-show="obj.rate > 0"><img src="../../static/img/up.png" width="20"></span>
                  <span v-show="obj.rate < 0"><img src="../../static/img/down.png" width="20"></span>
                </div>
              </div>
              <div class="l_item">
                <div class="b_title">
                  <div class="c_time" v-show="obj.avgPrice">{{obj.avgPrice}}￥</div>
                  <div style="font-size: 12px;color: #B3B3B3;font-weight: bold">平均价</div>
                </div>
                <div class="b_title">
                  <div class="c_time" v-show="obj.maxPrice">{{obj.maxPrice}}￥</div>
                  <div style="font-size: 12px;color: #B3B3B3;font-weight: bold">最高价</div>
                </div>
                <div class="b_title">
                  <div class="c_time" v-show="obj.minPrice">{{obj.minPrice}}￥</div>
                  <div style="font-size: 12px;color: #B3B3B3;font-weight: bold">最低价</div>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div v-show="showList.length > 0" class="alertinfo">备注:平均价、最高价、最低价是指本平台所有商家此规格产品的价格。</div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  function timefor (m) {
    return m < 10 ? '0' + m : m
  }
  let now = new Date()
  let year = now.getFullYear()
  let month = now.getMonth() + 1
  let day = now.getDate()
  let eetime = year + '-' + timefor(month) + '-' + timefor(day);
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  export default {
    data() {
      return {
        form: {
          platform: '苏宁生鲜',
          merchant: '凤祥',
          timeDate: eetime
        },
        time1: today,
        platformflag: false,
        merchantflag: false,
        beginDateflag: false,
        platformresult: ['001'],
        merchantresult: ['001'],
        platformList: [],
        merchantList: [],
        showList: [],
        active: 0
      }
    },
    created: function () {
      this.getSelectOptions();
    },
    watch: {
      merchantresult () {
        let str = ''
        let _that = this
        _that.merchantList.forEach(function (item) {
          _that.merchantresult.forEach(function (ii) {
            if (item.value === ii) {
              str += item.text + ','
            }
          })
        })
        _that.form.merchant = str.substr(0, str.length - 1)
        // this.form.merchant = this.merchantresult.toString()
      },
      platformresult () {
        let str = ''
        let _that = this
        _that.platformList.forEach(function (item) {
          _that.platformresult.forEach(function (ii) {
            if (item.value === ii) {
              str += item.text + ','
            }
          })
        })
        _that.form.platform = str.substr(0, str.length - 1)
        // this.form.platform = this.platformresult.toString()
      }
    },
    methods: {
      getSelectOptions() {
        let _that = this
        api.getSelectData(function (res) {
          console.log(res);
          if (res.data && res.data.code === 0) {
            res.data.merchantList.forEach(function (item) {
              item.text = item.merctname
              item.value = item.merctcode
              _that.merchantList.push(item)
            })
            res.data.platformList.forEach(function (item) {
              item.text = item.platname
              item.value = item.platcode
              _that.platformList.push(item)
            })
          }
        })
      },
      getDatainfo () {
        let params = {
          platform: this.platformresult.toString(),
          merchant: this.merchantresult.toString(),
          salesDate: this.form.timeDate
        }
        let _that = this
        api.detailShow(params, function (res) {
          console.log(res);
          if (res.data && res.data.code === 0) {
            _that.showList = res.data.showList
          }
        })
      },
      canceltime() {
        this.beginDateflag = false
      },
      confirmtime(val) {
        console.log(val, 'confirmtime');
        let shijian = new Date(val)
        let year = shijian.getFullYear()
        let month = shijian.getMonth() + 1
        let day = shijian.getDate()
        this.form.timeDate = year + '-' + this.add0(month) + '-' + this.add0(day);
        this.beginDateflag = false
      },
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      }
    }
  }
</script>
<style lang="less">
  .l_item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 60px;
  }
  .c_time {
    font-size: 16px;
    font-weight: bold;
    margin: 5px 0;
  }
  .b_title {
    padding: 20px;
  }
  .div1 {
    background-color: #fff;
    padding: 10px 0;
    border-radius: 5px;
    width: 96%;
    margin: 10px auto;
  }
  .div2 {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #f4f4f4;
    width: 96%;
    margin-left: 2%;
    padding-bottom: 3px;
  }
  .alertinfo {
    color: #3366CC;
    font-size: 10px;
    margin: 10px 2%;
    background-color: #fff;
    width: 96%;
    height: 30px;
    line-height: 30px;
  }
</style>
<style>
  .van-field__control {
    font-size: 9px;
    word-wrap: break-word;
  }
  .van-hairline--top-bottom::after {
    border: none;
  }
</style>
