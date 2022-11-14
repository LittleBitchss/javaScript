// pages/login/login.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    defaultOption: {
      id: '000',
      name: '+86'
    },
    titleShow: 1,
    domain: app.domain + "/img/authorize/",
    selected: {},
    phoneBorderColor: "borderColor",
    inputColor: "phoneInputColor",
    phoneImg: app.domain + "/img/authorize/phone.png",
    phoneInputValue: "",
    phoneIsShow: "noShow",
    codeBorderColor: "borderColor",
    codeImg: app.domain + "/img/authorize/code.png",
    codeInputValue: "",
    codeInputValues: "",
    codeIsShow: "noShow",
    passInputValue: "",
    passInputValues: "",
    passIsShow: "noShow",
    passBorderColor: "borderColor",
    //滑块验证
    Verification: "",
    // 发送验证码按钮
    codeText: "发送验证码",
    disabled: false
  },
  change(e) {
    this.setData({
      selected: {
        ...e.detail
      }
    })
    wx.showToast({
      title: `${this.data.selected.id} - ${this.data.selected.name}`,
      icon: 'success',
      duration: 1000
    })
  },
  close() {
    // 关闭select
    this.selectComponent('#select').close()
  },
  //获取电话输入框焦点
  phoneEntry() {
    this.setData({
      phoneBorderColor: "borderColorActive",
      phoneImg: app.domain + "/img/authorize/phone-active.png",
      phoneIsShow: "noShow"
    })
  },
  //输入电话号
  phoneEnter(e) {
    this.setData({
      phoneInputValue: e.detail.value,
    })
  },
  //失去电话输入框焦点
  phoneFinishExit() {
    this.setData({
      phoneBorderColor: "borderColor",
      phoneImg: app.domain + "/img/authorize/phone.png"
    })
    var regExp = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    var newStr = this.data.phoneInputValue
    if (newStr.indexOf(" ") != -1 || !regExp.test(newStr)) {
      this.setData({
        phoneIsShow: ""
      })
    }
  },
  //获取验证码输入框焦点
  codeEntry() {
    this.setData({
      codeBorderColor: "borderColorActive",
      codeImg: app.domain + "/img/authorize/code-active.png",
      codeIsShow: "noShow"
    })
  },
  //输入验证码
  codeEnter(e) {
    console.log(e.detail.value);
    this.setData({
      codeInputValue: e.detail.value,
    })
  },
  //失去验证码输入框焦点
  codeFinishExit() {
    this.setData({
      codeBorderColor: "borderColor",
      codeImg: app.domain + "/img/authorize/code.png"
    })
    var regExp = /^\d{6}$/;
    var newStr = this.data.codeInputValue
    if (newStr.indexOf(" ") != -1 || !regExp.test(newStr)) {
      this.setData({
        codeIsShow: ""
      })
    }
  },
  passEntry() {
    this.setData({
      passBorderColor: "borderColorActive",
      passIsShow: "noShow"
    })
  },
  passEnter(e) {
    this.setData({
      passInputValue: e.detail.value,
    })
  },
  passFinishExit() {
    this.setData({
      passBorderColor: "borderColor"
    })
    var newStr = this.data.passInputValue
    if (newStr.indexOf(" ") != -1 || !newStr) {
      this.setData({
        passIsShow: ""
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  //滑块验证成功后回调
  verificationResult() {
    this.setData({
      Verification: "验证通过"
    })
  },
  // 请求验证码
  requestCode() {
    var that = this
    var countdown;
    var i = 120;
    if (this.data.phoneIsShow == "") {
      wx.showToast({
        title: '手机号码有误',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    } else if (this.data.phoneInputValue == "") {
      wx.showToast({
        title: '手机号码为空',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    } else if (this.data.Verification != "验证通过") {
      wx.showToast({
        title: '请拖动滑块验证',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    } else {
      try {
        wx.showToast({
          title: '发送验证码成功',
          icon: 'success',
          duration: 1000 //持续的时间
        })
        // text变化
        this.setData({
          codeText: i + "秒后重新发送",
          disabled: true
        })
        countdown = setInterval(() => {
          i--
          this.setData({
            codeText: i + "秒后重新发送"
          })
          if (i < 1) {
            i = 120
            this.setData({
              codeText: "重新发送",
              disabled: false
            })
            clearInterval(countdown)
          }
        }, 1000);
        // 发送验证码请求
        let data = {
          type: 2,
          phone: that.data.phoneInputValue,
          ip: app.ip
        }
        app.post('/login/sendMsg', data).then(res => {
          if(res.data.status == 1){
            that.setData({
              codeInputValues: res.data.data
            })
          }else{
            wx.showToast({
              title: "发送失败",
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
  },
  taggles(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        titleShow: 0,
        phoneInputValue: "",
        phoneIsShow: "noShow",
        passInputValue: "",
        passIsShow: "noShow"
      })
    } else if (index == 1) {
      this.setData({
        titleShow: 1,
        phoneInputValue: "",
        phoneIsShow: "noShow",
        codeInputValue: "",
        codeIsShow: "noShow",
      })
    }
  },
  // 登录提交
  loginSubmit(e) {
    const mina = {
      phone: e.detail.value.phone,
      password: e.detail.value.pass,
      code: ""
    }
    const codes = {
      phone: e.detail.value.phone,
      code: e.detail.value.code,
      password: ""
    }
    if (this.data.titleShow == 0) {
      if (codes.phone != "" && codes.code != "") {
        if (this.data.phoneIsShow != "" && this.data.codeIsShow != "") {
          if (this.data.codeInputValue == this.data.codeInputValues) {
            this.Login(codes)
          } else {
            wx.showToast({
              title: '验证码错误',
              icon: 'error',
              duration: 1000 //持续的时间
            })
          }
        } else {
          wx.showToast({
            title: '信息错误',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      } else {
        wx.showToast({
          title: '信息不为空',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    } else if (this.data.titleShow == 1) {
      if (mina.phone != "" && mina.password != "") {
        if (this.data.phoneIsShow != "" && this.data.passIsShow != "") {
          this.Login(mina)
        } else {
          wx.showToast({
            title: '信息错误',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      } else {
        wx.showToast({
          title: '信息不为空',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    }
  },
  Login(data) {
    try {
      app.post('/login/login', data).then(res => {
        if (res.data.status == 1) {
          console.log(res);
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000 //持续的时间
          })
          var userInfo = wx.getStorageSync('userInfo')
          userInfo.chef_token = res.data.data.token
          wx.setStorageSync('userInfo', userInfo)
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/mine/chefRegister/index',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      })
    }catch{
      wx.showToast({
        title: '网络不稳定~',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },

  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '厨师登录'
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})