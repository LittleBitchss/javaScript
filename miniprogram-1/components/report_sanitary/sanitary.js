// components/sanitary/sanitary.js
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
    submit: "submit",
    change: "change",
    disabled1: false,
    disabled2: true,
    val1: "",
    val2: "",
    val3: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkboxChange(e) {
      var index = e.currentTarget.dataset.index
      var val = e.detail.value
      if (index == 1) {
        this.setData({
          val1: val
        })
      } else if (index == 2) {
        this.setData({
          val2: val
        })
      } else if (index == 3) {
        this.setData({
          val3: val
        })
      }
    },
    _setObj(params) {
      let flag = true;
      for (var key in params) {
        if (params[key] != '0' && !params[key]) {
          return false; // 终止程序
        }
      }
      return flag;
    },
    previous4() {
      this.triggerEvent("previous4", {
        go: 3
      })
    },
    submitInfo() {
      var entryInfo = wx.getStorageSync('entryInfo')
      var selAddr = wx.getStorageSync('selAddr')
      if (selAddr.m_ids == 2) {
        selAddr = {
          m_auditorium_id: selAddr.m_auditorium_id,
          m_ao_id: selAddr.m_ao_id
        }
      }
      delete selAddr.m_ids
      entryInfo = Object.assign(entryInfo, selAddr)
      var foodSource = wx.getStorageSync('foodSource')
      var obj = {
        token: wx.getStorageSync('userInfo').token,
        m_id: 0,
        m_matsuri_type: 1,
        basic: entryInfo,
        food_source: foodSource,
        food_sanitary: {
          sc_id: 0,
          sc_water_source: this.data.val1 ? this.data.val1.join("，") : "",
          sc_disinfection_method: this.data.val2 ? this.data.val2.join("，") : "",
          sc_toxic_harmful: this.data.val3 ? this.data.val3.join("，") : ""
        }
      }
      var bol = this._setObj(obj.food_sanitary)
      if (bol) {
        obj.basic = JSON.stringify(obj.basic)
        obj.food_source = JSON.stringify(obj.food_source)
        obj.food_sanitary = JSON.stringify(obj.food_sanitary)
        try {
          app.post('/house/matsuriApplication', obj).then(res => {
            if (res.data.status == 1) {
              wx.removeStorageSync('entryInfo')
              wx.removeStorageSync('selAddr')
              wx.removeStorageSync('foodSource')
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 500 //持续的时间
              })
              setTimeout(()=>{
                wx.showLoading({
                  title: '跳转中...',
                })
              },500)
              setTimeout(()=>{
                wx.hideLoading()
                wx.redirectTo({
                  url: '/secondary/pages/user_orderPay/index?m_id='+res.data.data.m_id+'&type='+res.data.data.type+'&whereDoes=1'
                })
              },1000)
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
          title: '请完善信息',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    },
  }
})