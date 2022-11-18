// pages/index/jobRecruitment/index.js
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
    desiredPosition: [
      {
        position:'行政主厨',
        active:'active'
      },
      {
        position:'行政主厨',
        active:''
      },
      {
        position:'行政主厨',
        active:''
      },
      {
        position:'行政主厨',
        active:''
      },
      {
        position:'行政主厨',
        active:''
      }
    ],
    scroll:0,
    leftTilterActive1: 'active',
    leftTilterActive2: '',
    leftTilterActive3: '',
    show:false,
    maskType: 0,
    active1:'active',
    active2:'active',
    active3:'active',
    actives1:'active',
    actives2:'',
    actives3:'',
    educationBackground:[
      {
        cont:'初中及以下',
        active:''
      },
      {
        cont:'中专/中技',
        active:''
      },
      {
        cont:'高中',
        active:''
      },
      {
        cont:'大专',
        active:''
      },
      {
        cont:'本科',
        active:''
      },
      {
        cont:'硕士',
        active:''
      },
      {
        cont:'博士',
        active:''
      }
    ],
    salaryPackage:[
      {
        cont:'5000元以下',
        active:''
      },
      {
        cont:'5000-10000元',
        active:''
      },
      {
        cont:'1000-15000元',
        active:''
      },
      {
        cont:'15000-20000元',
        active:''
      },
      {
        cont:'20000以上',
        active:''
      }
    ],
    experienceRequirement:[
      {
        cont:'在校生',
        active:''
      },
      {
        cont:'应届生',
        active:''
      },
      {
        cont:'一年以内',
        active:''
      },
      {
        cont:'1-3年',
        active:''
      },
      {
        cont:'3-5年',
        active:''
      },
      {
        cont:'5-10年',
        active:''
      },
      {
        cont:'10年以上',
        active:''
      }
    ]
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
    desiredPosition.forEach(i=>{
      i.active=''
    })
    desiredPosition[index].active = 'active'
    this.setData({
      desiredPosition:desiredPosition,
      scroll:index*65>120?index*65-120:0
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
      show:true,
      maskType:item
    })
    if(item==1){
      wx.setNavigationBarTitle({
        title: '杭州',
      })
    }else if(item==2){
      wx.setNavigationBarTitle({
        title: '筛选',
      })
    }
  },
  eventhandle(){
    wx.setNavigationBarTitle({
      title: '求职-求职广场',
    })
  },

  // 我的
  mineToggle(e){
    var item = e.currentTarget.dataset.item
    if(item==1){
      this.setData({
        actives1:'active',
        actives2:'',
        actives3:''
      })
    }else if(item==2){
      this.setData({
        actives1:'',
        actives2:'active',
        actives3:''
      })
    }else if(item==3){
      this.setData({
        actives1:'',
        actives2:'',
        actives3:'active'
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