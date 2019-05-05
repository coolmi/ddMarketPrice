<template>
  <div>
    <div style="background-color: #e5e5e5;height: 100vh;line-height: 50vh" v-show="show_loading">
      <inline-loading></inline-loading><span style="margin-left: 10px">{{jiazai}}</span>
    </div>
    <div v-show="!show_loading">
      <ul style="display: flex;flex-direction: row;background-color: #BFEFFF;position: fixed;width: 98%;top: 0;">
        <li style="width: 10%"><div class="li_common">鸡场</div></li>
        <li style="width: 7%"><div class="li_common">日龄</div></li>
        <li style="width: 7%"><div class="li_common">鸡舍</div></li>
        <li style="width: 21%">
          <div class="li_common_span">死淘情况</div>
          <div class="li_common_span_min">
            <div class="span_li"><p class="p_li">{{dateobj.date1}}</p><p class="p_li">{{'(' + allst1 + ')'}}</p></div>
            <div class="span_li"><p class="p_li">{{dateobj.date2}}</p><p class="p_li">{{'(' + allst2 + ')'}}</p></div>
            <div class="span_li"><p class="p_li">差额</p><p class="p_li">{{diffallst}}</p></div>
          </div>
        </li>
        <li style="width: 42%">
          <div class="li_common_span">采食对比</div>
          <div class="li_common_span_min">
            <span class="span_li_sceond" style="width: 15%">{{dateobj.date3}}</span>
            <span class="span_li_sceond" style="width: 15%">{{dateobj.date4}}</span>
            <span class="span_li_sceond" style="width: 15%">{{dateobj.date5}}</span>
            <span class="span_li_sceond" style="width: 30%">标准耗料</span>
            <span class="span_li_sceond" style="width: 20%;">差额</span>
            <span class="span_li_sceond" style="width: 20%;">日增料</span>
          </div>
        </li>
        <li style="width: 13%">
          <div class="li_common">备注</div>
        </li>
      </ul>
      <div style="margin-top: 80px">
        <div v-for="(item, index) in shedata" :key="index" >
          <div style="display: flex;flex-direction: row;background-color: #BFEFFF;width: 100%;overflow-y: auto;" @click="viewbarton(item, index)">
            <div style="width: 10%"><div class="data_li">{{item.wetxt}}</div></div>
            <div style="width: 7%"><div class="data_li">{{item.werksdaage}}</div></div>
            <div style="width: 7%"><div class="data_li"></div></div>
            <div style="width: 21%">
              <div class="li_common_span_min" style="height: 36px;line-height: 36px">
                <span class="span_li">{{item.werksst1}}</span>
                <span class="span_li">{{item.werksst2}}</span>
                <span class="span_li">{{item.diffwerksst}}</span>
              </div>
            </div>
            <div style="width: 42%">
              <div class="li_common_span_min" style="height: 36px;line-height: 36px">
                <span class="span_li_sceond" style="width: 15%">{{item.werkscs1}}</span>
                <span class="span_li_sceond" style="width: 15%">{{item.werkscs2}}</span>
                <span class="span_li_sceond" style="width: 15%">{{item.werkscs3}}</span>
                <span class="span_li_sceond" style="width: 30%">{{item.werksbzhl}}</span>
                <span class="span_li_sceond" style="width: 20%;">{{item.werkshlce}}</span>
                <span class="span_li_sceond" style="width: 20%;">{{item.diffwerkscszl}}</span>
              </div>
            </div>
            <div style="width: 13%">
              <div class="data_li">{{item.werksbz}}</div>
            </div>
          </div>
          <div v-if="item.showshe">
            <div style="display: flex;flex-direction: row;background-color: #CDB5CD;width: 100%;overflow-y: auto;" v-for="(it, index) in item.items" :key="index">
              <div style="width: 10%"><div class="data_li">{{it.werks}}</div></div>
              <div style="width: 7%"><div class="data_li">{{it.daage}}</div></div>
              <div style="width: 7%"><div class="data_li">{{it.barton}}</div></div>
              <div style="width: 21%">
                <div class="li_common_span_min" style="height: 36px;line-height: 36px">
                  <span class="span_li">{{it.st1}}</span>
                  <span class="span_li">{{it.st2}}</span>
                  <span class="span_li">{{it.stcy}}</span>
                </div>
              </div>
              <div style="width: 42%">
                <div class="li_common_span_min" style="height: 36px;line-height: 36px">
                  <span class="span_li_sceond" style="width: 15%">{{it.cs1}}</span>
                  <span class="span_li_sceond" style="width: 15%">{{it.cs2}}</span>
                  <span class="span_li_sceond" style="width: 15%">{{it.cs3}}</span>
                  <span class="span_li_sceond" style="width: 30%">{{it.bzhl}}</span>
                  <span class="span_li_sceond" style="width: 20%;">{{it.hlce}}</span>
                  <span class="span_li_sceond" style="width: 20%;">{{it.rzl}}</span>
                </div>
              </div>
              <div style="width: 13%">
                <div class="data_li">{{it.bz}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="../../static/hkwarn/searchitem.png" class="flex_img" @click="hideCheck">
    </div>
    <div v-show="showrl" style="background-color: #ffffff;">
      <div  style="padding:10px;">
        <popup v-model="showrl" class="checker-popup">
          <div style="border-bottom: 1px solid #cccccc;">
            <p style="height: 50px;color:#888; display: flex;align-items: center;justify-content: space-between">
              <span style="font-size: 14px;color: black">选择鸡舍</span>
              <span style="font-size: 14px;background-color: aqua;border-radius: 5px;width: 45px;height: 25px;line-height: 25px;color: black" @click="checkallBarton" v-show="allcheck">全选</span>
              <span style="font-size: 14px;background-color: aqua;border-radius: 5px;width: 45px;height: 25px;line-height: 25px;color: black" @click="checkallBarton" v-show="!allcheck">反选</span>
              <span @click="hideCheckInfo" class="btn_srue">确定</span>
            </p>
          </div>
          <calendar v-model="seltime" title="日期" placeholder="请选择日期"></calendar>
          <checker
            v-model="demo4"
            type="checkbox"
            default-item-class="demo4-item"
            selected-item-class="demo4-item-selected"
            disabled-item-class="demo4-item-disabled">
            <checker-item v-for="(item, index) in farmslist" :key="index" v-model="item.name">{{item.name}}</checker-item>
          </checker>
        </popup>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/api'
  import ding from './../lib/ding'
  export default {
    data () {
      return {
        show_loading: true,
        jiazai: '数据加载中',
        allst1: '',
        allst2: '',
        diffallst: '',
        shedate: [],
        shedata: [],
        showshe: false,
        farmslist: [],
        demo4: '',
        showrl: false,
        allcheck: true,
        seltime: '',
        chang: '',
        changId: '',
        dateobj: {
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          date5: ''
        }
      }
    },
    watch: {
      demo4 () {
        let list = [];
        let listname = [];
        let _that = this;
        _that.chang = _that.demo4.toString()
        _that.farmslist.forEach(function (item) {
          listname.push(item.name)
          if (_that.demo2 === listname.toString()) {
            _that.changId = 'ALL'
          }
          _that.chang.split(',').forEach(function (im) {
            if (im === item.name) {
              list.push(item.id)
            }
          })
        })
        _that.changId = list.toString()
      }
    },
    created () {
      let now = new Date();
      let yy = now.getFullYear(); // 年
      let mm = now.getMonth() + 1; // 月
      let dd = now.getDate();
      let clock = yy + '-';
      if (mm < 10) clock += '0';
      clock += mm + '-';
      if (dd < 10) clock += '0';
      clock += dd;
      this.seltime = clock;
      let params = {
        mydate: '',
        werks: ''
      }
      this.initData(params);
      this.getFarms();
    },
    methods: {
      initData (params) {
        let _that = this
        api.getSTCSInfo(params, function (res) {
          console.log(res);
          if (res.data.code) {
            _that.allst1 = res.data.data.allst1
            _that.allst2 = res.data.data.allst2
            _that.diffallst = res.data.data.diffallst
            _that.shedate = res.data.data.date
            _that.dateobj = _that.shedate[0]
            _that.shedata = res.data.data.data
            // 增加一個屬性 showshe = false;
            // let list = []
            _that.shedata.forEach(function (item) {
              item.showshe = false;
              // list.push(item)
            })
            // _that.shedata = list
            _that.show_loading = false
          }
          if (!res.data.code) {
            ding.showToast(res.data.message)
            setTimeout(function () {
              _that.$router.go(-1)
            }, 1000)
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
          }
        })
      },
      viewbarton (item, i) {
        item.showshe = !item.showshe
        console.log(item)
        this.$set(this.shedata, i, item)
      },
      hideCheck() {
        this.showrl = !this.showrl
      },
      // 全选场功能
      checkallBarton () {
        this.allcheck = !this.allcheck
        let list = []
        this.farmslist.forEach(function (item) {
          list.push(item.name)
        })
        if (!this.allcheck) {
          this.demo4 = list.toString()
        } else {
          this.demo4 = ''
        }
      },
      hideCheckInfo () {
        let params = {
          mydate: this.seltime,
          werks: this.changId
        }
        this.show_loading = true
        console.log(params)
        this.initData(params);
        this.showrl = !this.showrl
      }
    }
  }
</script>

<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .li_common {
    height: 80px;
    line-height: 80px;
    border: 1px solid #fff;
  }
  .li_common_span {
    height: 40px;
    line-height: 40px;
    border: 1px solid #fff;
  }
  .li_common_span_min {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 39px;
    line-height: 39px;
  }
  .span_li {
    border: 1px solid #fff;
    width: 33.3%
  }
  .p_li {
    height: 19px;
    line-height: 19px;
  }
  .span_li_sceond {
    border: 1px solid #fff;
  }
  .data_li {
    height: 35px;
    line-height: 35px;
    border: 1px solid #fff;
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
  .btn_srue {
    background-color: #e5e5e5;
    width: 15%;
    border-radius: 5px;
    color: black;
    margin-right: 10px;
  }
</style>
