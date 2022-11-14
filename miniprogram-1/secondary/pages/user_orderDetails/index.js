// secondary/pages/user_orderDetails/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active0: "active",
    active1: "",
    active2: "",
    active3: "",
    active4: "",
    active5: "",
    active11: "active",
    active22: "",
    show: 0,
    shows: 1,
    m_matsuri_type: 1,
    invitation: 0,
    m_id: 0,
    basics: {},
    chefs: [],
    chef: {},
    foodsources: {},
    sanitary: {},
    auditorium: {},
    operation: [],
    bg1: "bgColor",
    bg2: "",
    bg3: "",
    isShow: 0,
    arr1: [],
    arr2: [],
    arr3: [],
  },
  taggle(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        active0: "active",
        active1: "",
        active2: "",
        active3: "",
        active4: "",
        active5: "",
        show: 0
      })
    } else if (index == 1) {
      this.setData({
        active0: "",
        active1: "active",
        active2: "",
        active3: "",
        active4: "",
        active5: "",
        show: 1
      })
    } else if (index == 2) {
      this.setData({
        active0: "",
        active1: "",
        active2: "active",
        active3: "",
        active4: "",
        active5: "",
        show: 2
      })
    } else if (index == 3) {
      this.setData({
        active0: "",
        active1: "",
        active2: "",
        active3: "active",
        active4: "",
        active5: "",
        show: 3
      })
    } else if (index == 4) {
      this.setData({
        active0: "",
        active1: "",
        active2: "",
        active3: "",
        active4: "active",
        active5: "",
        show: 4,
        m_idss: 0
      })
    } else if (index == 5) {
      this.setData({
        active0: "",
        active1: "",
        active2: "",
        active3: "",
        active4: "",
        active5: "active",
        arr1: this.data.operation.length == 0 ? [] : this.data.operation.find(i => i.type == 1) == undefined ? [] : this.data.operation.find(i => i.type == 1).list,
        arr2: this.data.operation.length == 0 ? [] : this.data.operation.find(i => i.type == 2) == undefined ? [] : this.data.operation.find(i => i.type == 2).list,
        arr3: this.data.operation.length == 0 ? [] : this.data.operation.find(i => i.type == 3) == undefined ? [] : this.data.operation.find(i => i.type == 3).list,
        show: 5
      })
    }
  },
  tagglex(e) {
    var index = e.currentTarget.dataset.index
    if (index == 1) {
      this.setData({
        active11: "active",
        active22: "",
        shows: 1
      })
    } else if (index == 2) {
      this.setData({
        active11: "",
        active22: "active",
        shows: 2
      })
    }
  },
  toggles(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        bg1: "bgColor",
        bg2: "",
        bg3: "",
        isShow: 0
      })
    } else if (index == 1) {
      this.setData({
        bg1: "",
        bg2: "bgColor",
        bg3: "",
        isShow: 1
      })
    } else if (index == 2) {
      this.setData({
        bg1: "",
        bg2: "",
        bg3: "bgColor",
        isShow: 2
      })
    }
  },
  findObj(Arr, j) {
    var a = {}
    Arr.forEach((i) => {
      if (i.code == j) {
        a = i
      }
    })
    return a
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(()=>{
      wx.showLoading({
        title: '加载中',
      })
    },200)
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      m_matsuri_type: options.m_matsuri_type,
      m_id: options.m_id
    })
    try {
      app.post('/house/getInvitationDetail', {
        token: wx.getStorageSync('userInfo').token,
        m_id: options.m_id
      }).then(res => {
        if (res.data.status == 1) {
          var rex = res.data.data
          rex.auditorium.m_start_date = rex.basics.m_start_date
          rex.auditorium.m_holding_days = rex.basics.m_holding_days
          // var m_province = rex.basics.m_province.toString().slice(0, 2)
          // var m_city = rex.basics.m_city.toString().slice(0, 4)
          app.post('/region/getProvince', {
            province_code: 0
          }).then(res => {
            if (res.data.status == 1) {
              this.setData({
                province: res.data.data
              })
            }
          }).then(res => {
            app.post('/region/getCity', {
              province_code: rex.basics.m_province
            }).then(res => {
              if (res.data.status == 1) {
                this.setData({
                  city: res.data.data
                })
              }
            }).then(res => {
              app.post('/region/getAreas', {
                city_code: rex.basics.m_city
              }).then(res => {
                if (res.data.status == 1) {
                  this.setData({
                    area: res.data.data
                  })
                }
              }).then(res => {
                app.post('/region/getStreets', {
                  area_code: rex.basics.m_area
                }).then(res => {
                  if (res.data.status == 1) {
                    this.setData({
                      street: res.data.data
                    })
                  }
                }).then(res => {
                  app.post('/region/getVillage', {
                    street_code: rex.basics.m_street
                  }).then(res => {
                    if (res.data.status == 1) {
                      this.setData({
                        village: res.data.data
                      })
                    }
                  }).then(res => {
                    var provinceValue = this.findObj(this.data.province, rex.basics.m_province).name
                    var cityValue = this.findObj(this.data.city, rex.basics.m_city).name
                    var areaValue = this.findObj(this.data.area, rex.basics.m_area).name
                    var streetValue = this.findObj(this.data.street, rex.basics.m_street).name
                    var villageValue = this.findObj(this.data.village, rex.basics.m_village).name
                    rex.basics.region = [provinceValue, cityValue, areaValue, streetValue, villageValue]
                    this.setData({
                      basics: rex.basics,
                      foodsources: rex.foodsource,
                      sanitary: rex.sanitary,
                      auditorium: rex.auditorium,
                    })
                    if (rex.chef.length != 0) {
                      var aa = rex.chef.find(i => i.mi_accept_invitation == 1 || i.mi_accept_invitation == 3)
                      if (aa) {
                        aa.cookbook.forEach(i => {
                          if (i.cb_img.indexOf(',') == -1) {
                            i.cb_img = i.cb_img.split('')
                          } else {
                            i.cb_img = i.cb_img.split(',')
                          }
                        })
                        var cuisine = aa.cuisine
                        var a = cuisine.indexOf(',')
                        if (a == -1) {
                          aa.cuisine = cuisine.split('')
                        } else {
                          aa.cuisine = cuisine.split(',')
                        }
                        this.setData({
                          chef: aa,
                          chefs: rex.chef,
                          invitation: 1,
                        })
                      } else {
                        this.setData({
                          chefs: rex.chef,
                          invitation: 0,
                        })
                      }
                    }
                    this.setData({
                      operation: rex.history == null ? [] : rex.history.operation
                    })
                  })
                })
              })
            })
          })
        }
        setTimeout(()=>{
          wx.hideLoading()
        },1200)
      })
    } catch {
      wx.showToast({
        title: '网络不稳定~',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
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