// pages/chefGoHome/index.js
const app = getApp()
const utils = require("../../../utils/utils")
var QQMapWX = require('../../../utils/js/qqmap-wx-jssdk.min');
const qqMapSdk = new QQMapWX({
  key: 'ABNBZ-GKPLS-FOAOJ-6HOP3-GAWZO-NNFDH'
});
Page({
  data: {
    domain: app.domain + "/img/chef/",
    date: "请选择服务日期",
    time: "请选择用餐时间",
    fontColor1: "",
    fontColor2: "",
    value1: "",
    value2: "",
    value3: "",
    value4: "",
    region: ["请选择地区"],
    regionCode: [],
    checked1: true,
    active1: "active",
    active2: "",
    bdColor1: "bdColor",
    bdColor2: "",
    checked2: false,
    value5: "",
    m_insurance: 0,
    m_insurance_count: 0,
    addressObj: {},
    show: false
  },
  getDate(days) {
    var date = utils.formatDate(new Date());
    var start_num = new Date(date.replace(/-/g, "/"))
    var end_num = new Date(days.replace(/-/g, "/"))
    let day = parseInt((end_num.getTime() - start_num.getTime()) / (1000 * 60 * 60 * 24))
    return day
  },
  bindChange(e) {
    var index = e.currentTarget.dataset.index
    var val = e.detail.value
    if (index == 1) {
      var aa = this.getDate(e.detail.value)
      if (aa > 0) {
        this.setData({
          date: val,
          fontColor1: "fontColor"
        })
      } else {
        wx.showToast({
          title: '需提前一天报备',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    } else if (index == 2) {
      this.setData({
        time: val,
        fontColor2: "fontColor"
      })
    } else if (index == 3) {
      this.setData({
        region: e.detail.value,
        regionCode: e.detail.code,
        fontColor3: "fontColor",
      })
    }
  },
  inputs(e) {
    var index = e.currentTarget.dataset.index
    var value = e.detail.value
    if (index == 1) {
      this.setData({
        value1: value
      })
    } else if (index == 2) {
      this.setData({
        value2: value
      })
    } else if (index == 3) {
      this.setData({
        value3: value
      })
    } else if (index == 4) {
      this.setData({
        value4: value
      })
    }
  },
  blur(e) {
    var index = e.currentTarget.dataset.index
    if (index == 1) {
      if (this.data.value1.trim() != "") {
        if (isNaN(this.data.value1 - 0) || (this.data.value1 - 0) == 0) {
          wx.showToast({
            title: '请输入合法数字',
            icon: 'error',
            duration: 1000 //持续的时间
          })
          this.setData({
            value1: ""
          })
        }
      } else {
        this.setData({
          value1: ""
        })
      }
    } else if (index == 2) {
      var regExp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      if (this.data.value2.trim() != "") {
        if (this.data.value2.indexOf(" ") != -1 || !regExp.test(this.data.value2)) {
          wx.showToast({
            title: '请输入合法电话',
            icon: 'error',
            duration: 1000 //持续的时间
          })
          this.setData({
            value2: ""
          })
        }
      } else {
        this.setData({
          value2: ""
        })
      }
    }
  },
  radioChange(e) {
    var val = e.detail.value
    this.setData({
      value5: val
    })
    if (val == 10) {
      this.setData({
        active1: "",
        active2: "active",
        bdColor1: "",
        bdColor2: "bdColor",
        m_insurance: 1,
        m_insurance_count: 10
      })
    } else if (val == 0) {
      this.setData({
        active1: "active",
        active2: "",
        bdColor1: "bdColor",
        bdColor2: "",
        m_insurance: 0,
        m_insurance_count: 0
      })
    }
  },
  siteTesting: function (e) {
    var addressObj = this.data.addressObj
    if (!addressObj.province) {
      this.areaSelect.showDialog();
    } else {
      this.areaSelect.pass({
        addressObj: addressObj
      });
    }
    this.setData({
      show: true
    })
  },
  _cancelEvent(e) {
    var addressObj = this.data.addressObj
    this.setData({
      show: e.detail.show
    })
    if (!addressObj.province) {
      this.areaSelect.hideDialog();
    }
  },
  _confirmEvent(e) {
    var Obj = this.areaSelect.data.addressObj
    var region = [
      Obj.province.provinceName,
      Obj.city.cityName,
      Obj.area.areaName,
      Obj.address.addressName,
      Obj.community.communityName,
    ]
    var regionCode = [
      Obj.province.provinceCode,
      Obj.city.cityCode,
      Obj.area.areaCode,
      Obj.address.addressCode,
      Obj.community.communityCode,
    ]
    this.setData({
      show: e.detail.show,
      addressObj: Obj,
      region: region,
      regionCode: regionCode,
      fontColor3: "fontColor",
    })
  },
  eventhandle() {
    var addressObj = this.data.addressObj
    if (!addressObj.province) {
      this.areaSelect.hideDialog();
    }
    this.setData({
      show: false
    })
  },
  submitInfo() {
    var that = this
    var obj = {
      token: wx.getStorageSync('userInfo').token,
      type: 2,
      m_id: 0,
      meal_info: {
        m_start_date: this.data.date,
        m_meal_time: this.data.time,
        m_banquet_number: this.data.value1,
        m_phone: this.data.value2,
        m_province: this.data.regionCode[0],
        m_city: this.data.regionCode[1],
        m_area: this.data.regionCode[2],
        m_street: this.data.regionCode[3],
        m_village: this.data.regionCode[4],
        m_address: this.data.value3,
        m_remark: this.data.value4,
        m_insurance: this.data.m_insurance,
        m_insurance_count: this.data.m_insurance_count
      }
    }
    if (obj.meal_info.m_start_date != "请选择服务日期" && obj.meal_info.m_meal_time != "请选择用餐时间" && obj.meal_info.m_banquet_number && obj.meal_info.m_phone && obj.meal_info.m_province && obj.meal_info.m_address && obj.meal_info.m_remark) {
      var address = this.data.region[0] + this.data.region[1] + this.data.region[2] + this.data.region[3] + this.data.region[4] + this.data.value3
      qqMapSdk.geocoder({
        //获取表单传入地址
        address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
        success: function (res) { //成功后的回调
          var latitude = res.result.location.lat;
          var longitude = res.result.location.lng;
          obj.meal_info.m_longitude = longitude
          obj.meal_info.m_latitude = latitude
          try {
            obj.meal_info = JSON.stringify(obj.meal_info)
            app.post('/house/matsuriApplication', obj).then(res => {
              if (res.data.status == 1) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 1000 //持续的时间
                })
                setTimeout(() => {
                  wx.showLoading({
                    title: '跳转中...',
                  })
                }, 500)
                setTimeout(() => {
                  wx.hideLoading()
                  wx.redirectTo({
                    url: '/secondary/pages/user_orderPay/index?m_id=' + res.data.data.m_id + '&m_insurance_count=' + that.data.m_insurance_count + '&type=' + res.data.data.type + '&whereDoes=1'
                  })
                }, 1000)
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'error',
                  duration: 1000 //持续的时间
                })
              }
            })
          } catch {
            wx.showToast({
              title: '网络不稳定~',
              icon: 'error',
              duration: 1000 //持续的时间
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
    // url="/secondary/pages/user_orderPay/index" 
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '厨师到家'
    })
    wx.showModal({
      title: '',
      content: '创建订单需支付100元定金，完成订单后全额返还',
      confirmText: '我已知晓',
      cancelText: '返回',
      cancelColor: '#b6b6b6',
      confirmColor: '#4768f3',
      success(res) {
        if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      },
      fail(res) {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  onShow: function () {
    this.areaSelect = this.selectComponent("#areaSelect");
  }
})