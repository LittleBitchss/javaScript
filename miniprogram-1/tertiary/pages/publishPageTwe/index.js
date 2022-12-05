// secondary/pages/publishPageTwe/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sufferArr: [],
    sufferArrs: [],
    sufferIndex: 0,
    sufferValue: {
      re_name: '请选择经验',
      re_id: 0
    },
    learnArr: [],
    learnArrs: [],
    learnIndex: 0,
    learnValue: {
      e_name: '请选择学历',
      e_id: 0
    },
    salaryArray: [
      ['面议', '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000', '11000', '12000', '13000', '14000', '15000', '16000', '17000', '18000', '19000', '20000', '21000', '22000', '23000', '24000', '25000', '26000', '27000', '28000', '29000', '30000', '31000', '32000', '33000', '34000'],
      ['面议']
    ],
    salaryArrays: [
      ['面议', '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000', '11000', '12000', '13000', '14000', '15000', '16000', '17000', '18000', '19000', '20000', '21000', '22000', '23000', '24000', '25000', '26000', '27000', '28000', '29000', '30000', '31000', '32000', '33000', '34000'],
      ['面议', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000', '11000', '12000', '13000', '14000', '15000', '16000', '17000', '18000', '19000', '20000', '21000', '22000', '23000', '24000', '25000', '26000', '27000', '28000', '29000', '30000', '31000', '32000', '33000', '34000', '35000']
    ],
    salaryIndex: [0, 0],
    salaryMin: '',
    salaryMax: '',

    // 关键词
    duty: [],
    dutys: [],
    dutyValue: [],
    welfare: [],
    welfares: [],
    welfareValue: [],
    custom: [],
    customs: [],
    customValue: []
  },
  bindChange(e) {
    var item = e.currentTarget.dataset.item
    var index = e.detail.value
    if (item == 1) {
      this.setData({
        sufferValue: this.data.sufferArrs[index]
      })
    } else if (item == 2) {
      this.setData({
        learnValue: this.data.learnArrs[index]
      })
    } else if (item == 3) {
      this.setData({
        salaryMin: this.data.salaryArray[0][e.detail.value[0]],
        salaryMax: this.data.salaryArray[1][e.detail.value[1]]
      })
    }
  },
  bindColumnChange(e) {
    var item = e.currentTarget.dataset.item
    var salaryIndex = JSON.parse(JSON.stringify(this.data.salaryIndex))
    var salaryArrays = JSON.parse(JSON.stringify(this.data.salaryArrays))
    if (item == 3) {
      if (e.detail.column == 0) {
        if (e.detail.value == 0) {
          salaryArrays[1].splice(1, salaryArrays[1].length)
          this.setData({
            salaryArray: salaryArrays
          })
        } else {
          salaryIndex[0] = e.detail.value
          salaryIndex[1] = 0
          salaryArrays[1].splice(0, e.detail.value)
          this.setData({
            salaryArray: salaryArrays,
            salaryIndex: salaryIndex
          })
        }
      }
    }
  },
  openMask(e) {
    var item = e.currentTarget.dataset.item
    this.setData({
      show: true,
      maskType: item
    })
    if (item == 1) {

    } else if (item == 2) {

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '发布社招',
    })
    app.post('/comm/getWorkExperience').then((res) => {
      if (res.data.status == 1) {
        var arr = []
        res.data.data.forEach(i => {
          i.active = ''
          arr.push(i.re_name)
        });
        this.setData({
          sufferArrs: res.data.data,
          sufferArr: arr
        })
      }
    })
    app.post('/comm/getEducation').then((res) => {
      if (res.data.status == 1) {
        var arr = []
        res.data.data.forEach(i => {
          arr.push(i.e_name)
        });
        this.setData({
          learnArrs: res.data.data,
          learnArr: arr
        })
      }
    })
    app.post('/comm/getRecruitDuty').then((res) => {
      if (res.data.status == 1) {
        var arr = []
        res.data.data.forEach(i => {
          i.active = ''
          arr.push(i.rd_name)
        });
        this.setData({
          dutys: res.data.data,
          duty: arr
        })
      }
    })
    app.post('/comm/getWelfare').then((res) => {
      if (res.data.status == 1) {
        var arr = []
        res.data.data.forEach(i => {
          i.active = ''
          arr.push(i.rf_name)
        });
        this.setData({
          welfares: res.data.data,
          welfare: arr
        })
      }
    })
    app.post('/comm/getCustom').then((res) => {
      if (res.data.status == 1) {
        var arr = []
        res.data.data.forEach(i => {
          i.active = ''
          arr.push(i.rc_name)
        });
        this.setData({
          customs: res.data.data,
          custom: arr
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