// tertiary/pages/admin_gridmanTrack/index.js
const app = getApp()
const utils = require("../../../utils/utils")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    track: [],
    timeValue1: "开始时间",
    timeValue2: "结束时间",
    timeValue1s: "",
    timeValue2s: "",
  },
  bindDateChange(e) {
    var index = e.currentTarget.dataset.index
    if (index == 1) {
      this.setData({
        timeValue1: e.detail.value,
        timeValue1s: e.detail.value
      })
      var obj = {
        m_token: wx.getStorageSync('admin').m_token,
        gm_id: this.data.gm_id,
        start_date: this.data.timeValue1s,
        end_date: this.data.timeValue2s
      }
      if (this.data.timeValue1 != "开始时间" && this.data.timeValue2 != "结束时间") {
        this.requestData(obj)
      }
    } else if (index == 2) {
      this.setData({
        timeValue2: e.detail.value,
        timeValue2s: e.detail.value
      })
      var obj = {
        m_token: wx.getStorageSync('admin').m_token,
        gm_id: this.data.gm_id,
        start_date: this.data.timeValue1s,
        end_date: this.data.timeValue2s
      }
      if (this.data.timeValue1 != "开始时间" && this.data.timeValue2 != "结束时间") {
        this.requestData(obj)
      }
    }
  },
  requestData(data) {
    try {
      app.post('/manage/trajectory', data).then(res => {
        if (res.data.status == 1) {
          console.log(res.data.data);
          this.setData({
            track: res.data.data.rows,
          })
        }
      })
    } catch {
      wx.showToast({
        title: "网络不稳定~",
        icon: 'errer',
        duration: 1000 //持续的时间
      })
    }
  },
  getDate() {
    var date = utils.formatDate(new Date());
    var dateLast = utils.getTimeLastWeek(new Date()); //前7天时间
    this.setData({
      timeValue1s: dateLast,
      timeValue2s: date,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '网格员历史轨迹',
    })
    this.setData({
      gm_id: options.gm_id
    })
    this.getDate()
    var obj = {
      m_token: wx.getStorageSync('admin').m_token,
      gm_id: this.data.gm_id,
      start_date: this.data.timeValue1s,
      end_date: this.data.timeValue2s
    }
    this.requestData(obj)
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