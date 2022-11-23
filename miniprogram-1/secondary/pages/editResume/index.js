// secondary/pages/editResume/index.js
var city = require('../../../utils/city');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basic: {},
    job_expectation: [],
    educational: [],
    work_experience: [],
    show: false,
    maskType: 0,
    // 个人信息
    avatar: '',
    name: '',
    sex: '编辑性别',
    born: '编辑出生年月',
    workTime: '编辑参加工作时间',
    phone: '',
    phonePlaceholder: '编辑手机号',
    phonePlaceholderClass: 'placeholder',
    sourceType: [
      'camera', 'album'
    ],
    sexArray: [
      '男', '女'
    ],
    sexIndex: 0,
    // 个人优势
    areaf: false,
    areaVal: '',
    areaWords: 0,
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
    // 求职状态
    stateJobIndex: 0,
    stateJobArray: [],
    stateJob: [],
    jobState: '编辑求职状态',
    jobStateId: '',
    // 教育经历
    ee_id:0,
    addOrEdit2: 0,
    school: '',
    educationalIndex: [0, 0],
    educationalArray: [],
    educationals: [],
    education: '',
    educationId: 0,
    fullPart: '',
    fullPartId: 0,
    major: '',
    timeRangeIndex: [0, 2],
    timeRangeArray: [[],[]],
    timeRanges: [],
    timeRangeL: '',
    timeRangeLId: 0,
    timeRangeR: '',
    timeRangeRId: 0,
    schoolEPlaceholder:'1.hfsafasf',
    schoolExperience: ''
  },
  openMask(e) {
    var item = e.currentTarget.dataset.item
    var basic = this.data.basic
    this.setData({
      show: true,
      maskType: item
    })
    if (this.data.maskType == 1) {
      this.setData({
        avatar: basic.r_head_portrait ? basic.r_head_portrait : '',
        name: basic.r_name ? basic.r_name : '',
        sex: basic.r_sex ? basic.r_sex : '编辑性别',
        born: basic.r_born ? basic.r_born : '编辑出生年月',
        workTime: basic.r_working_time ? basic.r_working_time : '编辑参加工作时间',
        phone: basic.r_mobile ? basic.r_mobile : '',
        sexIndex: basic.r_sex == '男' ? 0 : 1,
      })
    } else if (this.data.maskType == 2) {
      this.setData({
        areaf: true,
        areaVal: basic.r_advantage ? basic.r_advantage : '',
        areaWords: basic.r_advantage.length
      })
    } else if (this.data.maskType == 3) {
      var addOrEdit = e.currentTarget.dataset.addoredit
      this.setData({
        addOrEdit: addOrEdit
      })
      if (addOrEdit == 1) {
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
          city: job.city,
          citycode: job.je_job_location,
          expectJob: job.p_name,
          expectJobId: job.je_job_expectation,
          expectJobIndex: this.data.position.findIndex(i => i.p_id == job.je_job_expectation),
          salaryArray: salaryArrays,
          salaryIndex: [minIndex, salaryArrays[1].indexOf(job.je_job_salary_max)],
          salaryMin: job.je_job_salary_min,
          salaryMax: job.je_job_salary_max,
        })
      }
    } else if (this.data.maskType == 4) {
      var addOrEdit = e.currentTarget.dataset.addoredit
      this.setData({
        addOrEdit2: addOrEdit
      })
    }
  },
  z_input(e) {
    var val = e.detail.value
    var cur = e.detail.cursor
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        name: val
      })
    } else if (item == 2) {
      this.setData({
        phone: val
      })
    } else if (item == 3) {
      this.setData({
        areaVal: val,
        areaWords: cur
      })
    } else if (item == 4) {
      console.log(val);
      this.setData({
        school: val
      })
    } else if (item == 5) {
      this.setData({
        major: val
      })
    } else if (item == 6) {
      this.setData({
        schoolExperience: val
      })
    }
  },
  z_blur() {
    var phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    if (this.data.phone) {
      if (phoneReg.test(this.data.phone)) {} else {
        this.setData({
          phone: '',
          phonePlaceholder: "格式不正确",
          phonePlaceholderClass: "placeholderErr",
        })
      }
    } else {
      this.setData({
        phone: '',
        phonePlaceholder: "编辑手机号",
        phonePlaceholderClass: "placeholder",
      })
    }
  },
  save(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      var obj = {
        token: wx.getStorageSync('userInfo').token,
        r_head_portrait: this.data.avatar,
        r_name: this.data.name,
        r_sex: this.data.sex,
        r_born: this.data.born,
        r_working_time: this.data.workTime,
        r_mobile: this.data.phone,
      }
      if (obj.r_head_portrait != '' && obj.r_name != '' && obj.r_sex != '编辑性别' && obj.r_born != '编辑出生年月' && obj.r_working_time != '编辑参加工作时间' && obj.r_mobile != '') {
        app.post('/Job/setMyself', obj).then((res) => {
          if (res.data.status == 1) {
            this.setData({
              show: false
            })
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
    } else if (item == 2) {
      var obj = {
        token: wx.getStorageSync('userInfo').token,
        r_advantage: this.data.areaVal
      }
      if (obj.areaVal != '') {
        app.post('/Job/setAdvantage', obj).then((res) => {
          if (res.data.status == 1) {
            this.setData({
              show: false
            })
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
          title: '请输入内容',
          icon: 'error',
          duration: 1000
        })
      }
    } else if (item == 3) {
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
    } else if (item == 4) {
      var obj = {
        token: wx.getStorageSync('userInfo').token,
        ee_id: this.data.ee_id,
        ee_school: this.data.school,
        ee_education: this.data.educationId,
        ee_education_type: this.data.fullPartId,
        ee_major: this.data.major,
        ee_start_year: this.data.timeRangeL,
        ee_end_year: this.data.timeRangeR,
        // ee_association_activity: this.data.salaryMax
      }
      console.log(obj);
      // if (obj.je_job_location != '' && obj.expectJobId != 0 && obj.je_job_salary_min != '' && obj.je_job_salary_max != '') {
      //   app.post('/Job/setJobExpectation', obj).then((res) => {
      //     if (res.data.status == 1) {
      //       this.setData({
      //         show: false
      //       })
      //       this.getData()
      //     } else {
      //       wx.showToast({
      //         title: '保存失败',
      //         icon: 'error',
      //         duration: 1000
      //       })
      //     }
      //   })
      // } else {
      //   wx.showToast({
      //     title: '请完善信息',
      //     icon: 'error',
      //     duration: 1000
      //   })
      // }
    }
  },
  bindChange(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      this.setData({
        sex: this.data.array[e.detail.value]
      })
    } else if (item == 2) {
      this.setData({
        born: e.detail.value
      })
    } else if (item == 3) {
      this.setData({
        workTime: e.detail.value
      })
    } else if (item == 4) {
      this.setData({
        expectJob: this.data.position[e.detail.value].p_name,
        expectJobId: this.data.position[e.detail.value].p_id
      })
    } else if (item == 5) {
      this.setData({
        salaryMin: this.data.salaryArray[0][e.detail.value[0]],
        salaryMax: this.data.salaryArray[1][e.detail.value[1]]
      })
    } else if (item == 6) {
      this.setData({
        jobState: this.data.stateJob[e.detail.value].js_name,
        jobStateId: this.data.stateJob[e.detail.value].js_id,
      })
      app.post('/Job/setJobStatus', {
        token: wx.getStorageSync('userInfo').token,
        r_job_status: this.data.jobStateId
      }).then((res) => {

      })
    } else if (item == 7) {
      if (e.detail.value[0] > 2) {
        this.setData({
          education: this.data.educationals[e.detail.value[0]].e_name,
          educationId: this.data.educationals[e.detail.value[0]].e_id,
          fullPart: this.data.educationalArray[1][e.detail.value[1]],
          fullPartId: e.detail.value[1] == 0 ? 1 : 2,
        })
      } else {
        this.setData({
          education: this.data.educationals[e.detail.value[0]].e_name,
          educationId: this.data.educationals[e.detail.value[0]].e_id,
          fullPart: '',
          fullPartId: 0,
        })
      }
    } else if (item == 8) {
      this.setData({
        timeRangeL: this.data.timeRangeArray[0][e.detail.value[0]],
        timeRangeR: this.data.timeRangeArray[1][e.detail.value[1]],
      })
    }
  },
  bindColumnChange(e) {
    var item = e.currentTarget.dataset.item
    var salaryIndex = JSON.parse(JSON.stringify(this.data.salaryIndex))
    var salaryArrays = JSON.parse(JSON.stringify(this.data.salaryArrays))
    var educationalIndex = JSON.parse(JSON.stringify(this.data.educationalIndex))
    var educationalArray = JSON.parse(JSON.stringify(this.data.educationalArray))
    var timeRangeIndex = JSON.parse(JSON.stringify(this.data.timeRangeIndex))
    var timeRangeArray = JSON.parse(JSON.stringify(this.data.timeRangeArray))
    if (item == 5) {
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
    } else if (item == 7) {
      if (e.detail.column == 0) {
        if (e.detail.value > 2) {
          educationalArray[1] = ['全日制', '非全日制']
        } else {
          educationalArray[1] = []
        }
        educationalIndex[0] = e.detail.value
        educationalIndex[1] = 0
        this.setData({
          educationalArray: educationalArray,
          educationalIndex:educationalIndex
        })
      }
    } else if (item == 8) {
      if (e.detail.column == 0) {
        var arr = this.getYear(timeRangeArray[0][e.detail.value])
        timeRangeArray[1]=arr
        timeRangeIndex[0] = e.detail.value
        timeRangeIndex[1] = 2
        this.setData({
          timeRangeArray:timeRangeArray,
          timeRangeIndex: timeRangeIndex
        })
      }
    }

  },
  // 个人信息
  avatar() {
    this.upload(1)
  },
  // 求职期望
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
  // 上传图片
  upload(item) {
    // var item = e.currentTarget.dataset.item
    const that = this
    //调用微信上传照片的方法
    wx.showActionSheet({
      itemList: ['拍照', '相册'],
      itemColor: "#f7982a",
      //成功时回调
      success(res) {
        if (!res.cancel) {
          //调用相册或者照相的方法，传参INDEX 
          that.chooseImage(res.tapIndex, item)
        }
      },
      //失败时回调
      fail(res) {
        console.log('调用失败');
      }
    })
  },
  //打开相册或者照相的方法
  chooseImage(tapIndex, item) {
    const that = this
    //调用微信方法 打开相册或者照相的功能
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      //根据下标选择data数据，以此判断是拍照还是相册
      sourceType: [that.data.sourceType[tapIndex]],
      success(res) {
        try {
          app.upload(res.tempFiles[0].tempFilePath, "resume" + wx.getStorageSync('userInfo').user_id).then(res => {
            if (res.status == 1) {
              if (item == 1) {
                that.setData({
                  avatar: res.data.fullurl
                })
              }
            }
          })
        } catch {
          wx.showToast({
            title: '网络不稳定~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      }
    })
  },
  // 获取数据
  getData() {
    var cityList = city.cityList();
    app.post('/Job/getResume', {
      token: wx.getStorageSync('userInfo').token
    }).then((res) => {
      if (res.data.status == 1) {
        console.log(res.data.data);
        try {
          if (res.data.data.job_expectation.length != 0) {
            res.data.data.job_expectation.forEach(i => {
              i.p_name = this.data.position.find(j => i.je_job_expectation == j.p_id).p_name
              cityList.forEach(j => {
                j.cityInfo.find(k => {
                  if (i.je_job_location == k.code) {
                    i.city = k.city
                  }
                })
              })
            })
          }
          var stateJobs = this.data.stateJob.find(i => i.js_id == res.data.data.basic.r_job_status)
          this.setData({
            basic: res.data.data.basic,
            job_expectation: res.data.data.job_expectation,
            jobState: stateJobs.js_name,
            jobStateId: stateJobs.js_id,
            stateJobIndex: stateJobs.js_id - 1,
            educational: res.data.data.educational,
            work_experience: res.data.data.work_experience
          })
        } catch (res) {
          this.getData()
        }
      }
    })
  },
  getYear(year){
    var arrs = []
    for (var i = year+1; i <= year+5; i++) {
      arrs.unshift(i)
    }
    return arrs
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '在线简历',
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
    app.post('/comm/getJobStatus').then((res) => {
      var arr = []
      res.data.data.forEach(i => {
        arr.push(i.js_name)
      })
      this.setData({
        stateJobArray: arr,
        stateJob: res.data.data
      })
    })
    app.post('/comm/getEducation').then((res) => {
      var arr = []
      res.data.data.forEach(i => {
        arr.push(i.e_name)
      })
      this.setData({
        educationalArray: [arr, []],
        educationals: res.data.data
      })
    })
    var date = new Date()
    var year = date.getFullYear()
    var arr = []
    for (var i = year; i >= 1990; i--) {
      arr.push(i)
    }
    var arrs = this.getYear(year)
    this.setData({
      timeRangeArray:[arr,arrs]
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