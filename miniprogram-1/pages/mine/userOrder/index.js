// pages/userOrder/index.js
const app = getApp()
const utils = require("../../../utils/utils")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain + "/img/chef/",
    activeArr: [{
        name: '全部',
        active: "active",
        point:0
      },
      {
        name: '待支付',
        active: "",
        point:0
      }, {
        name: '待审核',
        active: "",
        point:0
      }, {
        name: '服务中',
        active: "",
        point:0
      }, {
        name: '退款',
        active: "",
        point:0
      }, {
        name: '待评价',
        active: "",
        point:0
      }
    ],
    isShow: 0,
    listArr: [],
    listArr2: [],
    listArr3: [],
    listArr4: [],
    listArr5: [],
    listArr6: [],
    types: []
  },
  block() {},
  taggle(e) {
    var item = e.currentTarget.dataset.item
    var activeArr = JSON.parse(JSON.stringify(this.data.activeArr))
    activeArr.forEach(i => {
      i.active = ''
    })
    if (item == 0) {
      activeArr[item].active = 'active'
      this.setData({
        isShow: 0
      })
    } else if (item == 1) {
      activeArr[item].active = 'active'
      this.setData({
        isShow: 1
      })
    } else if (item == 2) {
      activeArr[item].active = 'active'
      this.setData({
        isShow: 2
      })
    } else if (item == 3) {
      activeArr[item].active = 'active'
      this.setData({
        isShow: 3
      })
    } else if (item == 4) {
      activeArr[item].active = 'active'
      this.setData({
        isShow: 4
      })
    } else if (item == 5) {
      activeArr[item].active = 'active'
      this.setData({
        isShow: 5
      })
    }
    this.setData({
      activeArr: activeArr
    })
  },
  findChef(e) {
    var o_status = e.currentTarget.dataset.o_status
    var m_id = e.currentTarget.dataset.m_id
    var m_insurance_count = e.currentTarget.dataset.m_insurance_count
    var m_matsuri_type = e.currentTarget.dataset.m_matsuri_type
    if (o_status==0||o_status==null) {
      wx.showModal({
        title: '',
        content: '尚未支付定金，立即前往',
        confirmText: '去支付',
        cancelText: '取消',
        cancelColor: '#b6b6b6',
        confirmColor: '#4768f3',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/secondary/pages/user_orderPay/index?m_id=' + m_id + '&m_insurance_count=' + m_insurance_count + '&type=' + m_matsuri_type
            })
          }
        }
      })
    } else {
      wx.switchTab({
        url: '/pages/findChef/index'
      })
    }
  },
  approval(e) {
    var remark = e.currentTarget.dataset.remark
    var mi_chef_reson = e.currentTarget.dataset.mi_chef_reson
    if (mi_chef_reson) {
      wx.showModal({
        title: '厨师取消原因',
        showCancel: false,
        confirmText: "关闭",
        content: mi_chef_reson
      })
    } else {
      wx.showModal({
        title: '审批意见',
        showCancel: false,
        confirmText: "关闭",
        content: remark ? remark : '无'
      })
    }
  },
  cancel(e) {
    var m_id = e.currentTarget.dataset.m_id
    var invitation = e.currentTarget.dataset.invitation
    var that = this
    wx.showModal({
      title: invitation == 1 ? '厨师已接受邀请，现在取消预约金不可退' : '取消原因',
      placeholderText: "请输入取消原因",
      content: '',
      editable: true,
      success(res) {
        if (res.confirm) {
          if (res.content.trim() != "") {
            try {
              app.post('/house/cancelMatsuri', {
                token: wx.getStorageSync('userInfo').token,
                m_id: m_id,
                remark: res.content
              }).then(res => {
                if (res.data.status == 1) {
                  wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 1000 //持续的时间
                  })
                  that.getOrder()
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
          } else {
            wx.showToast({
              title: '请输入取消原因',
              icon: 'error',
              duration: 2000
            })
          }
        }
      }
    })
  },
  getDate(days) {
    var date = utils.formatDate(new Date());
    var start_num = new Date(date.replace(/-/g, "/"))
    var end_num = new Date(days.replace(/-/g, "/"))
    let day = parseInt((end_num.getTime() - start_num.getTime()) / (1000 * 60 * 60 * 24))
    return day
  },
  getDates(days) {
    var date = utils.formatDate(new Date());
    var start_num = new Date(date.replace(/-/g, "/"))
    var end_num = new Date(days.replace(/-/g, "/"))
    let day = parseInt((start_num.getTime() - end_num.getTime()) / (1000 * 60 * 60 * 24))
    return day
  },
  getOrder() {
    var activeArr = JSON.parse(JSON.stringify(this.data.activeArr))
    try {
      app.post('/house/applicationList', {
        token: wx.getStorageSync('userInfo').token
      }).then(res => {
        if (res.data.status == 1) {
          res.data.data.forEach(i => {
            var banCancel = this.getDate(i.m_start_date)
            if (banCancel <= 0) {
              i.banCancel = true
            } else {
              i.banCancel = false
            }
          })
          var listArr2 = res.data.data.filter(i => i.o_status!=3 && i.m_approval != (3 || 2) && i.banCancel == false && i.mi_accept_invitation != (2 || 3))
          var listArr3 = res.data.data.filter(i => i.m_approval == 0 && i.m_matsuri_type == 1 && i.banCancel == false)
          var listArr4 = res.data.data.filter(i => i.o_status==3 && ((i.m_approval == 1 && i.m_matsuri_type == 1) || (i.m_approval == 0 && i.m_matsuri_type == 2)) && i.mi_accept_invitation == 1)
          var listArr5 = res.data.data.filter(i => i.o_status==3 && (i.mi_accept_invitation == 3 || (i.mi_accept_invitation == 2 && i.banCancel == true) || (i.mi_accept_invitation == 0 && i.banCancel == true) || i.m_approval == 2 || (i.m_approval == 3 && i.mi_accept_invitation != 1) || (i.m_approval == 1 && i.banCancel == true && i.mi_accept_invitation != 1) || (i.m_approval == 0 && i.banCancel == true && i.mi_accept_invitation != 1)) && i.o_refund_id == null)
          var listArr6 = res.data.data.filter(i => i.o_status==3 && (i.m_approval == 1 && i.m_matsuri_type == 1) && i.mi_accept_invitation == 3 && i.expired == 1 && i.o_refund_id && i.mi_score == null)
          activeArr[0].point=res.data.data.length
          activeArr[1].point=listArr2.length
          activeArr[2].point=listArr3.length
          activeArr[3].point=listArr4.length
          activeArr[4].point=listArr5.length
          activeArr[5].point=listArr6.length
          this.setData({
            listArr: res.data.data,
            listArr2: listArr2,
            listArr3: listArr3,
            listArr4: listArr4,
            listArr5: listArr5,
            listArr6: listArr6,
            activeArr:activeArr
          })
          let pages = getCurrentPages()
          pages[pages.length - 2].onLoad()
        }
        setTimeout(()=>{
          wx.hideLoading()
        },500)
      })
    } catch {
      wx.showToast({
        title: '网络不稳定~',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },
  confirmCompleted(e) {
    var m_id = e.currentTarget.dataset.m_id
    try {
      app.post('/house/complate', {
        token: wx.getStorageSync('userInfo').token,
        m_id: m_id
      }).then(res => {
        if (res.data.status == 1) {
          wx.showToast({
            title: '已完成订单',
            icon: 'success',
            duration: 1000 //持续的时间
          })
          this.getOrder()
          setTimeout(() => {
            var activeArr = JSON.parse(JSON.stringify(this.data.activeArr))
            activeArr.forEach(i => {
              i.active = ''
            })
            activeArr[4].active = 'active'
            this.setData({
              isShow: 4,
              activeArr: activeArr
            })
          }, 1000)
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
  },
  refund(e) {
    var sn = e.currentTarget.dataset.sn
    var that = this
    wx.showModal({
      title: '退款原因',
      placeholderText: "请输入退款原因",
      content: '',
      editable: true,
      success(res) {
        if (res.confirm) {
          if (res.content.trim() != "") {
            try {
              app.post('/appletpay/refund', {
                sn: sn,
                reason:res.content
              }).then(res => {
                if (res.data.status == 1) {
                  wx.showToast({
                    title: '已申请退款',
                    icon: 'success',
                    duration: 1000 //持续的时间
                  })
                  that.getOrder()
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
          } else {
            wx.showToast({
              title: '请输入退款原因',
              icon: 'error',
              duration: 2000
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
    setTimeout(()=>{
      wx.showLoading({
        title: '加载中',
      })
    },200)
    wx.setNavigationBarTitle({
      title: '我的订单',
    })
    var activeArr = JSON.parse(JSON.stringify(this.data.activeArr))
    activeArr.forEach(i => {
      i.active = ''
    })
    activeArr[options.index].active = 'active'
    this.setData({
      types: wx.getStorageSync('types'),
      isShow: options.index,
      activeArr: activeArr
    })
    this.getOrder()
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