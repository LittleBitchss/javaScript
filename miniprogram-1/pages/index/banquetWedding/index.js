// pages/banquetWedding/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navBg1:"navBg",
    navBg2:"",
    navBg3:"",
    navBg4:"",
    navBg5:"",
    navBg6:"",
    isShow:1
  },
  taggle(e){
    var item = e.currentTarget.dataset.item
    if(item==1){
      this.setData({
        navBg1:"navBg",
        navBg2:"",
        navBg3:"",
        navBg4:"",
        navBg5:"",
        navBg6:"",
        isShow:1
      })
    }else if(item == 2){
      this.setData({
        navBg1:"",
        navBg2:"navBg",
        navBg3:"",
        navBg4:"",
        navBg5:"",
        navBg6:"",
        isShow:2
      })
    }else if(item == 3){
      this.setData({
        navBg1:"",
        navBg2:"",
        navBg3:"navBg",
        navBg4:"",
        navBg5:"",
        navBg6:"",
        isShow:3
      })
    }else if(item == 4){
      this.setData({
        navBg1:"",
        navBg2:"",
        navBg3:"",
        navBg4:"navBg",
        navBg5:"",
        navBg6:"",
        isShow:4
      })
    }else if(item == 5){
      this.setData({
        navBg1:"",
        navBg2:"",
        navBg3:"",
        navBg4:"",
        navBg5:"navBg",
        navBg6:"",
        isShow:5
      })
    }else if(item == 6){
      this.setData({
        navBg1:"",
        navBg2:"",
        navBg3:"",
        navBg4:"",
        navBg5:"",
        navBg6:"navBg",
        isShow:6
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '宴会婚庆',
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