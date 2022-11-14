// fourth/pages/chef_safety/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain + "/img/chefs/",
    active1: "active",
    active2: "",
    isShow: 1,
    show: false,
    isAssure: "",

    imgArr: [1, 2, 3],
    isShows: false,
    disabled1: true,
    anima: "",
    countdown: "(还须阅览5秒)",
    btnColor: "",
    isCheck1: 0,
    isCheck2: 0,

    insurance: 0.01,

    m_id: 0,
    mi_id: 0,
    m_phone: '',
    flag:0
  },
  taggle(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        active1: "active",
        active2: "",
        isShow: 1,
        isAssure: "",
        insurance: 0.01,
      })
    } else if (item == 2) {
      this.setData({
        active1: "",
        active2: "active",
        isShow: 2,
        isAssure: "content1_right",
        insurance: 0,
      })
    }
  },
  coverDetails() {
    this.setData({
      show: true
    })
    wx.setNavigationBarTitle({
      title: '保障详情',
    })
  },
  eventhandle() {
    wx.setNavigationBarTitle({
      title: '食安保险',
    })
  },
  close() {
    this.setData({
      show: false
    })
  },
  // 协议
  openNotice(e) {
    var item = e.currentTarget.dataset.item
    var i = 5
    var timing;
    if (item == 1) {
      this.setData({
        isShows: true,
        anima: "down",
        isCheck1: 1,
      })
    } else if (item == 2) {
      this.setData({
        isShows: true,
        anima: "down",
        isCheck2: 1,
      })
    }
    timing = setInterval(() => {
      i--
      this.setData({
        countdown: "(还须阅览" + i + "秒)",
      })
      if (i < 1) {
        this.setData({
          countdown: "",
          disabled1: false,
          btnColor: "bttns"
        })
        clearInterval(timing)
      }
    }, 1000)
  },
  closeNotice() {
    if (this.data.isCheck1 == 1) {
      this.setData({
        anima: "up",
        disabled1: true,
        isCheck1: 2,
      })
    } else if (this.data.isCheck2 == 1) {
      this.setData({
        anima: "up",
        disabled1: true,
        isCheck2: 2,
      })
    }
    setTimeout(() => {
      this.setData({
        countdown: "(还须阅览180秒)",
        isShows: false,
        btnColor: ""
      })
    }, 600)
  },
  sendMsg(type, phone, chef_id) {
    app.post('/send/sms', {
      type: type,
      phone: phone,
      ip: '127.0.0.1',
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
  setOrder() {
    app.post('/chefoperation/acceptInvitation', {
      token: wx.getStorageSync('userInfo').chef_token,
      m_id: this.data.m_id,
      mi_id: this.data.mi_id
    }).then(res => {
      if (res.data.status == 1) {
        this.sendMsg(2, this.data.m_phone, wx.getStorageSync('chefInfo').chef_id)
        this.setData({
          flag:1
        })
        // wx.showToast({
        //   title: '已接受邀请',
        //   icon: 'success',
        //   duration: 1000 //持续的时间
        // })
        setTimeout(function () {
          wx.navigateBack({
            delta: 3
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
  },
  // 投保
  insure() {
    var userInfo = wx.getStorageSync('userInfo')
    if (this.data.isCheck1 == 2 && this.data.isCheck2 == 2) {
      //下订单并唤起微信支付
      var price = this.data.insurance / 0.01; //支付金额
      var openid = userInfo.openid; //这里传用户openid,怎么获取用户的openid这里就不详细的说了
      var that = this;
      if(this.data.isShow==1){
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
                app.post('/appletpay/addOrder', {
                  token: userInfo.token,
                  openid: openid,
                  title: "乡宴保险",
                  m_id: that.data.m_id,
                  chef_id: wx.getStorageSync('chefInfo').chef_id,
                  mi_id: that.data.mi_id,
                  type: 2,
                  total_price: price
                }).then(res => {
                  if (res.statusCode == 200) {
                    //客户单发起微信请求
                    wx.requestPayment({
                      'appId': 'wx5484c680eaccf84e',
                      'timeStamp': res.data.timeStamp,
                      'nonceStr': res.data.nonceStr,
                      'package': res.data.package,
                      'signType': res.data.signType,
                      'paySign': res.data.paySign,
                      'success': function (res) {
                        wx.showToast({
                          title: '支付成功',
                          icon: 'success',
                          duration: 1000
                        })
                        that.setOrder()
                      },
                      'fail': function (res) {
                        if (res.errMsg == "requestPayment:fail cancel") {
                          wx.showToast({
                            title: '支付取消',
                            duration: 1000
                          })
                        } else {
                          wx.showToast({
                            title: '支付失败',
                            icon: 'error',
                            duration: 1000
                          })
                        }
                      },
                      'complete': function (res) {}
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
      }else if(this.data.isShow==2){
        wx.showModal({
          title: '',
          content: '确认接受该订单？',
          confirmText: '确定',
          cancelText: '取消',
          cancelColor: '#b6b6b6',
          confirmColor: '#4768f3',
          success(res) {
            if (res.confirm) {
              that.setOrder()
            }
          }
        })
      }
    } else {
      wx.showToast({
        title: '请阅读须知条款',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '食安保险',
    })
    this.setData({
      m_id: options.m_id,
      mi_id: options.mi_id,
      m_phone: options.m_phone,
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
    if (this.data.flag) {
      let pages = getCurrentPages(); // 当前页面
      let beforePage = pages[pages.length - 4]; //前一个页面
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