// pages/authorizedLogin/index.js
const app = getApp()
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    domain: app.domain + "/img/index/",
  },
  onLoad: function () {
    // 查看是否授权
    wx.checkSession({
      success: function (res) {
        if (wx.getStorageSync('userInfo').token) {
          wx.switchTab({
            url: "/pages/index/index"
          })
        }
      },
      fail: function (res) {

      }
    })
    wx.setNavigationBarTitle({
      title: '授权登录',
    })
  },

  bindGetUserInfo: function (res) {
    wx.getUserProfile({
      desc: '正在获取', //不写不弹提示框
      success: function (res) {
        var userInfo = res.userInfo
        wx.login({
          success: res => {
            try {
              app.post('/wx/getWxLoginInfo', {
                appid: "wx5484c680eaccf84e",
                code: res.code
              }).then(res => {
                if (res.statusCode == 200) {
                  userInfo.openid = res.data.openid
                  app.post('/login/appletLogin', {
                    au_openid: userInfo.openid,
                    au_nick_name: userInfo.nickName
                  }).then(res => {
                    if (res.data.status == 1) {
                      userInfo.token = res.data.data.token
                      userInfo.user_id = res.data.data.user_id
                      console.log(userInfo);
                      wx.setStorageSync('userInfo',userInfo)  //存储用户信息
                      wx.showToast({
                        title: "授权成功",
                        icon: 'success',
                        duration: 1000 //持续的时间
                      })
                      setTimeout(() => {
                        wx.switchTab({
                          url: "/pages/index/index"
                        })
                      }, 1000)
                    }
                  })
                }
              })
            } catch {
              wx.showToast({
                title: "网络不稳定~",
                icon: 'error',
                duration: 1000 //持续的时间
              })
            }
          }
        });
      },
      fail: function (err) {
        wx.showModal({
          title: '警告',
          content: '您拒绝授权，将无法进入小程序!!!',
          showCancel: false,
          confirmText: '关闭',
          success: function (res) {
            // 用户没有授权成功，不需要改变 isHide 的值
            if (res.confirm) {
              // wx.navigateTo({
              //   url: '/pages/authorizedLogin/index'
              // })
            }
          }
        });
      }
    })
  }
})