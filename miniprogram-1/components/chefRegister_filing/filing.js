// components/filing/filing.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    bottomBorder: ["active", "", ""],
    hide: 0,
    domain: app.domain + "/img/chef/"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      var arr = ["", "", ""]
      var index = Number(e.target.dataset.index)
      arr[index] = "active"
      this.setData({
        bottomBorder: arr,
        hide: index
      })
    },
    clicks() {
      var userInfo = wx.getStorageSync('userInfo')
      wx.showModal({
        title: '警 告',
        content: '确认是否退出！',
        success: function (res) {
          if (res.confirm) {
            delete userInfo.chef_token
            wx.setStorageSync('userInfo', userInfo)
            wx.navigateBack({
              delta: 2
            })
          }
        }
      })
    }
  }
})