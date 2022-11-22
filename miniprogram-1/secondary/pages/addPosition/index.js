// secondary/pages/addPosition/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    type:0,
    desiredPosition:[
      {
        position:'行政主厨',
        salary:'1万-1.2万'
      }
    ]
  },
  openMask(e) {
    var item = e.currentTarget.dataset.item
    this.setData({
      show:true,
      type:item
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '添加求职期望',
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