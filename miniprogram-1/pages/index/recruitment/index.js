// pages/index/recruitment/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recruitmentSquare: {
      img: "../../../icon/jobSearchSquare-active.png",
      fontColor: "fontColor"
    },
    mine: {
      img: "../../../icon/mineJob.png",
      fontColor: ""
    },
    index: 1,
    desiredPosition: [],
    p_id: 0,
    scroll: 0,
    leftTilterActive1: 'active',
    leftTilterActive2: '',
    leftTilterActive3: '',
    leftTilterNum: 1,
    actives1: 'active',
    actives2: '',
    actives3: ''
  },
  tabToggle(e) {
    var index = e.currentTarget.dataset.index
    if (index == 1) {
      this.setData({
        recruitmentSquare: {
          img: "../../../icon/jobSearchSquare-active.png",
          fontColor: "fontColor"
        },
        mine: {
          img: "../../../icon/mineJob.png",
          fontColor: ""
        },
        index: 1
      })
      wx.setNavigationBarTitle({
        title: '招聘-招聘广场'
      })
    } else if (index == 2) {
      this.setData({
        recruitmentSquare: {
          img: "../../../icon/jobSearchSquare.png",
          fontColor: ""
        },
        mine: {
          img: "../../../icon/mineJob-active.png",
          fontColor: "fontColor"
        },
        index: 2
      })
      wx.setNavigationBarTitle({
        title: '招聘-我的'
      })
    }
  },
  topTilter(e) {
    var index = e.currentTarget.dataset.index
    var desiredPosition = JSON.parse(JSON.stringify(this.data.desiredPosition))
    desiredPosition.forEach(i => {
      i.active = ''
    })
    desiredPosition[index].active = 'active'
    this.setData({
      p_id: desiredPosition[index].p_id,
      desiredPosition: desiredPosition,
      scroll: index * 65 > 120 ? index * 65 - 120 : 0
    })
    // var a = this.data.educationNum
    // var b = this.data.salaryNum
    // var c = this.data.experienceNum
    // var d = this.data.p_id
    // var e = this.data.leftTilterNum
    // var f = this.data.streetCodes
    // console.log(a);
    // console.log(b);
    // console.log(c);
    // console.log(d);
    // console.log(e);
    // console.log(f);
  },
  leftTilter(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        leftTilterActive1: 'active',
        leftTilterActive2: '',
        leftTilterActive3: '',
        leftTilterNum: 1,
      })
      // var a = this.data.educationNum
      // var b = this.data.salaryNum
      // var c = this.data.experienceNum
      // var d = this.data.p_id
      // var e = this.data.leftTilterNum
      // var f = this.data.streetCodes
      // console.log(a);
      // console.log(b);
      // console.log(c);
      // console.log(d);
      // console.log(e);
      // console.log(f);
    } else if (item == 2) {
      this.setData({
        leftTilterActive1: '',
        leftTilterActive2: 'active',
        leftTilterActive3: '',
        leftTilterNum: 2,
      })
      // var a = this.data.educationNum
      // var b = this.data.salaryNum
      // var c = this.data.experienceNum
      // var d = this.data.p_id
      // var e = this.data.streetCodes
      // var f = this.data.streetCodes
      // console.log(a);
      // console.log(b);
      // console.log(c);
      // console.log(d);
      // console.log(e);
      // console.log(f);
    } else if (item == 3) {
      this.setData({
        leftTilterActive1: '',
        leftTilterActive2: '',
        leftTilterActive3: 'active',
        leftTilterNum: 3,
      })
      // var a = this.data.educationNum
      // var b = this.data.salaryNum
      // var c = this.data.experienceNum
      // var d = this.data.p_id
      // var e = this.data.leftTilterNum
      // var f = this.data.streetCodes
      // console.log(a);
      // console.log(b);
      // console.log(c);
      // console.log(d);
      // console.log(e);
      // console.log(f);
    }
  },
  openMask(e) {
    var item = e.currentTarget.dataset.item
    this.setData({
      show: true,
      maskType: item,
      confirm: 0
    })
    if (item == 1) {
      var a = this.data.streetCodes.length ? ' · ' + this.data.streetCodes.length : ''
      wx.setNavigationBarTitle({
        title: this.data.cityss + a,
      })
      if (this.data.streetCodes.length != 0) {
        this.setData({
          flag: 1
        })
      }
      this.setData({
        area: this.data.areas,
        street: this.data.streets,
        streetCode: this.data.streetCodes,
      })
    } else if (item == 2) {
      this.setTitle()
    }
  },

  // 我的
  mineToggle(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        actives1: 'active',
        actives2: '',
        actives3: ''
      })
    } else if (item == 2) {
      this.setData({
        actives1: '',
        actives2: 'active',
        actives3: ''
      })
    } else if (item == 3) {
      this.setData({
        actives1: '',
        actives2: '',
        actives3: 'active'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '招聘-我的',
    })
    app.post('/comm/getPosition').then((res) => {
      if (res.data.status == 1) {
        res.data.data.forEach(i => {
          i.active = ''
        })
        this.setData({
          desiredPosition: res.data.data
        })
      } else {
        wx.showToast({
          title: '网络出错~',
          icon: 'error',
          duration: 2000
        })
      }
    })
    if (1) {
      wx.navigateTo({
        url: '/secondary/pages/createTraCQ/index',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data) {
            console.log(data)
          },
          someEvent: function (data) {
            console.log(data)
          }
        },
        success: function (res) {
          // 通过 eventChannel 向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            data: 'test'
          })
        }
      })
    }
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