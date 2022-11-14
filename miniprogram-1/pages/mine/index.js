// pages/mine/index.js
const app = getApp()
const utils = require("../../utils/utils")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: "",
    nickName: "",
    functionBars: [{
        src: "../../icon/mine_refundAfterSale.png",
        text: "待支付",
        point:0
      },
      {
        src: "../../icon/mine_order.png",
        text: "待审核",
        point:0
      },
      {
        src: "../../icon/mine_collect.png",
        text: "服务中",
        point:0
      },
      {
        src: "../../icon/mine_refundAfterSale.png",
        text: "退款",
        point:0
      },
      {
        src: "../../icon/mine_assess.png",
        text: "待评论",
        point:0
      }
    ],
    functionLists: [{
        url: "/pages/mine/login/index",
        src: "../../icon/mine_chefRegister.png",
        text: "厨师注册"
      },
      {
        url: "../../icon/mine_trainingEntrance.png",
        src: "../../icon/mine_trainingEntrance.png",
        text: "培训入口"
      },
      {
        url: "../../icon/mine_aboutUs.png",
        src: "../../icon/mine_aboutUs.png",
        text: "关于我们"
      },
      {
        url: "../../icon/mine_commonProblem.png",
        src: "../../icon/mine_commonProblem.png",
        text: "常见问题"
      },
      {
        url: "../../icon/mine_setUp.png",
        src: "../../icon/mine_setUp.png",
        text: "设置"
      },
      {
        url: "../../icon/mine_feedback.png",
        src: "../../icon/mine_feedback.png",
        text: "问题反馈"
      }
    ]
  },
  getDate(days) {
    var date = utils.formatDate(new Date());
    var start_num = new Date(date.replace(/-/g, "/"))
    var end_num = new Date(days.replace(/-/g, "/"))
    let day = parseInt((end_num.getTime() - start_num.getTime()) / (1000 * 60 * 60 * 24))
    return day
  },
  getOrder() {
    var functionBars = JSON.parse(JSON.stringify(this.data.functionBars))
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
          functionBars[0].point=listArr2.length
          functionBars[1].point=listArr3.length
          functionBars[2].point=listArr4.length
          functionBars[3].point=listArr5.length
          functionBars[4].point=listArr6.length
          this.setData({
            functionBars:functionBars
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userInfo = wx.getStorageSync('userInfo')
    var functionLists = JSON.parse(JSON.stringify(this.data.functionLists))
    this.setData({
      avatar: userInfo.avatarUrl,
      nickName: userInfo.nickName,
    })
    if (userInfo.chef_token) {
      functionLists[0].url = '/pages/mine/chefRegister/index'
    } else {
      functionLists[0].url = '/pages/mine/login/index'
    }
    this.setData({
      functionLists: functionLists
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