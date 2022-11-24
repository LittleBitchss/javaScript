// pages/index/jobRecruitment/index.js
var city = require('../../../utils/city');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    jobSearchSquare: {
      img: "../../../icon/jobSearchSquare-active.png",
      fontColor: "fontColor"
    },
    mine: {
      img: "../../../icon/mineJob.png",
      fontColor: ""
    },
    index: 1,
    desiredPosition: [],
    scroll: 0,
    leftTilterActive1: 'active',
    leftTilterActive2: '',
    leftTilterActive3: '',
    show: false,
    maskType: 0,
    active1: 'active',
    active2: 'active',
    active3: 'active',
    actives1: 'active',
    actives2: '',
    actives3: '',
    educationBackground: [],
    salaryPackage: [],
    experienceRequirement: []
  },
  tabToggle(e) {
    var index = e.currentTarget.dataset.index
    if (index == 1) {
      this.setData({
        jobSearchSquare: {
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
        title: '求职-求职广场'
      })
    } else if (index == 2) {
      this.setData({
        jobSearchSquare: {
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
        title: '求职-我的'
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
      desiredPosition: desiredPosition,
      scroll: index * 65 > 120 ? index * 65 - 120 : 0
    })
  },
  leftTilter(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        leftTilterActive1: 'active',
        leftTilterActive2: '',
        leftTilterActive3: '',
      })
    } else if (item == 2) {
      this.setData({
        leftTilterActive1: '',
        leftTilterActive2: 'active',
        leftTilterActive3: '',
      })
    } else if (item == 3) {
      this.setData({
        leftTilterActive1: '',
        leftTilterActive2: '',
        leftTilterActive3: 'active',
      })
    }
  },
  openMask(e) {
    var item = e.currentTarget.dataset.item
    this.setData({
      show: true,
      maskType: item
    })
    if (item == 1) {
      wx.setNavigationBarTitle({
        title: '杭州',
      })
    } else if (item == 2) {
      wx.setNavigationBarTitle({
        title: '筛选',
      })
    }
  },
  eventhandle() {
    wx.setNavigationBarTitle({
      title: '求职-求职广场',
    })
  },
  tilters(e){
    var item = e.currentTarget.dataset.item
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.index
    var educationBackground = JSON.parse(JSON.stringify(this.data.educationBackground))
    var salaryPackage = JSON.parse(JSON.stringify(this.data.salaryPackage))
    var experienceRequirement = JSON.parse(JSON.stringify(this.data.experienceRequirement))
    if(item==1){
      if(type==1){
        educationBackground.forEach(i=>{
          i.active=''
        })
        this.setData({
          active1:'active'
        })
      }else{
        this.setData({
          active1:''
        })
        if(educationBackground[index].active==''){
          educationBackground[index].active='active'
        }else{
          educationBackground[index].active=''
        }
        var a = 0
        educationBackground.forEach(i=>{
          if(i.active){
            a++
          }
        })
        if(!a){
          this.setData({
            active1:'active'
          })
        }
      }
      this.setData({
        educationBackground:educationBackground
      })
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
      title: '求职-求职广场',
    })
    app.post('/comm/getPosition').then((res) => {
      if (res.data.status == 1) {
        res.data.data.forEach(i => {
          i.active = ''
        })
        var desiredPosition = res.data.data
        app.post('/Job/getExpectationsList', {
          token: wx.getStorageSync('userInfo').token
        }).then((res) => {
          if (res.data.status == 1) {
            var arr = []
            res.data.data.forEach(i => {
              var a = desiredPosition.find(j => j.p_id == i.je_job_expectation)
              arr.push(a)
            })
            arr[0].active = 'active'
            this.setData({
              desiredPosition: arr
            })
          }
        })
      } else {
        wx.showToast({
          title: '网络出错~',
          icon: 'error',
          duration: 2000
        })
      }
    })
    app.post('/comm/getEducation').then((res)=>{
      if(res.data.status==1){
        res.data.data.forEach(i=>{
          i.active = ''
        })
        this.setData({
          educationBackground:res.data.data
        })
      }
    })
    app.post('/comm/getSalary').then((res)=>{
      if(res.data.status==1){
        res.data.data.forEach(i=>{
          i.active = ''
        })
        this.setData({
          salaryPackage:res.data.data
        })
      }
    })
    app.post('/comm/getExperience').then((res)=>{
      if(res.data.status==1){
        res.data.data.forEach(i=>{
          i.active = ''
        })
        this.setData({
          experienceRequirement:res.data.data
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