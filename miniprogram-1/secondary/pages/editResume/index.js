// secondary/pages/editResume/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    maskType:0,

    areaf:false,
    areaVal:'',
    areaWords:0,

  },
  openMask(e){
    var item = e.currentTarget.dataset.item
    this.setData({
      show:true,
      maskType:item
    })
    if(this.data.maskType==2){
      this.setData({
        areaf:true
      })
    }
  },

  areaI(e){
    this.setData({
      areaVal:e.detail.value,
      areaWords:e.detail.cursor
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '在线简历',
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