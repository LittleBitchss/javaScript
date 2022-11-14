// tertiary/pages/findChef_chefSchedule/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: [],
    types: [],
    chef_id: 0,
    chef_phone:'',
    lockday:''
  },
  sendMsg(phone) {
    app.post('/send/sms', {
      type: 1,
      phone: phone,
      ip: '127.0.0.1',
      chef_id: 0
    }).then(res => {
      if (res.data.status == 1) {
        // wx.showToast({
        //   title: '已接受邀请',
        //   icon: 'success',
        //   duration: 1000 //持续的时间
        // })
      }
    })
  },
  subscribe(e) {
    var m_id = e.currentTarget.dataset.m_id
    var that = this
    wx.showModal({
      title: '',
      content: '请确保宴会日期是否符合厨师空闲状态',
      confirmText: '符合',
      cancelText: '取消',
      cancelColor: '#b6b6b6',
      confirmColor: '#4768f3',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '预约中'
          })
          try {
            app.post('/house/appointment', {
              token: wx.getStorageSync('userInfo').token,
              chef_id: that.data.chef_id,
              m_id: m_id
            }).then(res => {
              if (res.data.status == 1) {
                wx.showToast({
                  title: '预约成功',
                  icon: 'success',
                  duration: 1000 //持续的时间
                })
                setTimeout(()=>{
                  wx.navigateBack({
                    delta: 1
                  })
                  that.sendMsg(that.data.chef_phone)
                },1000)
              } else {
                wx.showToast({
                  title: '当前系统繁忙~',
                  icon: 'error',
                  duration: 1000 //持续的时间
                })
              }
            })
          } catch {
            wx.showToast({
              title: '网络不稳定~',
              icon: 'error',
              duration: 1000 //持续的时间
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中'
    })
    wx.setNavigationBarTitle({
      title: '预约厨师',
    })
    this.setData({
      types: wx.getStorageSync('types'),
      chef_id: options.chef_id,
      chef_phone: options.chef_phone
    })
    try {
      app.post('/house/applicationList', {
        token: wx.getStorageSync('userInfo').token
      }).then(res => {
        if (res.data.status == 1) {
          res.data.data = res.data.data.filter(i => i.o_paid == 1)
          res.data.data = res.data.data.filter(i => i.mi_accept_invitation != 1)
          res.data.data = res.data.data.filter(i => i.expired != 1)
          res.data.data = res.data.data.filter(i => i.mi_accept_invitation != 3)
          res.data.data = res.data.data.filter(i => i.m_approval != 3)
          res.data.data = res.data.data.filter(i => i.m_approval != 2)
          res.data.data = res.data.data.filter(i => {
            if(i.chef_id){
              if(i.chef_id.find(i=>i==this.data.chef_id)==undefined){
                return i
              }
            }else{
              return i
            }
          })
          this.setData({
            listArr: res.data.data
          })
        } else {
          wx.showToast({
            title: '当前系统繁忙~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      })
      app.post('/comm/getChefInsurance', {
        chef_id: options.chef_id
      }).then(res => {
        if (res.data.status == 1) {
          this.setData({
            lockday:res.data.data
          })
        } else {
          wx.showToast({
            title: '当前系统繁忙~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      })
      setTimeout(()=>{
        wx.hideLoading()
      },500)
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