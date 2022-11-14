// components/user_orderBasics/user_orderBasics.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    basics:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    domain:app.domain+"/img/chef/",
    type:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      this.setData({
        type:wx.getStorageSync('types')
      })
    }
  }
})
