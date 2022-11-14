// pages/logins/logins.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 1,
    domain: app.domain + "/img/authorize/",
    type: false,
    bdColor1: "",
    bdColor2: "",
    opacity1: "opacity",
    opacity2: "opacity",
    user: "",
    password: "",
    users: app.domain + "/img/authorize/users.png",
    lock: app.domain + "/img/authorize/lock.png",
  },
  taggle() {
    this.setData({
      type: !this.data.type,
    })
  },
  focus(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        bdColor1: "bdColor",
        opacity1: "opacity",
        users: app.domain + "/img/authorize/users-active.png"
      })
    } else if (index == 1) {
      this.setData({
        bdColor2: "bdColor",
        opacity2: "opacity",
        lock: app.domain + "/img/authorize/lock-active.png"
      })
    }
  },
  inputs(e) {
    var index = e.currentTarget.dataset.index
    var val = e.detail.value
    if (index == 0) {
      this.setData({
        user: val
      })
    } else if (index == 1) {
      this.setData({
        password: val
      })
    }
  },
  blur(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      var user = this.data.user
      if (user.trim()=='') {
        this.setData({
          bdColor1: "",
          opacity1: "",
          user: "",
          users: app.domain + "/img/authorize/users.png"
        })
      }
    } else if (index == 1) {
      var password = this.data.password
      if (password.indexOf(" ") != -1 || !password) {
        this.setData({
          bdColor2: "",
          opacity2: "",
          password: "",
          lock: app.domain + "/img/authorize/lock.png"
        })
      }
    }
  },
  login(url,storage,jump,type) {
    var obj = {
      username: this.data.user,
      password: this.data.password
    }
    if(type){
      obj.type = type
    }
    if (obj.username != "" && obj.password != "" && this.data.opacity1 != "" && this.data.opacity2 != "") {
      try {
        app.post(url, obj).then(res => {
          if (res.data.status == 1) {
            wx.setStorageSync(storage, res.data.data)
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000 //持续的时间
              })
              setTimeout(() => {
                wx.redirectTo({
                  url: jump,
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
      } catch {
        wx.showToast({
          title: '网络不稳定~',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    } else {
      wx.showToast({
        title: "用户名或密码错误",
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },
  submitInfo() {
    if(this.data.id==1&&this.data.type == false){
      this.login('/login/gridLogin','gridman', '/secondary/pages/gridman/index')
    } else if(this.data.id==1&&this.data.type == true){
      this.login('/login/manageLogin','admin','/secondary/pages/admin/index',1)
    } else if(this.data.id==2){
      this.login('/login/manageLogin','association','/secondary/pages/association/index',2)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    wx.setNavigationBarTitle({
      title: options.id == 1 ? '食安监管登录' : '厨师协会登录',
    })
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