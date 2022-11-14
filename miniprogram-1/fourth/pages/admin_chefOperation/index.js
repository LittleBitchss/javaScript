// fourth/pages/admin_chefOperation/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg1: "bgColor",
    bg2: "",
    bg3: "",
    arr1: [],
    arr2: [],
    arr3: [],
    show: 0
  },
  toggle(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        bg1: "bgColor",
        bg2: "",
        bg3: "",
        show: 0
      })
    } else if (index == 1) {
      this.setData({
        bg1: "",
        bg2: "bgColor",
        bg3: "",
        show: 1
      })
    } else if (index == 2) {
      this.setData({
        bg1: "",
        bg2: "",
        bg3: "bgColor",
        show: 2
      })
    }
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
      title: '厨师操作',
    })
    try {
      app.post('/manage/chefDetail', {
        m_token: wx.getStorageSync('admin').m_token,
        chef_id: options.chef_id
      }).then(res => {
        if (res.data.status == 1) {
          var history = res.data.data.history
          var operation = history.length == 0 ? [] : history[options.index].operation
          this.setData({
            arr1: history.length == 0 ? [] : operation.length == 0 ? [] : operation.find(i => i.type == 1) == undefined ? [] : operation.find(i => i.type == 1).list,
            arr2: history.length == 0 ? [] : operation.length == 0 ? [] : operation.find(i => i.type == 2) == undefined ? [] : operation.find(i => i.type == 2).list,
            arr3: history.length == 0 ? [] : operation.length == 0 ? [] : operation.find(i => i.type == 3) == undefined ? [] : operation.find(i => i.type == 3).list
          })
        }
        setTimeout(()=>{
          wx.hideLoading()
        },500)
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