// pages/chefRegister/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filing:{
      img:app.domain+"/img/tabBer/filing-active.png",
      fontColor:"fontColor"
    },
    invite:{
      img:app.domain+"/img/tabBer/information.png",
      fontColor:""
    },
    index:1
  },
  toggle(e){
    var index = e.currentTarget.dataset.index
    if(index == 1){
      this.setData({
        filing:{
          img:app.domain+"/img/tabBer/filing-active.png",
          fontColor:"fontColor"
        },
        invite:{
          img:app.domain+"/img/tabBer/information.png",
          fontColor:""
        },
        index:1
      })
      wx.setNavigationBarTitle({
        title: '我的备案'
      })
    }else if(index == 2){
      this.setData({
        filing:{
          img:app.domain+"/img/tabBer/filing.png",
          fontColor:""
        },
        invite:{
          img:app.domain+"/img/tabBer/information-active.png",
          fontColor:"fontColor"
        },
        index:2
      })
      wx.setNavigationBarTitle({
        title: '我的订单'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      app.post('/index/getMatsuiType').then(res => {
        if (res.data.status == 1) {
          wx.setStorageSync('types', res.data.data)
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
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; //前一个页面
    beforePage.onLoad();
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