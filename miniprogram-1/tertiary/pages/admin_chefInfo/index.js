// tertiary/pages/admin_chefInfo/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chefArrs: [],
    active1: "active",
    active2: "",
    active3: "",
    isShows: 1,
    grade: [{
      code: '1',
      name: '初级（国家职业资格五级）'
    }, {
      code: '2',
      name: '中级（国家职业资格四级）'
    }, {
      code: '003',
      name: '高级（国家职业资格三级）'
    }, {
      code: '4',
      name: '技师（国家职业资格二级）'
    }, {
      code: '5',
      name: '高级技师（国家职业资格一级）'
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
    basic: {},
    sousChefArr: [],
    historyArr: [],
    page: 1
  },
  tagle(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        active1: "active",
        active2: "",
        active3: "",
        isShows: 1
      })
    } else if (item == 2) {
      this.setData({
        active1: "",
        active2: "active",
        active3: "",
        isShows: 2
      })
    } else if (item == 3) {
      this.setData({
        active1: "",
        active2: "",
        active3: "active",
        isShows: 3
      })
    }
  },
  checkWhy(e){
    var mi_remark = e.currentTarget.dataset.mi_remark
    var m_approval_remark = e.currentTarget.dataset.m_approval_remark
    var mi_chef_reson = e.currentTarget.dataset.mi_chef_reson
    if(mi_remark){
      wx.showModal({
        title: '用户取消原因',
        showCancel: false,
        confirmText: "关闭",
        content: mi_remark
      })
    }else if(m_approval_remark){
      wx.showModal({
        title: '审核不通过原因',
        showCancel: false,
        confirmText: "关闭",
        content: m_approval_remark
      })
    }else if(mi_chef_reson){
      wx.showModal({
        title: '厨师取消原因',
        showCancel: false,
        confirmText: "关闭",
        content: mi_chef_reson
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(()=>{
      wx.showLoading({
        title: '加载中'
      })
    },200)
    wx.setNavigationBarTitle({
      title: '厨师信息',
    })
    var admin = wx.getStorageSync('admin').location
    try {
      app.post('/manage/chefDetail', {
        m_token: wx.getStorageSync('admin').m_token,
        chef_id: options.chef_id
      }).then(res => {
        var rex = res
        console.log(res);
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
                    this.setData({
                      basic: rex.data.data.basic,
                      sousChefArr: rex.data.data.kitchen_helper,
                      historyArr: rex.data.data.history
                    })
                  })
                })
              })
            })
          })
        }
        setTimeout(()=>{
          wx.hideLoading()
        },1000)
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