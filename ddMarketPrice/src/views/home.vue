<template>
  <div class="mod-demo-echarts">
    <el-form :inline="true" :model="dataForm" ref="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-col :span="11">
          <el-select v-model="dataForm.product" multiple placeholder="商品">
            <el-option v-for="item in productList" :key="item.prodcode" :label="item.prodname"
                       :value="item.prodcode"></el-option>
          </el-select>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-select v-model="dataForm.merchant" multiple placeholder="商家">
            <el-option v-for="item in merchantList" :key="item.merctcode" :label="item.merctname"
                       :value="item.merctcode"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-select v-model="dataForm.weight" multiple placeholder="规格">
            <el-option v-for="item in specificationList" :key="item.speccode" :label="item.specname"
                       :value="item.speccode"></el-option>
          </el-select>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-select v-model="dataForm.platform" multiple placeholder="平台">
            <el-option v-for="item in platformList" :key="item.platcode" :label="item.platname"
                       :value="item.platcode"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-date-picker v-model="dataForm.beginDate" type="date" placeholder="开始日期" clearable
                          style="width: 100%"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker v-model="dataForm.endDate" type="date" placeholder="结束日期" clearable
                          style="width: 100%"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
          <el-select v-model="dataForm.priceType" multiple placeholder="价格类型">
            <el-option v-for="item in priceTypeList" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()" style="color: #fff;background-color: #66CCCC">查询</el-button>
      </el-form-item>
    </el-form>

    <el-tabs>
      <el-tab-pane label="价格折线图">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card>
              <div id="J_chartLineBox" class="chart-box"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>

      <el-tab-pane label="累计销量柱状图">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-card>
              <div id="J_chartBarBox" class="chart-box"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import Highcharts from 'highcharts'
  import api from '../api/api'

  let now = new Date()
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let lastWeekTime = today.getTime() - 7 * 24 * 60 * 60 * 1000
  let lastWeek = new Date(lastWeekTime)

  export default {
    data() {
      return {
        dataForm: {
          beginDate: lastWeek,
          endDate: today,
          platform: '',
          merchant: '',
          product: '',
          weight: ''
        },
        activeName: 'first',
        productList: [],
        merchantList: [],
        specificationList: [],
        platformList: [],
        chartLine: null,
        priceTypeList: [{ value: '1', label: '平台价格' }, { value: '2', label: '活动价格' }],
        dataRule: {
          product: [{ required: true, message: '商品不能为空', trigger: 'blur' }]
        }
      }
    },
    created: function () {
      this.getSelectOptions()
    },
    methods: {
      // 获取数据列表
      getDataList() {
        let _that = this
        let dd = window.dd;
        if (_that.dataForm.beginDate > _that.dataForm.endDate) {
          dd.device.notification.toast({
            icon: '', // icon样式，有success和error，默认为空
            text: '开始日期不能大于结束日期', // 提示信息
            duration: 2, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
            delay: 0, // 延迟显示，单位秒，默认0
            onSuccess: function (result) {
            },
            onFail: function (err) {
            }
          })
          return;
        }
        if (_that.dataForm.product.length === 0) {
          dd.device.notification.toast({
            icon: '', // icon样式，有success和error，默认为空
            text: '商品不能为空', // 提示信息
            duration: 2, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
            delay: 0, // 延迟显示，单位秒，默认0
            onSuccess: function (result) {
            },
            onFail: function (err) {
            }
          })
          return;
        }
        let beginDate = _that.dataForm.beginDate.getFullYear() + '-' + (_that.dataForm.beginDate.getMonth() + 1) + '-' + _that.dataForm.beginDate.getDate()
        let endDate = _that.dataForm.endDate.getFullYear() + '-' + (_that.dataForm.endDate.getMonth() + 1) + '-' + _that.dataForm.endDate.getDate()
        let weight = _that.dataForm.weight.toString()
        let platform = _that.dataForm.platform.toString()
        let merchant = _that.dataForm.merchant.toString()
        let product = _that.dataForm.product.toString()
        api.getReportData(beginDate, endDate, weight, platform, merchant, product, function (res) {
          console.log(res);
          if (res.data && res.data.code === 0) {
            if (res.data.legendData.length === 0 || res.data.list.length === 0) {
              _that.chartLine = Highcharts.chart(document.getElementById('J_chartLineBox'), {
                'title': {
                  'text': '暂无数据'
                }
              })
              _that.chartLine = Highcharts.chart(document.getElementById('J_chartBarBox'), {
                'title': {
                  'text': '暂无数据'
                }
              })
            } else {
              _that.initChartLine(res.data)
              _that.initChartBar(res.data)
            }
          } else {
            _that.chartLine = Highcharts.chart(document.getElementById('J_chartLineBox'), {
              'title': {
                'text': '暂无数据'
              }
            })
            _that.chartLine = Highcharts.chart(document.getElementById('J_chartBarBox'), {
              'title': {
                'text': '暂无数据'
              }
            })
          }
        })
      },
      getSelectOptions() {
        let _that = this
        api.getSelectData(function (res) {
          console.log(res);
          if (res.data && res.data.code === 0) {
            _that.productList = res.data.productList
            _that.merchantList = res.data.merchantList
            _that.specificationList = res.data.specificationList
            _that.platformList = res.data.platformList
          }
        })
      },
      initChartLine (data) {
        let seriesData = []
        for (let i = 0; i < data.legendData.length; i++) {
          let legend = data.legendData[i]
          let lineList = data.reportList[legend]
          let priceType = this.dataForm.priceType
          priceType = priceType === '' ? '1' : priceType
          if (priceType.concat('1')) {
            let lineShowDataArr = []
            for (let j = 0; j < lineList.length; j++) {
              let name = ''
              if (lineList[j].salePromotion != null && lineList[j].salePromotion !== '') {
                name = name + '活动方式：' + lineList[j].salePromotion + ';<br>';
              }
              if (lineList[j].mark != null && lineList[j].mark !== '') {
                name = name + '备注：' + lineList[j].mark + ';';
              }
              if (lineList[j].pricePerKg != null && lineList[j].pricePerKg !== '') {
                lineShowDataArr.push({
                  x: this.stringToDate(lineList[j].salesDate),
                  y: lineList[j].pricePerKg,
                  name: name
                })
              }
            }
            if (lineShowDataArr.length > 0) {
              seriesData.push({
                'name': legend + '-' + '平台价格',
                'data': lineShowDataArr
              })
            }
          }
          if (priceType.concat('2')) {
            let lineShowDataArr = []
            for (let j = 0; j < lineList.length; j++) {
              let name = ''
              if (lineList[j].salePromotion != null && lineList[j].salePromotion !== '') {
                name = name + '活动方式：' + lineList[j].salePromotion + ';<br>';
              }
              if (lineList[j].mark != null && lineList[j].mark !== '') {
                name = name + '备注：' + lineList[j].mark + ';';
              }
              if (lineList[j].promotionPricePerKg != null && lineList[j].promotionPricePerKg !== '') {
                lineShowDataArr.push({
                  x: this.stringToDate(lineList[j].salesDate),
                  y: lineList[j].promotionPricePerKg,
                  name: name
                })
              }
            }
            if (lineShowDataArr.length > 0) {
              seriesData.push({
                'name': legend + '-' + '活动价格',
                'data': lineShowDataArr
              })
            }
          }
        }
        let option = {
          chart: {
            type: 'spline'
          },
          'title': {
            'text': '价格跟踪折线图'
          },
          'legend': {
            'data': data.legendData
          },
          tooltip: {
            headerFormat: '<b>{ series.name }</b>{ this.series.mark }<br>',
            // pointFormat: '{point.x:%Y-%m-%d}: ￥{point.y:.2f}<br> {point.name}'
            pointFormatter: function() {
              let xDate = new Date(this.x)
              let html = xDate.getFullYear() + '-' + (xDate.getMonth() + 1) + '-' + xDate.getDate() + ' ￥' + this.y
              if (this.name != null) {
                html = html + '<br>' + this.name
              }
              return html
            }
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '3%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
              'saveAsImage': { }
            }
          },
          'xAxis': {
            'type': 'datetime',
            dateTimeLabelFormats: {
              day: '%Y-%m-%d'
            },
            title: {
              text: '日期'
            },
            softMin: Date.UTC(this.dataForm.beginDate.getFullYear(), this.dataForm.beginDate.getMonth(), this.dataForm.beginDate.getDate()),
            softMax: Date.UTC(this.dataForm.endDate.getFullYear(), this.dataForm.beginDate.getMonth(), this.dataForm.beginDate.getDate())
          },
          'yAxis': {
            title: {
              text: '价格'
            },
            min: 0
          },
          'series': seriesData
        }
        this.chartLine = Highcharts.chart(document.getElementById('J_chartLineBox'), option)
        // window.addEventListener('resize', () => {
        //   this.chartLine.resize()
        // })
      },
      initChartBar (data) {
        let seriesData = []
        for (let i = 0; i < data.legendData.length; i++) {
          let legend = data.legendData[i]
          let lineList = data.reportList[legend]
          let showData = []
          for (let j = 0; j < lineList.length; j++) {
            if (lineList[j].salesVolume != null) {
              let name = ''
              if (lineList[j].salePromotion != null && lineList[j].salePromotion !== '') {
                name = name + '活动方式：' + lineList[j].salePromotion + ';<br>';
              }
              if (lineList[j].mark != null && lineList[j].mark !== '') {
                name = name + '备注：' + lineList[j].mark + ';';
              }
              showData.push({ x: this.stringToDate(lineList[j].salesDate), y: Number(lineList[j].salesVolume), name: name })
            }
          }
          seriesData[i] = {
            'name': legend,
            'data': showData
          }
        }
        let option = {
          'chart': {
            'type': 'column'
          },
          'title': {
            'text': '累计销量柱状图'
          },
          'legend': {
            'data': data.legendData
          },
          'tooltip': {
            'headerFormat': '<b>{series.name}</b><br>',
            // 'pointFormat': '{point.x:%Y-%m-%d} {point.y:.2f}'
            pointFormatter: function() {
              let xDate = new Date(this.x)
              let html = xDate.getFullYear() + '-' + (xDate.getMonth() + 1) + '-' + xDate.getDate() + ' ￥' + this.y
              if (this.name != null) {
                html = html + '<br>' + this.name
              }
              return html
            }
          },
          'grid': {
            'left': '3%',
            'right': '4%',
            'bottom': '3%',
            'containLabel': true
          },
          'toolbox': {
            'feature': {
              'saveAsImage': { }
            }
          },
          'xAxis': {
            'type': 'datetime',
            dateTimeLabelFormats: {
              day: '%Y-%m-%d'
            },
            title: {
              text: '日期'
            },
            softMin: this.dataForm.beginDate,
            softMax: this.dataForm.endDate
          },
          'yAxis': {
            title: {
              text: '累计销量'
            }
          },
          'series': seriesData
        }
        this.chartLine = Highcharts.chart(document.getElementById('J_chartBarBox'), option)
        // window.addEventListener('resize', () => {
        //   this.chartLine.resize()
        // })
      },
      stringToDate (dateStr, separator) {
        if (!separator) {
          separator = '-'
        }
        let dateArr = dateStr.split(separator)
        let year = parseInt(dateArr[0])
        let month
        // 处理月份为04这样的情况
        if (dateArr[1].indexOf('0') === 0) {
          month = parseInt(dateArr[1].substring(1))
        } else {
          month = parseInt(dateArr[1])
        }
        let day = parseInt(dateArr[2])
        let date = Date.UTC(year, month - 1, day)
        return date
      },
      labelHead(h, { column, index }) {
        let l = column.label.length
        let f = 16 // 每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
        column.minWidth = f * l // 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
        // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
        return h('div', { class: 'table-head', style: { width: '100%' } }, [column.label])
      }
    }
  }
</script>
<style lang="less">
  .mod-demo-echarts {
    /*> .el-alert {*/
    /*margin-bottom: 10px;*/
    /*}*/
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      min-height: 400px;
    }
  }

  .table-head {
    font-size: 14px !important; //设置固定的字体大小
  }

  .el-table .cell {
    position: relative;
  }

  .el-table .caret-wrapper {
    position: absolute;
    top: 2px;
    right: 0;
  }

  .el-table .cell, .el-table th div {
    padding: 0 !important;
  }

  .el-table tr td .cell {
    padding: 5px 2px !important;
  }

  .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 0 !important;
  }

</style>
