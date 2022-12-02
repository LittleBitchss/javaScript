// secondary/pages/resumeInfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.item==1){
      this.setData({
        title:'已收简历'
      })
    }else if(options.item==2){
      this.setData({
        title:'未阅简历'
      })
    }else if(options.item==3){
      this.setData({
        title:'已阅简历'
      })
    }else if(options.item==4){
      this.setData({
        title:'标记简历'
      })
    }
    wx.setNavigationBarTitle({
      title: this.data.title,
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