// components/user_orderAddre/user_orderAddre.js
const utils = require("../../utils/utils")
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    auditorium: Object,
    basics: Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    domain: app.domain + "/img/chef/",
    Family: app.domain + "/img/report/Family-active.png",
    hall: app.domain + "/img/report/hall.png",
    fontColor11: "",
    fontColor22: "fontColor",
    show: 1,

    province: [],
    provinceValue: "",
    city: [],
    cityValue: "",
    area: [],
    areaValue: "",
    street: [],
    streetValue: "",
    village: [],
    villageValue: "",

    value1: "",
    value6: "",

    cover: "",
    a_name: "",
    address: "",
    swipers: [],
    hallx: [],
    hallxs: [],
    hallxss: "",

    chooseHall: false,
    chooseHall2: 0,
    startDate: "",
    endDate: "",

    selStartDate: "",
    selEndDate: "",

    m_auditorium_id: "",
    m_ao_id: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getDatess(days, dayss) {
      var daysInMillis = 86400000
      dayss = dayss * daysInMillis
      var start_num = new Date(days.replace(/-/g, "/"))
      var dat = start_num.getTime() + dayss
      var day = utils.formatDate(new Date(dat))
      return day
    },
    findObj(Arr, j) {
      var a = {}
      Arr.forEach((i) => {
        if (i.code == j) {
          a = i
        }
      })
      return a
    }
  },
  lifetimes: {
    attached() {
      wx.showLoading({
        title: '加载中',
      })
      if (this.data.auditorium.office == undefined) {
        try {
          app.post('/region/getProvince', {
            province_code: 0
          }).then(res => {
            if (res.data.status == 1) {
              wx.setStorageSync('province', res.data.data)
              this.setData({
                province: res.data.data
              })
            }
          }).then(res => {
            app.post('/region/getCity', {
              province_code: this.data.basics.m_province
            }).then(res => {
              if (res.data.status == 1) {
                wx.setStorageSync('city', res.data.data)
                this.setData({
                  city: res.data.data
                })
              }
            }).then(res => {
              app.post('/region/getAreas', {
                city_code: this.data.basics.m_city
              }).then(res => {
                if (res.data.status == 1) {
                  wx.setStorageSync('area', res.data.data)
                  this.setData({
                    area: res.data.data
                  })
                }
              }).then(res => {
                app.post('/region/getStreets', {
                  area_code: this.data.basics.m_area
                }).then(res => {
                  if (res.data.status == 1) {
                    wx.setStorageSync('street', res.data.data)
                    this.setData({
                      street: res.data.data
                    })
                  }
                }).then(res => {
                  app.post('/region/getVillage', {
                    street_code: this.data.basics.m_street
                  }).then(res => {
                    if (res.data.status == 1) {
                      wx.setStorageSync('village', res.data.data)
                      this.setData({
                        village: res.data.data
                      })
                    }
                  }).then(res => {
                    this.setData({
                      fontColor1: "fontColor",
                      fontColor2: "fontColor",
                      fontColor3: "fontColor",
                      fontColor4: "fontColor",
                      fontColor5: "fontColor",
                      provinceValue: this.findObj(wx.getStorageSync('province'), this.data.basics.m_province).name,
                      cityValue: this.findObj(wx.getStorageSync('city'), this.data.basics.m_city).name,
                      areaValue: this.findObj(wx.getStorageSync('area'), this.data.basics.m_area).name,
                      streetValue: this.findObj(wx.getStorageSync('street'), this.data.basics.m_street).name,
                      villageValue: this.findObj(wx.getStorageSync('village'), this.data.basics.m_village).name,
                      value6: this.data.basics.m_address
                    })
                    wx.hideLoading()
                  })
                })
              })
            })
          })
        } catch {
          wx.showToast({
            title: '网络不稳定~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      } else {
        var hallxss = ""
        this.data.auditorium.office.forEach(i => {
          i.flag = true
          hallxss += i.ao_name
        })
        var endDate = this.getDatess(this.data.auditorium.m_start_date, this.data.auditorium.m_holding_days - 1)
        this.setData({
          Family: app.domain + "/img/report/Family.png",
          hall: app.domain + "/img/report/hall-active.png",
          fontColor11: "fontColor",
          fontColor22: "",
          show: 3,
          isFamily: 2,
          cover: this.data.auditorium.a_cover_photo,
          a_name: this.data.auditorium.a_name,
          address: this.data.auditorium.a_address,
          swipers: this.data.auditorium.a_scroll_picture.split(","),
          hallx: this.data.auditorium.office,
          hallxss: hallxss,
          startDate: this.data.auditorium.m_start_date,
          endDate: endDate,
          selStartDate: this.data.auditorium.m_start_date.replace(/-/g, ""),
          selEndDate: endDate.replace(/-/g, ""),
        })
        wx.hideLoading()
      }
    }
  }
})