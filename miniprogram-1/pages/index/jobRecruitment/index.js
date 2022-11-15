// pages/index/jobRecruitment/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobSearchSquare:{
      img:"../../../icon/jobSearchSquare-active.png",
      fontColor:"fontColor"
    },
    mine:{
      img:"../../../icon/mineJob.png",
      fontColor:""
    },
    index:1
  },
  toggle(e){
    var index = e.currentTarget.dataset.index
    if(index == 1){
      this.setData({
        jobSearchSquare:{
          img:"../../../icon/jobSearchSquare-active.png",
          fontColor:"fontColor"
        },
        mine:{
          img:"../../../icon/mineJob.png",
          fontColor:""
        },
        index:1
      })
      wx.setNavigationBarTitle({
        title: '求职-求职广场'
      })
    }else if(index == 2){
      this.setData({
        jobSearchSquare:{
          img:"../../../icon/jobSearchSquare.png",
          fontColor:""
        },
        mine:{
          img:"../../../icon/mineJob-active.png",
          fontColor:"fontColor"
        },
        index:2
      })
      wx.setNavigationBarTitle({
        title: '求职-我的'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '求职-求职广场',
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