// components/admin_chef/index.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    domain: app.domain + "/img/chef/",
    province: [],
    city: [],
    area: [],
    village: [],
    chefArr: [],
    chefArrs: [],
    location: '',
    locationArr: [],
    page: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ask(url, data, key) {
      try {
        app.post(url, data).then(res => {
          if (res.data.status == 1) {
            if (key == "province") {
              this.setData({
                provinces: res.data.data
              })
            } else if (key == "city") {
              this.setData({
                citys: res.data.data
              })
            } else if (key == "area") {
              this.setData({
                areas: res.data.data
              })
            } else if (key == "street") {
              this.setData({
                streets: res.data.data
              })
            } else if (key == "village") {
              this.setData({
                villages: res.data.data
              })
            }
          }
        })
      } catch {
        wx.showToast({
          title: "网络不稳定~",
          icon: 'errer',
          duration: 1000 //持续的时间
        })
      }
    },
    unfold(e) {
      var index = e.currentTarget.dataset.index
      if (index == 1) {
        this.setData({
          province_show: !this.data.province_show,
          sex_show: false,
          city_show: false,
          area_show: false,
          street_show: false,
          village_show: false
        })
      } else if (index == 2) {
        this.setData({
          city_show: !this.data.city_show,
          sex_show: false,
          province_show: false,
          area_show: false,
          street_show: false,
          village_show: false
        })
      } else if (index == 3) {
        this.setData({
          area_show: !this.data.area_show,
          sex_show: false,
          province_show: false,
          city_show: false,
          street_show: false,
          village_show: false
        })
      } else if (index == 4) {
        this.setData({
          street_show: !this.data.street_show,
          sex_show: false,
          province_show: false,
          city_show: false,
          area_show: false,
          village_show: false
        })
      } else if (index == 5) {
        this.setData({
          village_show: !this.data.village_show,
          sex_show: false,
          province_show: false,
          city_show: false,
          area_show: false,
          street_show: false
        })
      }
    },
    choose(e) {
      var that = this
      var index = e.currentTarget.dataset.index
      var item = e.currentTarget.dataset.item
      if (item == 1) {
        this.setData({
          provinceValue: this.data.province[index].name,
          province_code: this.data.province[index].code,
          province_show: false,
          cityValue: "全部",
          city: [],
          area: [],
          street: [],
          village: [],
          city_code: 0,
          area_code: 0,
          street_code: 0,
          village_code: 0,
          areaValue: "全部",
          streetValue: "全部",
          villageValue: "全部",
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
        var obj = {
          m_token: wx.getStorageSync('admin').m_token,
          province: this.data.province_code,
          city: this.data.city_code,
          area: this.data.area_code,
          street: this.data.street_code,
          village: this.data.village_code,
          page: this.data.page
        }
        this.requestData(this.data.page, obj)
      } else if (item == 2) {
        this.setData({
          cityValue: this.data.city[index].name,
          city_code: this.data.city[index].code,
          city_show: false,
          areaValue: "全部",
          area: [],
          street: [],
          village: [],
          area_code: 0,
          street_code: 0,
          village_code: 0,
          streetValue: "全部",
          villageValue: "全部",
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
        var obj = {
          m_token: wx.getStorageSync('admin').m_token,
          province: this.data.province_code,
          city: this.data.city_code,
          area: this.data.area_code,
          street: this.data.street_code,
          village: this.data.village_code,
          page: this.data.page
        }
        this.requestData(this.data.page, obj)
      } else if (item == 3) {
        this.setData({
          areaValue: this.data.area[index].name,
          area_code: this.data.area[index].code,
          area_show: false,
          street: [],
          village: [],
          street_code: 0,
          village_code: 0,
          streetValue: "全部",
          villageValue: "全部",
        })
        try {
          app.post('/region/getStreets', {
            area_code: this.data.area_code
          }).then(res => {
            if (res.data.status == 1) {
              // wx.setStorageSync('street', res.data.data)
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
        var obj = {
          m_token: wx.getStorageSync('admin').m_token,
          province: this.data.province_code,
          city: this.data.city_code,
          area: this.data.area_code,
          street: this.data.street_code,
          village: this.data.village_code,
          page: this.data.page
        }
        this.requestData(this.data.page, obj)
      } else if (item == 4) {
        this.setData({
          streetValue: this.data.street[index].name,
          street_code: this.data.street[index].code,
          street_show: false,
          villageValue: "全部",
          village: [],
          village_code: 0,
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
        var obj = {
          m_token: wx.getStorageSync('admin').m_token,
          province: this.data.province_code,
          city: this.data.city_code,
          area: this.data.area_code,
          street: this.data.street_code,
          village: this.data.village_code,
          page: this.data.page
        }
        this.requestData(this.data.page, obj)
      } else if (item == 5) {
        this.setData({
          villageValue: this.data.village[index].name,
          village_code: this.data.village[index].code,
          village_show: false,
        })
        var obj = {
          m_token: wx.getStorageSync('admin').m_token,
          province: this.data.province_code,
          city: this.data.city_code,
          area: this.data.area_code,
          street: this.data.street_code,
          village: this.data.village_code,
          page: this.data.page
        }
        this.requestData(this.data.page, obj)
      }
      this.setData({
        page: 1,
        chefArr: []
      })
      this.requestData(this.data.page, '', (res)=>{
        if (res.chefArr.length == 0) {
          wx.showToast({
            title: '没有了~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        } else {
          that.updataView(res)
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1000 //持续的时间
          })
        }
      })
    },
    close() {
      this.setData({
        province_show: false,
        city_show: false,
        area_show: false,
        street_show: false,
        village_show: false
      })
    },
    getsuggest(e) {
      var that = this
      this.setData({
        page: 1,
        chefArr: []
      })
      this.requestData(this.data.page, e.detail.value, (res)=>{
        if (res.chefArr.length == 0) {
          wx.showToast({
            title: '没有了~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        } else {
          that.updataView(res)
          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 1000 //持续的时间
          })
        }
      })
    },
    // 请求数据
    requestData(page, search, callback) {
      wx.showLoading({
        title: '加载中'
      })
      var obj = {
        m_token: wx.getStorageSync('admin').m_token,
        province: this.data.province_code,
        city: this.data.city_code,
        area: this.data.area_code,
        street: this.data.street_code,
        village: this.data.village_code,
        page:page
      }
      if(search){obj.search = search}
      try {
        app.post('/manage/chefList', obj).then(res => {
          if (res.data.status == 1) {
            var obj = {
              chefArr: res.data.data.rows,
              chefArrs: res.data.data.rows,
            }
            try{
              callback(obj)
            }catch(res){
              // console.log(res);
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
    },
    updataView(res) {
      this.setData({
        chefArr: this.data.chefArr.concat(res.chefArr),
        chefArrs: this.data.chefArrs.concat(res.chefArrs)
      })
    },
    lower() {
      if (this.data.chefArr.length % 20 == 0) {
        this.setData({
          page: this.data.page + 1
        })
        this.requestData(this.data.page, (res) => {
          if (res.chefArr.length == 0) {
            wx.showToast({
              title: '没有了~',
              icon: 'error',
              duration: 1000 //持续的时间
            })
          } else {
            this.updataView(res)
            wx.showToast({
              title: '加载成功',
              icon: 'success',
              duration: 1000 //持续的时间
            })
          }
        })
      }
    },
  },
  lifetimes: {
    attached: function () {
      setTimeout(() => {
        wx.showLoading({
          title: '加载中'
        })
      }, 200)
      var admin = wx.getStorageSync('admin').location
      try {
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
            province_code: admin.province
          }).then(res => {
            if (res.data.status == 1) {
              this.setData({
                city: res.data.data
              })
            }
          }).then(res => {
            app.post('/region/getAreas', {
              city_code: admin.city
            }).then(res => {
              if (res.data.status == 1) {
                this.setData({
                  area: res.data.data
                })
              }
            }).then(res => {
              app.post('/region/getStreets', {
                area_code: admin.area
              }).then(res => {
                if (res.data.status == 1) {
                  this.setData({
                    street: res.data.data
                  })
                }
              }).then(res => {
                app.post('/region/getVillage', {
                  street_code: admin.street
                }).then(res => {
                  if (res.data.status == 1) {
                    this.setData({
                      village: res.data.data
                    })
                  }
                }).then(res => {
                  var provinces = admin.province == 0 ? "全部" : this.data.province.find(i => i.code == admin.province)
                  var city = admin.city == 0 ? "全部" : this.data.city.find(i => i.code == admin.city)
                  var area = admin.area == 0 ? "全部" : this.data.area.find(i => i.code == admin.area)
                  var street = admin.street == 0 ? "全部" : this.data.street.find(i => i.code == admin.street)
                  var village = admin.village == 0 ? "全部" : this.data.village.find(i => i.code == admin.village)
                  var locationArr = [
                    admin.province,
                    admin.city,
                    admin.area,
                    admin.street,
                    admin.village,
                  ]
                  var locationStrArr = [
                    provinces.name,
                    city.name,
                    area.name,
                    street.name,
                    village.name,
                  ]
                  var index = locationArr.indexOf(0)
                  if (index != 0) {
                    var location = locationStrArr[index - 1]
                  }
                  this.setData({
                    provinceValue: provinces.name == undefined ? "全部" : provinces.name,
                    cityValue: city.name == undefined ? "全部" : city.name,
                    areaValue: area.name == undefined ? "全部" : area.name,
                    streetValue: street.name == undefined ? "全部" : street.name,
                    villageValue: village.name == undefined ? "全部" : village.name,
                    province_code: provinces.code == undefined ? 0 : provinces.code,
                    city_code: city.code == undefined ? 0 : city.code,
                    area_code: area.code == undefined ? 0 : area.code,
                    street_code: street.code == undefined ? 0 : street.code,
                    village_code: village.code == undefined ? 0 : village.code,
                    location: location ? location : '',
                    locationArr: locationArr
                  })
                  this.requestData(this.data.page, '', (res) => {
                    if (res.chefArr.length == 0) {
                      wx.hideLoading()
                      wx.showToast({
                        title: '没有了~',
                        icon: 'error',
                        duration: 1000 //持续的时间
                      })
                    } else {
                      this.updataView(res)
                      wx.showToast({
                        title: '加载成功',
                        icon: 'success',
                        duration: 1000 //持续的时间
                      })
                    }
                  })
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
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})