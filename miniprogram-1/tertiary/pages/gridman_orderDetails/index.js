// tertiary/pages/gridman_orderDetails/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain + "/img/chefs/",
    active0: "active",
    active1: "",
    isShow: 0,
    basic: {},
    val1: "",
    checked1: "",
    checked11: "",
    val2: "",
    checked2: "",
    checked22: "",
    val3: "",
    checked3: "",
    checked33: "",
    val4: "",
    checked4: "",
    checked44: "",
    val5: "",
    checked5: "",
    checked55: "",
    val6: "",
    checked6: "",
    checked66: "",
    val7: "",
    checked7: "",
    checked77: "",
    val8: "",
    checked8: "",
    checked88: "",
    val9: "",
    checked9: "",
    checked99: "",
    val10: "",
    checked10: "",
    checked1010: "",
    val11: "",
    checked11: "",
    checked1111: "",
    val12: "",
    checked12: "",
    checked1212: "",
    val13: "",
    checked13: "",
    checked1313: "",
    val14: "",
    checked14: "",
    checked1414: "",
    val15: "",
    checked15: "",
    checked15: "",

    inpVal3: "",
    inpVal4: "",
    inpVal5: "",
    inpVal6: "点击可选择"
  },
  taggle(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        active0: "active",
        active1: "",
        isShow: 0
      })
    } else if (index == 1) {
      this.setData({
        active0: "",
        active1: "active",
        isShow: 1
      })
      try {
        app.post('/gridmember/getGuidance', {
          gm_token: wx.getStorageSync('gridman').gm_token,
          ig_m_id: this.data.basic.m_id
        }).then(res => {
          if (res.data.status == 1) {
            if (res.data.data) {
              var {
                ig_processing_site_pollution_source: val1,
                ig_processing_site_sanitary: val2,
                ig_processing_site_toxic_substances: val3,
                ig_employees_num: inpVal3,
                ig_health_certificate_num: inpVal4,
                ig_disinfection_requirement: val4,
                ig_disinfection_mode: inpVal5,
                ig_disinfection_date: inpVal6,
                ig_food_fresh: val5,
                ig_food_high_risk: val6,
                ig_food_overdue: val7,
                ig_food_dead: val8,
                ig_food_color_taste: val9,
                ig_food_cook_thoroughly: val10,
                ig_food_separate_storage: val11,
                ig_food_put_in_refrigerator: val12,
                ig_food_seafood_special_tools: val13,
                ig_food_timely_processing: val14,
                ig_food_sample_retention: val15,
              } = res.data.data
              this.setData({
                inpVal3: inpVal3,
                inpVal4: inpVal4,
                inpVal5: inpVal5,
                inpVal6: inpVal6.slice(0, 10),
              })
              if (val1 == "是") {
                this.setData({
                  checked1: true,
                  val1: val1
                })
              } else {
                this.setData({
                  checked11: true,
                  val1: val1
                })
              }
              if (val2 == "是") {
                this.setData({
                  checked2: true,
                  val2: val2
                })
              } else {
                this.setData({
                  checked22: true,
                  val2: val2
                })
              }
              if (val3 == "是") {
                this.setData({
                  checked3: true,
                  val3: val3
                })
              } else {
                this.setData({
                  checked33: true,
                  val3: val3
                })
              }
              if (val4 == "是") {
                this.setData({
                  checked4: true,
                  val4: val4
                })
              } else {
                this.setData({
                  checked44: true,
                  val4: val4
                })
              }
              if (val5 == "是") {
                this.setData({
                  checked5: true,
                  val5: val5
                })
              } else {
                this.setData({
                  checked55: true,
                  val5: val5
                })
              }
              if (val6 == "是") {
                this.setData({
                  checked6: true,
                  val6: val6
                })
              } else {
                this.setData({
                  checked66: true,
                  val6: val6
                })
              }
              if (val7 == "是") {
                this.setData({
                  checked7: true,
                  val7: val7
                })
              } else {
                this.setData({
                  checked77: true,
                  val7: val7
                })
              }
              if (val8 == "是") {
                this.setData({
                  checked8: true,
                  val8: val8
                })
              } else {
                this.setData({
                  checked88: true,
                  val8: val8
                })
              }
              if (val9 == "是") {
                this.setData({
                  checked9: true,
                  val9: val9
                })
              } else {
                this.setData({
                  checked99: true,
                  val9: val9
                })
              }
              if (val10 == "是") {
                this.setData({
                  checked10: true,
                  val10: val10
                })
              } else {
                this.setData({
                  checked1010: true,
                  val10: val10
                })
              }
              if (val11 == "是") {
                this.setData({
                  checked11: true,
                  val11: val11
                })
              } else {
                this.setData({
                  checked1111: true,
                  val11: val11
                })
              }
              if (val12 == "是") {
                this.setData({
                  checked12: true,
                  val12: val12
                })
              } else {
                this.setData({
                  checked1212: true,
                  val12: val12
                })
              }
              if (val13 == "是") {
                this.setData({
                  checked13: true,
                  val13: val13
                })
              } else {
                this.setData({
                  checked1313: true,
                  val13: val13
                })
              }
              if (val14 == "是") {
                this.setData({
                  checked14: true,
                  val14: val14
                })
              } else {
                this.setData({
                  checked1414: true,
                  val14: val14
                })
              }
              if (val15 == "是") {
                this.setData({
                  checked15: true,
                  val15: val15
                })
              } else {
                this.setData({
                  checked1515: true,
                  val15: val15
                })
              }
            }
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
  },
  radioChange(e) {
    var index = e.currentTarget.dataset.index
    var val = e.detail.value
    if (index == 1) {
      this.setData({
        val1: val
      })
    } else if (index == 2) {
      this.setData({
        val2: val
      })
    } else if (index == 3) {
      this.setData({
        val3: val
      })
    } else if (index == 4) {
      this.setData({
        val4: val
      })
    } else if (index == 5) {
      this.setData({
        val5: val
      })
    } else if (index == 6) {
      this.setData({
        val6: val
      })
    } else if (index == 7) {
      this.setData({
        val7: val
      })
    } else if (index == 8) {
      this.setData({
        val8: val
      })
    } else if (index == 9) {
      this.setData({
        val9: val
      })
    } else if (index == 10) {
      this.setData({
        val10: val
      })
    } else if (index == 11) {
      this.setData({
        val11: val
      })
    } else if (index == 12) {
      this.setData({
        val12: val
      })
    } else if (index == 13) {
      this.setData({
        val13: val
      })
    } else if (index == 14) {
      this.setData({
        val14: val
      })
    } else if (index == 15) {
      this.setData({
        val15: val
      })
    }
  },
  inputs(e) {
    var index = e.currentTarget.dataset.index
    var val = e.detail.value
    if (index == 3) {
      this.setData({
        inpVal3: val
      })
    } else if (index == 4) {
      this.setData({
        inpVal4: val
      })
    } else if (index == 5) {
      this.setData({
        inpVal5: val
      })
    }
  },
  bindDateChange(e) {
    var val = e.detail.value
    this.setData({
      inpVal6: val
    })
  },
  submitInfo() {
    var obj = {
      gm_token: wx.getStorageSync('data').gm_token,
      ig_m_id: this.data.basic.m_id,
      ig_processing_site_pollution_source: this.data.val1,
      ig_processing_site_sanitary: this.data.val2,
      ig_processing_site_toxic_substances: this.data.val3,
      ig_employees_num: this.data.inpVal3,
      ig_health_certificate_num: this.data.inpVal4,
      ig_disinfection_requirement: this.data.val4,
      ig_disinfection_mode: this.data.inpVal5,
      ig_disinfection_date: this.data.inpVal6,
      ig_food_fresh: this.data.val5,
      ig_food_high_risk: this.data.val6,
      ig_food_overdue: this.data.val7,
      ig_food_dead: this.data.val8,
      ig_food_color_taste: this.data.val9,
      ig_food_cook_thoroughly: this.data.val10,
      ig_food_separate_storage: this.data.val11,
      ig_food_put_in_refrigerator: this.data.val12,
      ig_food_seafood_special_tools: this.data.val13,
      ig_food_timely_processing: this.data.val14,
      ig_food_sample_retention: this.data.val15,
    }
    if (obj.ig_disinfection_date != "点击可选择" && obj.ig_disinfection_mode != "" && obj.ig_disinfection_requirement != "" && obj.ig_employees_num != "" && obj.ig_food_color_taste != "" && obj.ig_food_cook_thoroughly != "" && obj.ig_food_dead != "" && obj.ig_food_fresh != "" && obj.ig_food_high_risk != "" && obj.ig_food_overdue != "" && obj.ig_food_put_in_refrigerator != "" && obj.ig_food_sample_retention != "" && obj.ig_food_seafood_special_tools != "" && obj.ig_food_separate_storage != "" && obj.ig_food_timely_processing != "" && obj.ig_health_certificate_num != "" && obj.ig_processing_site_pollution_source != "" && obj.ig_processing_site_sanitary != "" && obj.ig_processing_site_toxic_substances != "") {
      try {
        app.post('/gridmember/saveGuidance', obj).then(res => {
          if (res.data.status == 1) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 1000 //持续的时间
            })
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
    } else {
      wx.showToast({
        title: "请完善信息",
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(function () {
      wx.showLoading({title: '加载中'})
    })
    wx.setNavigationBarTitle({
      title: '乡宴详情',
    })
    var basic = {
      m_id: options.m_id,
      m_address: options.m_address,
      m_type: options.m_type,
      m_start_date: options.m_start_date,
      m_holding_days: options.m_holding_days,
      m_banquet_number: options.m_banquet_number,
      m_phone: options.m_phone,
      m_longitude: options.m_longitude,
      m_latitude: options.m_latitude
    }
    this.setData({
      basic: basic
    })
    setTimeout(function () {
      wx.hideLoading()
    },1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})