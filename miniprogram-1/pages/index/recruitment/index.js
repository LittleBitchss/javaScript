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
    citys: [],
    show: false,
    educationBackground: [],
    salaryPackage: [],
    experienceRequirement: [],
    educationNum: [],
    salaryNum: [],
    experienceNum: [],
    filtersNum: 0,
    confirm: 0,
    educationBackgrounds: [],
    salaryPackages: [],
    experienceRequirements: [],
    educationNums: [],
    salaryNums: [],
    experienceNums: [],
    id: 0,
    active1: 'active',
    active2: 'active',
    active3: 'active',
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
      scroll: index * 65 > 136 ? index * 65 - 136 : 0
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
      this.setTitle() 
    }
  },
  setTitle() {
    var t = '筛选 '
    var a = this.data.educationNum
    var b = this.data.salaryNum
    var c = this.data.experienceNum
    var d = a.concat(b).concat(c)
    this.setData({
      filtersNum: d.length
    })
    if (this.data.filtersNum) {
      t = t + '· ' + this.data.filtersNum
    }
    wx.setNavigationBarTitle({
      title: t
    })
  },
  eventhandle() {
    if (this.data.confirm) {
      this.setData({
        educationBackgrounds: this.data.educationBackground,
        salaryPackages: this.data.salaryPackage,
        experienceRequirements: this.data.experienceRequirement,
        educationNums: this.data.educationNum,
        salaryNums: this.data.salaryNum,
        experienceNums: this.data.experienceNum,
      })
    } else {
      this.setData({
        educationBackground: this.data.educationBackgrounds,
        salaryPackage: this.data.salaryPackages,
        experienceRequirement: this.data.experienceRequirements,
        educationNum: this.data.educationNums,
        salaryNum: this.data.salaryNums,
        experienceNum: this.data.experienceNums,
      })
      if (this.data.educationNum.length == 0) {
        this.setData({
          active1: 'active'
        })
      } else {
        this.setData({
          active1: ''
        })
      }
      if (this.data.salaryNum.length == 0) {
        this.setData({
          active2: 'active'
        })
      } else {
        this.setData({
          active2: ''
        })
      }
      if (this.data.experienceNum.length == 0) {
        this.setData({
          active3: 'active'
        })
      } else {
        this.setData({
          active3: ''
        })
      }
    }
    this.setTitle()
    wx.setNavigationBarTitle({
      title: '求职-求职广场',
    })
  },
  tilters(e) {
    var item = e.currentTarget.dataset.item
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.index
    var educationBackground = JSON.parse(JSON.stringify(this.data.educationBackground))
    var educationNum = JSON.parse(JSON.stringify(this.data.educationNum))
    var salaryPackage = JSON.parse(JSON.stringify(this.data.salaryPackage))
    var experienceRequirement = JSON.parse(JSON.stringify(this.data.experienceRequirement))
    var experienceNum = JSON.parse(JSON.stringify(this.data.experienceNum))
    if (item == 1) {
      if (type == 1) {
        educationBackground.forEach(i => {
          i.active = ''
        })
        this.setData({
          active1: 'active'
        })
        educationNum = []
      } else {
        this.setData({
          active1: ''
        })
        if (educationBackground[index].active == '') {
          educationBackground[index].active = 'active'
          educationNum.push(educationBackground[index].e_id)
        } else {
          educationBackground[index].active = ''
          educationNum.splice(educationNum.indexOf(educationBackground[index].e_id), 1)
        }
        var a = 0
        educationBackground.forEach(i => {
          if (i.active) {
            a++
          }
        })
        if (!a) {
          this.setData({
            active1: 'active'
          })
        }
      }
      this.setData({
        educationBackground: educationBackground,
        educationNum: educationNum
      })
      this.setTitle()
    } else if (item == 2) {
      if (type == 1) {
        this.setData({
          active2: 'active',
          salaryNum: []
        })
        salaryPackage.forEach(i => {
          i.active = ''
        })
      } else {
        this.setData({
          active2: '',
          salaryNum: [salaryPackage[index].s_id]
        })
        salaryPackage.forEach(i => {
          i.active = ''
        })
        salaryPackage[index].active = 'active'
      }
      this.setData({
        salaryPackage: salaryPackage
      })
      this.setTitle()
    } else if (item == 3) {
      if (type == 1) {
        experienceRequirement.forEach(i => {
          i.active = ''
        })
        this.setData({
          active3: 'active'
        })
        experienceNum = []
      } else {
        this.setData({
          active3: ''
        })
        if (experienceRequirement[index].active == '') {
          experienceRequirement[index].active = 'active'
          experienceNum.push(experienceRequirement[index].e_id)
        } else {
          experienceRequirement[index].active = ''
          experienceNum.splice(experienceNum.indexOf(experienceRequirement[index].e_id), 1)
        }
        var a = 0
        experienceRequirement.forEach(i => {
          if (i.active) {
            a++
          }
        })
        if (!a) {
          this.setData({
            active3: 'active'
          })
        }
      }
      this.setData({
        experienceRequirement: experienceRequirement,
        experienceNum: experienceNum
      })
      this.setTitle()
    }
  },
  confirm() {
    this.setData({
      show: false,
      confirm: 1
    })
  },
  empty() {
    var educationBackground = JSON.parse(JSON.stringify(this.data.educationBackground))
    var salaryPackage = JSON.parse(JSON.stringify(this.data.salaryPackage))
    var experienceRequirement = JSON.parse(JSON.stringify(this.data.experienceRequirement))
    educationBackground.forEach(i => {
      i.active = ''
    })
    salaryPackage.forEach(i => {
      i.active = ''
    })
    experienceRequirement.forEach(i => {
      i.active = ''
    })
    this.setData({
      active1: 'active',
      active2: 'active',
      active3: 'active',
      educationNum: [],
      salaryNum: [],
      experienceNum: [],
      educationBackground: educationBackground,
      salaryPackage: salaryPackage,
      experienceRequirement: experienceRequirement
    })
    this.setTitle()
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
    this.setData({
      citys: [wx.getStorageSync('userInfo').citys.slice(0, wx.getStorageSync('userInfo').citys.length - 1), wx.getStorageSync('userInfo').citycode]
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
    app.post('/comm/getEducation').then((res) => {
      if (res.data.status == 1) {
        res.data.data.forEach(i => {
          i.active = ''
        })
        this.setData({
          educationBackground: res.data.data,
          educationBackgrounds: res.data.data
        })
      }
    })
    app.post('/comm/getSalary').then((res) => {
      if (res.data.status == 1) {
        res.data.data.forEach(i => {
          i.active = ''
        })
        this.setData({
          salaryPackage: res.data.data,
          salaryPackages: res.data.data
        })
      }
    })
    app.post('/comm/getExperience').then((res) => {
      if (res.data.status == 1) {
        res.data.data.forEach(i => {
          i.active = ''
        })
        this.setData({
          experienceRequirement: res.data.data,
          experienceRequirements: res.data.data
        })
      }
    })
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