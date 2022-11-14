// tertiary/pages/mine_chefInfo/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[1,2,3],
    active1:'active',
    active2:'',
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
    toView: '',
    isShow:false,
    chefArr:[],
    cuisine:[],
    chef_id:0
  },
  taggle(e){
    var item = e.currentTarget.dataset.item
    if(item==1){
      this.setData({
        active1:'active',
        active2:'',
        isShow:1,
        toView: 'yuyue'
      })
    }else if(item==2){
      this.setData({
        active1:'',
        active2:'active',
        isShow:2,
        toView: 'renzheng'
      })
    }
  },
  handelScroll(e){
    if(e.detail.scrollTop>=311){
      this.setData({
        isShow:true
      })
    }else{
      this.setData({
        isShow:false,
        active1:'active',
        active2:'',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      chef_id:options.chef_id
    })
    wx.setNavigationBarTitle({
      title: '厨师详情',
    })
    try {
      app.post('/house/chefDetail', {
        token:wx.getStorageSync('userInfo').token,
        chef_id:options.chef_id
      }).then(res => {
        if (res.data.status == 1) {
          res.data.data.cookbook.forEach(i=>{
            if(i.cb_img.indexOf(',')==-1){
              i.cb_img= i.cb_img.split('')
            }else{
              i.cb_img= i.cb_img.split(',')
            }
          })
          var cuisine = res.data.data.cuisine
          var a = cuisine.indexOf(',')
          if(a==-1){
            res.data.data.cuisine = cuisine.split('')
          }else{
            res.data.data.cuisine = cuisine.split(',')
          }
          this.setData({
            chefArr:res.data.data
          })
        } else {
          wx.showToast({
            title: '服务器繁忙~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      })
    } catch (error) {
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