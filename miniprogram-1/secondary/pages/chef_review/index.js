// secondary/pages/chef_review/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m_id: "",
    mi_score: "",
    mi_evaluate: "",
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
      title: '本次评论',
    })
    this.setData({
      m_id: options.m_id,
      mi_score: options.mi_score,
      mi_evaluate: options.mi_evaluate
    })
    setTimeout(()=>{
      wx.hideLoading()
    },500)
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