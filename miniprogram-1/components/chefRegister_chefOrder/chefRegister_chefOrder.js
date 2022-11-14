// components/chefRegister_chefOrder/chefRegister_chefOrder.js
const app = getApp()
const utils = require("../../utils/utils")
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
    active1: "active",
    active2: "",
    active3: "",
    active4: "",
    show: false,
    allImg: "../../icon/down_active.png",
    allImgActive: "allImgActive",
    isAllArr: [{
        id: 0,
        text: "全部",
        color: "",
      },
      {
        id: 1,
        text: "乡宴",
        color: "",
      },
      {
        id: 2,
        text: "家宴",
        color: "",
      }
    ],
    isAll: "全部",
    chefOrderArr: [],
    star: [{
      stars: [app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png"]
    }],
    type: 0,
    m_type: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    taggle(e) {
      var item = e.currentTarget.dataset.item
      if (item == 1) {
        this.setData({
          active1: "active",
          active2: "",
          active3: "",
          active4: "",
          allImg: "../../icon/down_active.png",
          allImgActive: "allImgActive",
          type:0
        })
        this.getData(this.data.type, this.data.m_type)
      } else if (item == 2) {
        this.setData({
          active1: "",
          active2: "active",
          active3: "",
          active4: "",
          allImg: "../../icon/down.png",
          allImgActive: "",
          type:3
        })
        this.getData(this.data.type, this.data.m_type)
      } else if (item == 3) {
        this.setData({
          active1: "",
          active2: "",
          active3: "active",
          active4: "",
          allImg: "../../icon/down.png",
          allImgActive: "",
          type:1
        })
        this.getData(this.data.type, this.data.m_type)
      } else if (item == 4) {
        this.setData({
          active1: "",
          active2: "",
          active3: "",
          active4: "active",
          allImg: "../../icon/down.png",
          allImgActive: "",
          type:2
        })
        this.getData(this.data.type, this.data.m_type)
      }
    },
    // 全部
    block() {},
    openFilter() {
      this.setData({
        show: !this.data.show,
      })
    },
    choose(e) {
      var index = e.currentTarget.dataset.index
      var isAllArr = JSON.parse(JSON.stringify(this.data.isAllArr))
      isAllArr.forEach(i => {
        i.color = ""
      })
      isAllArr[index].color = "isAlls-active"
      this.setData({
        isAllArr: isAllArr,
        isAll: isAllArr[index].text,
      })
      if (index == 0) {
        this.setData({
          type: 0,
          m_type: 0
        })
        this.getData(this.data.type, this.data.m_type)
      } else if (index == 1) {
        this.setData({
          type: 0,
          m_type: 1
        })
        this.getData(this.data.type, this.data.m_type)
      } else if (index == 2) {
        this.setData({
          type: 0,
          m_type: 2
        })
        this.getData(this.data.type, this.data.m_type)
      }
    },
    offFilter() {
      this.setData({
        show: false,
      })
    },
    getDate(days) {
      var date = utils.formatDate(new Date());
      var start_num = new Date(date.replace(/-/g, "/"))
      var end_num = new Date(days.replace(/-/g, "/"))
      let day = parseInt((end_num.getTime() - start_num.getTime()) / (1000 * 60 * 60 * 24))
      return day
    },
    getData(type, m_type) {
      wx.showLoading({
        title: '加载中',
      })
      try {
        app.post('/chefoperation/invitation', {
          token: wx.getStorageSync('userInfo').chef_token,
          type: type,
          m_type: m_type
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
            console.log(res.data.data);
            this.setData({
              chefOrderArr: res.data.data
            })
          }
          wx.hideLoading()
        })
      } catch {
        wx.showToast({
          title: '网络不稳定~',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    },
    aaa(){
      this.getData(this.data.type, this.data.m_type)
    },
    cancel(e){
      var that = this
      var mi_id = e.currentTarget.dataset.mi_id
      var mi_remark = e.currentTarget.dataset.mi_remark
      var m_approval_remark = e.currentTarget.dataset.m_approval_remark
      if(mi_id){
        wx.showModal({
          title: '取消原因',
          placeholderText: "请输入取消原因",
          content: '',
          editable: true,
          success(res) {
            if (res.confirm) {
              if (res.content.trim() != "") {
                try {
                  app.post('/chefoperation/cancel', {
                    token: wx.getStorageSync('chefInfo').token,
                    mi_id: mi_id,
                    remark: res.content
                  }).then(res => {
                    if (res.data.status == 1) {
                      wx.showToast({
                        title: '取消成功',
                        icon: 'success',
                        duration: 1000 //持续的时间
                      })
                      that.getData(that.data.type, that.data.m_type)
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
      }else if(mi_remark){
        wx.showModal({
          title: '用户取消原因',
          showCancel: false,
          confirmText: "关闭",
          content: mi_remark
        })
      }else if(m_approval_remark){
        wx.showModal({
          title: '审核不通过原因',
          showCancel: false,
          confirmText: "关闭",
          content: m_approval_remark
        })
      }
    },
    repay(e) {
      var mi_id = e.currentTarget.dataset.mi_id
      var o_paid = e.currentTarget.dataset.o_paid
      var m_id = e.currentTarget.dataset.m_id
      var r_processing_result = e.currentTarget.dataset.r_processing_result
      var that = this
      if(r_processing_result){
        wx.showModal({
          title: o_paid?'退款处理结果':'补偿处理结果',
          showCancel: false,
          confirmText: "关闭",
          content: r_processing_result
        })
      }else{
        wx.showModal({
          title: o_paid?'退款原因':'补偿原因',
          placeholderText: o_paid?'请输入退款原因':"请输入补偿原因",
          content: '',
          editable: true,
          success(res) {
            if (res.confirm) {
              if (res.content.trim() != "") {
                try {
                  app.post('/chefoperation/applyCompensation', {
                    token: wx.getStorageSync('chefInfo').token,
                    m_id:m_id,
                    mi_id:mi_id,
                    reson:res.content
                  }).then(res => {
                    if (res.data.status == 1) {
                      wx.showToast({
                        title: o_paid?'已申请退款':'已申请补偿',
                        icon: 'success',
                        duration: 1000 //持续的时间
                      })
                      that.getData(that.data.type, that.data.m_type)
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
      }
    },
  },
  lifetimes: {
    attached: function () {
      this.getData(this.data.type, this.data.m_type)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})