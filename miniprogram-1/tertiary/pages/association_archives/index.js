// tertiary/pages/association_archives/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomBorder: ["active", "", "", ""],
    hide: 0,
    basic:{},
    sousChef:[],
    history:[],
    cookbook:{},
    grade: [{
      code: '1',
      name: '初级(国家职业资格五级)'
    }, {
      code: '2',
      name: '中级(国家职业资格四级)'
    }, {
      code: '003',
      name: '高级(国家职业资格三级)'
    }, {
      code: '4',
      name: '技师(国家职业资格二级)'
    }, {
      code: '5',
      name: '高级技师(国家职业资格一级)'
    }],
    star: [{
      stars: [app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png"]
    }],
    disheCategorys: [{
      type: 1,
      name: "主食"
    },
    {
      type: 2,
      name: "冷菜"
    },
    {
      type: 3,
      name: "热菜"
    },
    {
      type: 4,
      name: "汤煲"
    },
    {
      type: 5,
      name: "水果"
    }
  ],
  },
  click(e) {
    var arr = ["", "", "", ""]
    var index = Number(e.target.dataset.index)
    arr[index] = "active"
    this.setData({
      bottomBorder: arr,
      hide: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(function () {
      wx.showLoading({title: '加载中'})
    },200)
    wx.setNavigationBarTitle({
      title: '厨师备案',
    })
    try {
      app.post('/manage/chefDetail', {
        m_token: wx.getStorageSync('association').m_token,
        chef_id: options.chef_id
      }).then(res => {
        var rex = res
        if (res.data.status == 1) {
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
              province_code: rex.data.data.basic.chef_province
            }).then(res => {
              if (res.data.status == 1) {
                this.setData({
                  city: res.data.data
                })
              }
            }).then(res => {
              app.post('/region/getAreas', {
                city_code: rex.data.data.basic.chef_city
              }).then(res => {
                if (res.data.status == 1) {
                  this.setData({
                    area: res.data.data
                  })
                }
              }).then(res => {
                app.post('/region/getStreets', {
                  area_code: rex.data.data.basic.chef_area
                }).then(res => {
                  if (res.data.status == 1) {
                    this.setData({
                      street: res.data.data
                    })
                  }
                }).then(res => {
                  app.post('/region/getVillage', {
                    street_code: rex.data.data.basic.chef_street
                  }).then(res => {
                    if (res.data.status == 1) {
                      this.setData({
                        village: res.data.data
                      })
                    }
                  }).then(res => {
                    var cuisine = ''
                    rex.data.data.cuisine.forEach(i => {
                      cuisine += i.cuisine_name + '，'
                    })
                    rex.data.data.basic.cuisine = cuisine.slice(0, cuisine.length - 1)
                    var province = this.data.province.find(i => i.code == rex.data.data.basic.chef_province).name + '，'
                    var city = this.data.city.find(i => i.code == rex.data.data.basic.chef_city).name + '，'
                    var area = this.data.area.find(i => i.code == rex.data.data.basic.chef_area).name + '，'
                    var street = this.data.street.find(i => i.code == rex.data.data.basic.chef_street) ? this.data.street.find(i => i.code == rex.data.data.basic.chef_street).name + '，' : ''
                    var village = this.data.village.find(i => i.code == rex.data.data.basic.chef_village) ? this.data.village.find(i => i.code == rex.data.data.basic.chef_village).name + '，' : ''
                    var region = (province + city + area + street + village)
                    rex.data.data.basic.region = region.slice(0, region.length - 1)
                    var dishe = ''
                    rex.data.data.cookbook.forEach(i=>{
                      i.cooklist.forEach(j=>{
                        dishe+=this.data.disheCategorys.find(k=>k.type == j.cbd_ct_id).name+'，'
                      })
                      i.dishe = dishe.slice(0,dishe.length-1)
                      dishe = ''
                      var a = i.cb_img.indexOf(',')
                      if(a==-1){
                        i.cb_img = i.cb_img.split('')
                      }else{
                        i.cb_img = i.cb_img.split(',')
                      }
                    })
                    this.setData({
                      basic: rex.data.data.basic,
                      sousChef: rex.data.data.kitchen_helper,
                      cookbook:rex.data.data.cookbook,
                      history: rex.data.data.history
                    })
                  })
                })
              })
            })
          })
          setTimeout(function () {
            wx.hideLoading()
          },1200)
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