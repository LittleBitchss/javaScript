// tertiary/pages/admin_gridmanInfo/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: [{
      code: '001',
      name: '男'
    }, {
      code: '002',
      name: '女'
    }],
    gm_id:0,
    sexValue: "请选择性别",
    sexColor: "",
    sexShow: "",
    sex_show: false,
    fontColor1: "",

    province: [],
    provinceValue: "请选择所属省",
    provinceColor: "",
    provinceShow: "",
    province_code: "",
    province_show: false,
    fontColor2: "",

    city: [],
    cityValue: "请选择所属市",
    cityColor: "",
    cityShow: "",
    city_code: "",
    city_show: false,
    fontColor3: "",

    area: [],
    areaValue: "请选择所属区",
    areaColor: "",
    areaShow: "",
    area_code: "",
    area_show: false,
    fontColor4: "",

    street: [],
    streetValue: "请选择所属街道",
    streetColor: "",
    streetShow: "",
    street_code: "",
    street_show: false,
    fontColor5: "",

    village: [],
    villageValue: "请选择所属村庄",
    villageColor: "",
    villageShow: "",
    village_code: "",
    village_show: false,
    fontColor6: "",

    nameColor: "",
    nameValue: "",
    nameShow: "",
    namePlaceholder: "请输入姓名",
    namePlaceholderClass: "placeholderClass",

    phoneColor: "",
    phoneValue: "",
    phoneShow: "",
    phonePlaceholder: "请输入用户名",
    phonePlaceholderClass: "placeholderClass",
  },
  unfold(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        sex_show: !this.data.sex_show,
        province_show: false,
        city_show: false,
        area_show: false,
        street_show: false,
        village_show: false,
      })
      if (this.data.sex_show) {
        this.setData({
          sexColor: "borderColor"
        })
      } else {
        this.setData({
          sexColor: ""
        })
      }
    } else if (index == 1) {
      this.setData({
        province_show: !this.data.province_show,
        sex_show: false,
        city_show: false,
        area_show: false,
        street_show: false,
        village_show: false
      })
      if (this.data.province_show) {
        this.setData({
          provinceColor: "borderColor"
        })
      } else {
        this.setData({
          provinceColor: ""
        })
      }
    } else if (index == 2) {
      this.setData({
        city_show: !this.data.city_show,
        sex_show: false,
        province_show: false,
        area_show: false,
        street_show: false,
        village_show: false
      })
      if (this.data.city_show) {
        this.setData({
          cityColor: "borderColor"
        })
      } else {
        this.setData({
          cityColor: ""
        })
      }
    } else if (index == 3) {
      this.setData({
        area_show: !this.data.area_show,
        sex_show: false,
        province_show: false,
        city_show: false,
        street_show: false,
        village_show: false
      })
      if (this.data.area_show) {
        this.setData({
          areaColor: "borderColor"
        })
      } else {
        this.setData({
          areaColor: ""
        })
      }
    } else if (index == 4) {
      this.setData({
        street_show: !this.data.street_show,
        sex_show: false,
        province_show: false,
        city_show: false,
        area_show: false,
        village_show: false
      })
      if (this.data.street_show) {
        this.setData({
          streetColor: "borderColor"
        })
      } else {
        this.setData({
          streetColor: ""
        })
      }
    } else if (index == 5) {
      this.setData({
        village_show: !this.data.village_show,
        sex_show: false,
        province_show: false,
        city_show: false,
        area_show: false,
        street_show: false
      })
      if (this.data.village_show) {
        this.setData({
          villageColor: "borderColor"
        })
      } else {
        this.setData({
          villageColor: ""
        })
      }
    }
  },
  choose(e) {
    var index = e.currentTarget.dataset.index
    var item = e.currentTarget.dataset.item
    if (item == 0) {
      this.setData({
        sexValue: this.data.sex[index].name,
        sexColor: "",
        sexShow: "show",
        sex_show: false,
        fontColor1: "fontColor"
      })
    } else if (item == 1) {
      this.setData({
        provinceValue: this.data.province[index].name,
        province_code: this.data.province[index].code,
        provinceColor: "",
        provinceShow: "show",
        province_show: false,
        fontColor2: "fontColor",
        cityValue: "请选择所属市",
        cityShow: "",
        cityColor: "",
        city: [],
        area: [],
        street: [],
        village: [],
        city_code: "",
        area_code: "",
        street_code: "",
        village_code: "",

        areaValue: "请选择所属区",
        areaShow: "",
        areaColor: "",
        streetValue: "请选择所属街道",
        streetShow: "",
        streetColor: "",
        villageValue: "请选择所属村庄",
        villageShow: "",
        villageColor: "",
      })
      try {
        app.post('/region/getCity', {
          province_code: this.data.province_code
        }).then(res => {
          if (res.data.status == 1) {
            this.setData({
              city: res.data.data
            })
          } else {
            wx.showToast({
              title: "获取失败",
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
    } else if (item == 2) {
      this.setData({
        cityValue: this.data.city[index].name,
        city_code: this.data.city[index].code,
        cityColor: "",
        cityShow: "show",
        city_show: false,
        fontColor3: "fontColor",
        areaValue: "请选择所属区",
        areaShow: "",
        areaColor: "",
        area: [],
        street: [],
        village: [],
        area_code: "",
        street_code: "",
        village_code: "",
        streetValue: "请选择所属街道",
        streetShow: "",
        streetColor: "",
        villageValue: "请选择所属村庄",
        villageShow: "",
        villageColor: "",
      })
      try {
        app.post('/region/getAreas', {
          city_code: this.data.city_code
        }).then(res => {
          if (res.data.status == 1) {
            this.setData({
              area: res.data.data,
            })
          } else {
            wx.showToast({
              title: "获取失败",
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
    } else if (item == 3) {
      this.setData({
        areaValue: this.data.area[index].name,
        area_code: this.data.area[index].code,
        areaColor: "",
        areaShow: "show",
        area_show: false,
        fontColor4: "fontColor",
        street: [],
        village: [],
        street_code: "",
        village_code: "",
        streetValue: "请选择所属街道",
        streetShow: "",
        streetColor: "",
        villageValue: "请选择所属村庄",
        villageShow: "",
        villageColor: "",
      })
      try {
        app.post('/region/getStreets', {
          area_code: this.data.area_code
        }).then(res => {
          if (res.data.status == 1) {
            this.setData({
              street: res.data.data,
            })
          } else {
            wx.showToast({
              title: "获取失败",
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
    } else if (item == 4) {
      console.log(location);
      this.setData({
        streetValue: this.data.street[index].name,
        street_code: this.data.street[index].code,
        streetColor: "",
        streetShow: "show",
        street_show: false,
        fontColor5: "fontColor",
        villageValue: "请选择所属村庄",
        villageShow: "",
        villageColor: "",
        village: [],
        village_code: "",
      })
      try {
        app.post('/region/getVillage', {
          street_code: this.data.street_code
        }).then(res => {
          if (res.data.status == 1) {
            this.setData({
              village: res.data.data
            })
          } else {
            wx.showToast({
              title: "获取失败",
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
    } else if (item == 5) {
      this.setData({
        villageValue: this.data.village[index].name,
        village_code: this.data.village[index].code,
        villageColor: "",
        villageShow: "show",
        village_show: false,
        fontColor6: "fontColor"
      })
    }
  },
  close() {
    this.setData({
      sex_show: false,
      province_show: false,
      city_show: false,
      area_show: false,
      street_show: false,
      village_show: false,
      sexColor: "",
      provinceColor: "",
      cityColor: "",
      areaColor: "",
      streetColor: "",
      villageColor: ""
    })
  },
  // 获取焦点
  focus(e) {
    if (e.currentTarget.dataset.item == "0") {
      this.setData({
        nameColor: "borderColor",
        namePlaceholder: "请输入姓名",
        namePlaceholderClass: "placeholderClass",
      })
    } else if (e.currentTarget.dataset.item == "2") {
      this.setData({
        phoneColor: "borderColor",
        phonePlaceholder: "请输入用户名",
        phonePlaceholderClass: "placeholderClass"
      })
    }
  },
  // 输入信息
  enter(e) {
    if (e.currentTarget.dataset.item == "0") {
      this.setData({
        nameValue: e.detail.value
      })
    } else if (e.currentTarget.dataset.item == "2") {
      this.setData({
        phoneValue: e.detail.value
      })
    }
  },
  // 失去焦点
  blur(e) {
    var nameReg = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
    if (e.currentTarget.dataset.item == "0") {
      if (this.data.nameValue.replace(/\s+/g, '') != "") {
        if (nameReg.test(this.data.nameValue)) {
          this.setData({
            nameShow: "show",
            nameColor: "",
          })
        } else {
          this.setData({
            nameShow: "",
            nameColor: "borderColorErr",
            namePlaceholder: "格式不正确",
            namePlaceholderClass: "placeholderClassErr",
            nameValue: ""
          })
        }
      } else {
        this.setData({
          nameColor: "",
          nameValue: "",
          nameShow: ""
        })
      }
    } else if (e.currentTarget.dataset.item == "2") {
      if (this.data.phoneValue.replace(/\s+/g, '') != "") {
        if (this.data.phoneValue.indexOf(' ') == -1) {
          this.setData({
            phoneShow: "show",
            phoneColor: "",
          })
        } else {
          this.setData({
            phoneShow: "",
            phoneColor: "borderColorErr",
            phonePlaceholder: "格式不正确",
            phonePlaceholderClass: "placeholderClassErr",
            phoneValue: ""
          })
        }
      } else {
        this.setData({
          phoneColor: "",
          phoneValue: "",
          phoneShow: ""
        })
      }
    }
  },
  // 提交信息
  basicInfosubmit() {
    wx.showLoading({
      title: '加载中'
    })
    var values = {
      m_token: wx.getStorageSync('admin').m_token,
      gm_id: this.data.gm_id,
      gm_user: this.data.phoneValue,
      gm_name: this.data.nameValue,
      gm_sex: this.data.sexValue,
      gm_province: this.data.province_code,
      gm_city: this.data.city_code,
      gm_area: this.data.area_code,
      gm_street: this.data.street_code,
      gm_village: this.data.village_code
    }
    if (values.gm_name != "" && values.gm_sex != "请选择性别" && values.gm_user != "" && values.gm_province != "" && values.gm_city != "" && values.gm_area != "" && values.gm_street != "" && values.gm_village != "") {
      try {
        app.post('/manage/updateGm', values).then(res => {
          wx.hideLoading()
          console.log(res);
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
        title: '请完善信息',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      gm_id:options.gm_id
    })
    if(options.item == 1){
      wx.setNavigationBarTitle({
        title: '新增网格员',
      })
      try {
        app.post('/region/getProvince', {
          province_code: 0
        }).then(res => {
          if (res.data.status == 1) {
            this.setData({
              province: res.data.data
            })
          }
        })
      } catch {
        wx.showToast({
          title: "网络不稳定~",
          icon: 'errer',
          duration: 1000 //持续的时间
        })
      }
    }else if(options.item == 2){
      wx.showLoading({
        title: '加载中'
      })
      wx.setNavigationBarTitle({
        title: '网格员信息修改',
      })
      try {
        app.post('/manage/getGmInfo', {
          m_token: wx.getStorageSync('admin').m_token,
          gm_id: options.gm_id
        }).then(res => {
          if (res.data.status == 1) {
            var rex = res
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
                province_code: rex.data.data.gm_province
              }).then(res => {
                if (res.data.status == 1) {
                  this.setData({
                    city: res.data.data
                  })
                }
              }).then(res => {
                app.post('/region/getAreas', {
                  city_code: rex.data.data.gm_city
                }).then(res => {
                  if (res.data.status == 1) {
                    this.setData({
                      area: res.data.data
                    })
                  }
                }).then(res => {
                  app.post('/region/getStreets', {
                    area_code: rex.data.data.gm_area
                  }).then(res => {
                    if (res.data.status == 1) {
                      this.setData({
                        street: res.data.data
                      })
                    }
                  }).then(res => {
                    app.post('/region/getVillage', {
                      street_code: rex.data.data.gm_street
                    }).then(res => {
                      if (res.data.status == 1) {
                        this.setData({
                          village: res.data.data
                        })
                      }
                    }).then(res => {
                      this.setData({
                        phoneValue: rex.data.data.gm_user,
                        nameValue: rex.data.data.gm_name,
                        sexValue: rex.data.data.gm_sex,
                        fontColor1: "fontColor",
                        fontColor2: "fontColor",
                        fontColor3: "fontColor",
                        fontColor4: "fontColor",
                        fontColor5: "fontColor",
                        fontColor6: "fontColor",
                        sexShow: "show",
                        provinceShow: "show",
                        cityShow: "show",
                        areaShow: "show",
                        streetShow: "show",
                        villageShow: "show",
                        nameShow: "show",
                        phoneShow: "show",
                        provinceValue: this.data.province.find(i => i.code == rex.data.data.gm_province).name,
                        cityValue: this.data.city.find(i => i.code == rex.data.data.gm_city).name,
                        areaValue: this.data.area.find(i => i.code == rex.data.data.gm_area).name,
                        streetValue: this.data.street.find(i => i.code == rex.data.data.gm_street).name,
                        villageValue: this.data.village.find(i => i.code == rex.data.data.gm_village).name,
                        province_code: rex.data.data.gm_province,
                        city_code: rex.data.data.gm_city,
                        area_code: rex.data.data.gm_area,
                        street_code: rex.data.data.gm_street,
                        village_code: rex.data.data.gm_village
                      })
                      wx.hideLoading()
                    })
                  })
                })
              })
            })
          }
        })
      } catch {
        wx.showToast({
          title: "网络不稳定~",
          icon: 'errer',
          duration: 1000 //持续的时间
        })
      }
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