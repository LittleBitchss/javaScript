// secondary/pages/addPosition/index.js
const app = getApp()
var city = require('../../../utils/city')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    addorEdit: 0,
    job_expectation: [],
    // 求职期望
    je_id: 0,
    fullOrPart: 1,
    addOrEdit: 0,
    city: '选择地址',
    citycode: '',
    expectJob: '选择职位',
    expectJobId: 0,
    expectJobArray: [],
    expectJobIndex: 0,
    position: [],
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
  },
  openMask(e) {
    var addorEdit = e.currentTarget.dataset.addoredit
    this.setData({
      show: true,
      addorEdit: addorEdit
    })
    if (addorEdit == 1) {
      this.setData({
        je_id: 0,
        fullOrPart: 1,
        city: '选择地址',
        citycode: '',
        expectJob: '选择职位',
        expectJobId: 0,
        expectJobIndex: 0,
        salaryArray: [
          ['面议', '1000', '2000', '3000', '4000', '5000', '6000', '7000', '8000', '9000', '10000', '11000', '12000', '13000', '14000', '15000', '16000', '17000', '18000', '19000', '20000', '21000', '22000', '23000', '24000', '25000', '26000', '27000', '28000', '29000', '30000', '31000', '32000', '33000', '34000'],
          ['面议']
        ],
        salaryIndex: [0, 0],
        salaryMin: '',
        salaryMax: '',
      })
    } else {
      var job = this.data.job_expectation[e.currentTarget.dataset.index]
      var minIndex = this.data.salaryArrays[0].indexOf(job.je_job_salary_min)
      var salaryArrays = JSON.parse(JSON.stringify(this.data.salaryArrays))
      salaryArrays[1].splice(0, minIndex)
      this.setData({
        je_id: job.je_id,
        fullOrPart: job.je_job_type,
        city: job.citys,
        citycode: job.je_job_location,
        expectJob: job.work,
        expectJobId: job.je_job_expectation,
        expectJobIndex: this.data.position.findIndex(i => i.p_id == job.je_job_expectation),
        salaryArray: salaryArrays,
        salaryIndex: [minIndex, salaryArrays[1].indexOf(job.je_job_salary_max)],
        salaryMin: job.je_job_salary_min,
        salaryMax: job.je_job_salary_max,
      })
    }
  },
  fullOrPart(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        fullOrPart: 1
      })
    } else if (item == 2) {
      this.setData({
        fullOrPart: 2
      })
    }
  },
  bindChange(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        expectJob: this.data.position[e.detail.value].p_name,
        expectJobId: this.data.position[e.detail.value].p_id
      })
    } else if (item == 2) {
      this.setData({
        salaryMin: this.data.salaryArray[0][e.detail.value[0]],
        salaryMax: this.data.salaryArray[1][e.detail.value[1]]
      })
    }
  },
  bindColumnChange(e) {
    var salaryIndex = JSON.parse(JSON.stringify(this.data.salaryIndex))
    var salaryArrays = JSON.parse(JSON.stringify(this.data.salaryArrays))
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
  },
  save() {
    var obj = {
      token: wx.getStorageSync('userInfo').token,
      je_id: this.data.je_id,
      je_job_type: this.data.fullOrPart,
      je_job_location: this.data.citycode,
      je_job_expectation: this.data.expectJobId,
      je_job_salary_min: this.data.salaryMin,
      je_job_salary_max: this.data.salaryMax,
    }
    if (obj.je_job_location != '' && obj.expectJobId != 0 && obj.je_job_salary_min != '' && obj.je_job_salary_max != '') {
      app.post('/Job/setJobExpectation', obj).then((res) => {
        if (res.data.status == 1) {
          this.setData({
            show: false
          })
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 2]
          currentPage.getPosition()
          this.getData()
        } else {
          wx.showToast({
            title: '保存失败',
            icon: 'error',
            duration: 1000
          })
        }
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'error',
        duration: 1000
      })
    }

  },
  cancel() {
    app.post('/Job/delJobExpectation', {
      token: wx.getStorageSync('userInfo').token,
      je_id: this.data.je_id
    }).then((res) => {
      if (res.data.status == 1) {
        this.setData({
          show: false
        })
        const pages = getCurrentPages()
        const currentPage = pages[pages.length - 2]
        currentPage.getPosition()
        this.getData()
      } else {
        wx.showToast({
          title: '删除失败',
          icon: 'error',
          duration: 1000
        })
      }
    })

  },
  getData() {
    var cityList = city.cityList()
    app.post('/Job/getExpectationsList', {
      token: wx.getStorageSync('userInfo').token
    }).then((res) => {
      if (res.data.status == 1) {
        try {
          res.data.data.forEach(i => {
            cityList.forEach(j => {
              var a = j.cityInfo.find(k => k.code == i.je_job_location)
              if (a) {
                i.city = a.city.slice(0, a.city.length - 1)
                i.citys = a.city
              }
            })
            var b = this.data.position.find(j => i.je_job_expectation == j.p_id).p_name
            i.work = b
          })
          this.setData({
            job_expectation: res.data.data
          })
        } catch (res) {
          this.getData()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '编辑求职期望',
    })
    app.post('/comm/getPosition').then((res) => {
      var arr = []
      res.data.data.forEach(i => {
        arr.push(i.p_name)
      })
      this.setData({
        expectJobArray: arr,
        position: res.data.data
      })
    })
    this.getData()
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