// secondary/pages/createTraCQ/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    sourceType: [
      'camera', 'album'
    ],
    active1:'',
    active2:'',
    photo:'',
    name:'',
    IDCard:'',
    companyName:'',
    dutuies:'',
    maskType: 0
    
  },
  openpage(e){
    var item = e.currentTarget.dataset.item
    this.setData({
      show:true,
      maskType: item
    })
    // if(item == 1){

    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '编辑名片',
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