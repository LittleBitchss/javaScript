// pages/index/jobRecruitment/index.js
var city = require('../../../utils/city');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag:0,
    citys: '',
    cityss: '',
    citycode: '',
    area: [],
    // areas: '',
    // areass: '',
    // areacode: '',
    street: [],
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
    p_id: 0,
    scroll: 0,
    leftTilterActive1: 'active',
    leftTilterActive2: '',
    leftTilterActive3: '',
    leftTilterNum: 1,
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
    id:0
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
      p_id: desiredPosition[index].p_id,
      desiredPosition: desiredPosition,
      scroll: index * 65 > 120 ? index * 65 - 120 : 0
    })
    var a = this.data.educationNum
    var b = this.data.salaryNum
    var c = this.data.experienceNum
    var d = this.data.p_id
    var e = this.data.leftTilterNum
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
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
      var a = this.data.educationNum
      var b = this.data.salaryNum
      var c = this.data.experienceNum
      var d = this.data.p_id
      var e = this.data.leftTilterNum
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(d);
      console.log(e);
    } else if (item == 2) {
      this.setData({
        leftTilterActive1: '',
        leftTilterActive2: 'active',
        leftTilterActive3: '',
        leftTilterNum: 2,
      })
      var a = this.data.educationNum
      var b = this.data.salaryNum
      var c = this.data.experienceNum
      var d = this.data.p_id
      var e = this.data.leftTilterNum
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(d);
      console.log(e);
    } else if (item == 3) {
      this.setData({
        leftTilterActive1: '',
        leftTilterActive2: '',
        leftTilterActive3: 'active',
        leftTilterNum: 3,
      })
      var a = this.data.educationNum
      var b = this.data.salaryNum
      var c = this.data.experienceNum
      var d = this.data.p_id
      var e = this.data.leftTilterNum
      console.log(a);
      console.log(b);
      console.log(c);
      console.log(d);
      console.log(e);
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
      wx.setNavigationBarTitle({
        title: this.data.cityss,
      })
    } else if (item == 2) {
      this.setTitle()
    }
  },
  setTitles(cityss) {
    setTimeout(() => {
      wx.setNavigationBarTitle({
        title: cityss,
      })
      this.getAreas(this.data.citycode.toString())
    })
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
        console.log(salaryPackage);
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
    var a = this.data.educationNum
    var b = this.data.salaryNum
    var c = this.data.experienceNum
    var d = this.data.p_id
    var e = this.data.leftTilterNum
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
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
  getPosition() {
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
              p_id: arr[0].p_id,
              desiredPosition: arr
            })
            var a = this.data.educationNum
            var b = this.data.salaryNum
            var c = this.data.experienceNum
            var d = this.data.p_id
            var e = this.data.leftTilterNum
            console.log(a);
            console.log(b);
            console.log(c);
            console.log(d);
            console.log(e);
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
  },
  getAreas(citycode) {
    app.post('/region/getAreas', {
      city_code: citycode.slice(0, 4)
    }).then((res) => {
      if (res.data.status == 1) {
        res.data.data.forEach(i => {
          i.num = 0,
          i.street = []
          i.streetCode = ''
          i.flag=false
        })
        res.data.data.unshift({
          code: this.data.citycode,
          name: '全'+this.data.cityss,
          num: 1,
          flag:false
        })
        this.setData({
          area: res.data.data
        })
      }
    })
  },
  clickAreas(e){
    var area = JSON.parse(JSON.stringify(this.data.area))
    var index = e.currentTarget.dataset.index
    if(index){
      area.forEach(i=>{
        i.num = 0
      })
      area[index].num = 1
      if(index == this.data.id){
        area[index].flag = !area[index].flag
        if(area[index].streetCode){
          area[index].streetCode = ''
        }else{
          area[index].streetCode = area[index].code
          area[index].street = []
        }
        this.getStreet(area[index].name,area[index].code,index,2)
      }else{
        area[index].streetCode = area[index].code
        area[index].flag = true
        this.getStreet(area[index].name,area[index].code,index,1)
      }
      this.setData({
        flag:1,
        id:index
      })
      // this.getStreet(area[index].name,area[index].code,index)
    }else{
      area.forEach(i=>{
        i.num = 0
        i.flag = false
      })
      area[0].num = 1
      this.setData({
        flag:0,
        street:[]
      })
    }
    this.setData({
      area:area
    })
  },
  getStreet(areaname,areacode,index,type) {
    app.post('/region/getStreets', {
      area_code: areacode
    }).then((res) => {
      if (res.data.status == 1) {
        res.data.data.unshift({
          code: areacode,
          name: '全'+areaname,
          active: 1
        })
        if(type==1){
          this.data.area[index].street.forEach(i=>{
            res.data.data.forEach(j=>{
              if(j.code == i){
                j.active = 1
              }
            })
          })
          if(this.data.area[index].street.length != 0){
            res.data.data[0].active = 0
          }else{
            res.data.data[0].active = 1
          }
        }else{
          if(res.data.data[0].active == 1){
            res.data.data.forEach(i => {
              i.active = 0
            })
          }else{
            console.log(1);
            res.data.data[0].active = 1
          }
          // res.data.data.forEach(i => {
          //   i.active = 0
          // })
          // if(area[index].street.length == 0){
          //   res.data.data[0].active = 1
          // }else{
          //   res.data.data[0].active = 0
          // }
          // area[index].street = []
        }
        this.setData({
          street: res.data.data,
          // area:area
        })
      }
    })
  },
  clickStreet(e){
    var area = JSON.parse(JSON.stringify(this.data.area))
    var street = JSON.parse(JSON.stringify(this.data.street))
    var index = e.currentTarget.dataset.index
    if(index){
      street[0].active = 0
      area[this.data.id].streetCode = ''
      var f = area[this.data.id].street.indexOf(street[index].code)
      if(f == -1){
        area[this.data.id].street.push(street[index].code)
      }
      street[index].active = 1
    }else{
      area[this.data.id].street = []
      area[this.data.id].streetCode = street[index].code
      street.forEach(i=>{
        i.active = 0
      })
      street[0].active = 1
    }
    this.setData({
      area:area,
      street:street
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      citys: userInfo.citys,
      cityss: userInfo.citys.slice(0, userInfo.citys.length - 1),
      citycode: userInfo.citycode,
    })
    this.getAreas(userInfo.citycode)
    wx.setNavigationBarTitle({
      title: '求职-求职广场',
    })
    this.getPosition()
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