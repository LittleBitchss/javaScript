// tertiary/pages/chef_commit/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m_id: "",
    mi_id: "",
    m_phone: "",
    m_matsuri_type: "",
    flag:0
  },
  sendMsg(type,phone,chef_id){
    app.post('/send/sms', {
      type: type,
      phone: phone,
      ip:'127.0.0.1',
      chef_id: chef_id
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
  accept() {
    var that = this
    wx.showModal({
      title: '',
      content: '确认接受该订单？',
      confirmText: '确定',
      cancelText: '取消',
      cancelColor: '#b6b6b6',
      confirmColor: '#4768f3',
      success(res) {
        if (res.confirm) {
          try {
            app.post('/chefoperation/acceptInvitation', {
              token: wx.getStorageSync('userInfo').chef_token,
              m_id: that.data.m_id,
              mi_id: that.data.mi_id
            }).then(res => {
              if (res.data.status == 1) {
                that.sendMsg(2,that.data.m_phone,wx.getStorageSync('chefInfo').chef_id)
                that.setData({
                  flag:1
                })
                wx.showToast({
                  title: '已接受邀请',
                  icon: 'success',
                  duration: 1000 //持续的时间
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 2
                  })          
                }, 1000);
              }else{
                wx.showToast({
                  title: '该订单已被接受',
                  icon: 'success',
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
    wx.setNavigationBarTitle({
      title: '农村宴席食品卫生安全承诺书',
    })
    this.setData({
      m_id: options.m_id,
      mi_id: options.mi_id,
      m_phone: options.m_phone,
      m_matsuri_type: options.m_matsuri_type
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
    if(this.data.flag){
      let pages = getCurrentPages(); // 当前页面
      let beforePage = pages[pages.length - 3]; //前一个页面
      let myComponent = beforePage.selectComponent('#myComponent')
      myComponent.aaa();
    }
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