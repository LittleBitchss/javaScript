// pkgA/pages/familyDinnerApplication/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain + "/img/chef/",
    isShow: 1
  },
  nextStep1(e) {
    var {
      go
    } = e.detail
    this.setData({
      isShow: go
    })
  },
  previous2(e) {
    var {
      go
    } = e.detail
    this.setData({
      isShow: go
    })
  },
  nextStep2(e) {
    var {
      go
    } = e.detail
    this.setData({
      isShow: go
    })
  },
  previous3(e) {
    var {
      go
    } = e.detail
    this.setData({
      isShow: go
    })
  },
  nextStep3(e) {
    var {
      go
    } = e.detail
    this.setData({
      isShow: go
    })
  },
  previous4(e) {
    var {
      go
    } = e.detail
    this.setData({
      isShow: go
    })
  },
  nextStep4(e) {
    var {
      go
    } = e.detail
    this.setData({
      isShow: go
    })
  },
  tagles(){
    this.triggerEvent("tagles",{go:0})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '家宴报备',
    })
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