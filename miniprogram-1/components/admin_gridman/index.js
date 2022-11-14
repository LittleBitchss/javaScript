// components/admin_gridman/index.js
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
    listArr: [],
    page: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 请求数据
    requestData(page, callback) {
      wx.showLoading({
        title: '加载中'
      })
      try {
        app.post('/manage/gmList', {
          m_token: wx.getStorageSync('admin').m_token,
          page: page
        }).then(res => {
          if (res.data.status == 1) {
            callback(res.data.data.rows)
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
    lower() {
      if (this.data.listArr.length % 20 == 0) {
        this.setData({
          page: this.data.page + 1
        })
        this.requestData(this.data.page, (res) => {
          if (res.length == 0) {
            wx.hideLoading()
            wx.showToast({
              title: '没有了~',
              icon: 'error',
              duration: 1000 //持续的时间
            })
          } else {
            this.setData({
              listArr:this.data.listArr.concat(res)
            })
            wx.showToast({
              title: '加载成功',
              icon: 'success',
              duration: 1000 //持续的时间
            })
          }
        })
      }
    },
  },
  lifetimes: {
    attached: function () {
      this.requestData(this.data.page, (res) => {
        wx.hideLoading()
        if (res.length == 0) {
          wx.showToast({
            title: '没有了~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        } else {
          this.setData({
            listArr:res
          })
          // wx.showToast({
          //   title: '加载成功',
          //   icon: 'success',
          //   duration: 1000 //持续的时间
          // })
        }
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})