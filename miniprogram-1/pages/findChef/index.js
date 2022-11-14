// pages/findChef/index.js
const app = getApp()
var QQMapWX = require('../../utils/js/qqmap-wx-jssdk.min');
const qqMapSdk = new QQMapWX({
  key: 'ABNBZ-GKPLS-FOAOJ-6HOP3-GAWZO-NNFDH'
});
var startY, endY;
var moveFlag = true; // 判断执行滑动事件
Page({
  data: {
    domain: app.domain + "/img/index/",
    // 自定义顶部导航栏模块数据
    navHeight: '',
    searchMarginTop: 0, // 搜索框上边距
    searchHeight: 0, // 搜索框高度
    searchHeights: 0,
    region: [],
    area_code: 0,
    // 筛选模块数据
    selectsTop: 0,
    down1: "../../icon/down.png",
    down2: "../../icon/down.png",
    down3: "../../icon/down.png",
    upAndDown1: "downs",
    upAndDown2: "downs",
    upAndDown3: "downs",
    telescopic1: "",
    telescopic2: "",
    telescopic3: "",
    distances: [{
        cont: "全区",
        color: "",
        flag: 0
      },
      {
        cont: "500m",
        color: "",
        flag: 0
      },
      {
        cont: "1km",
        color: "",
        flag: 0
      },
      {
        cont: "3km",
        color: "",
        flag: 0
      },
      {
        cont: "5km",
        color: "",
        flag: 0
      },
      {
        cont: "10km",
        color: "",
        flag: 0
      }
    ],
    distanceValue: "距离我",
    distance_show: false,
    distance: "",
    fontColor1: "",
    goodAt: [{
        cont: "不限",
        active: "",
        flag: 0
      },
      {
        cont: "浙菜",
        active: "",
        flag: 0
      },
      {
        cont: "鲁菜",
        active: "",
        flag: 0
      },
      {
        cont: "川菜",
        active: "",
        flag: 0
      },
      {
        cont: "湘菜",
        active: "",
        flag: 0
      },
      {
        cont: "闽菜",
        active: "",
        flag: 0
      },
      {
        cont: "苏菜",
        active: "",
        flag: 0
      },
      {
        cont: "徽菜",
        active: "",
        flag: 0
      },
      {
        cont: "粤菜",
        active: "",
        flag: 0
      }
    ],
    goodAts: [],
    goodAtValue: "擅长菜系",
    goodAtCode: 0,
    goodAt_show: false,
    fontColor2: "",
    grade: [{
        cont: "不限",
        code: 0,
        color: "",
        flag: 0
      },
      {
        cont: "初级(国家职业资格五级)",
        code: 1,
        color: "",
        flag: 0
      },
      {
        cont: "中级(国家职业资格四级)",
        code: 2,
        color: "",
        flag: 0
      },
      {
        cont: "高级(国家职业资格三级)",
        code: 3,
        color: "",
        flag: 0
      },
      {
        cont: "技师(国家职业资格二级)",
        code: 4,
        color: "",
        flag: 0
      },
      {
        cont: "高级技师(国家职业资格一级)",
        code: 5,
        color: "",
        flag: 0
      }
    ],
    gradeValue: "厨师等级",
    gradeCode: 0,
    grade_show: false,
    fontColor3: "",
    // Map模块数据
    showview: false,
    latitude: "",
    longitude: "",
    latitudes: "",
    longitudes: "",
    show_ani: "",
    addressArr: [],
    upload: {},
    value: "",
    // 滑块数据
    anima: "",
    openScroll: true,
    fullScreen: false,
    chefs: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    markers: [],
    adcode: 0,
    current: 0,
    flags:0
  },
  bbb() {
    var grade = JSON.parse(JSON.stringify(this.data.grade))
    grade.forEach(i => {
      i.flag = 0
      i.color = ""
    })
    grade[0].flag = 1
    grade[0].color = "fontColor"
    var goodAt = JSON.parse(JSON.stringify(this.data.goodAt))
    goodAt.forEach(i => {
      i.active = ""
      i.flag = 0
    })
    goodAt[0].active = "active"
    goodAt[0].flag = 0
    var distances = JSON.parse(JSON.stringify(this.data.distances))
    distances.forEach(i => {
      i.flag = 0
      i.color = ""
    })
    distances[0].flag = 1
    distances[0].color = "fontColor"
    this.setData({
      gradeValue: "厨师等级",
      gradeCode: 0,
      grade: grade,
      goodAt: goodAt,
      goodAts: goodAt,
      goodAtValue: "擅长菜系",
      goodAtCode: 0,
      distanceValue: "距离我",
      distances: distances,
      current: 0
    })
  },
  getLocation() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: res => {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          latitudes: res.latitude,
          longitudes: res.longitude
        })
        qqMapSdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (res) => {
            var adcode = res.result.ad_info.adcode
            that.findChef(1,res.result.ad_info.adcode)
            this.setData({
              region: [res.result.ad_info.province, res.result.ad_info.city, res.result.ad_info.district],
              area_code: adcode,
              anima: "upToDown",
            })
          }
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '获取地址失败',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    })
  },
  regionchange(e) {
    var that = this
    if (e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')) {
      that.map = wx.createMapContext("maps", that);
      that.map.getCenterLocation({
        type: 'gcj02',
        success: (res) => {
          this.setData({
            show_ani: "show",
            latitude: res.latitude,
            longitude: res.longitude,
            showview: false,
            value: ""
          })
          qqMapSdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: (res) => {
              var adcode = res.result.ad_info.adcode
              if (adcode != this.data.area_code) {
                this.findChef(1,res.result.ad_info.adcode, 2)
                this.setData({
                  region: [res.result.ad_info.province, res.result.ad_info.city, res.result.ad_info.district],
                  area_code: adcode
                })
                this.bbb()
              }
            }
          })
        }
      })
    }
  },
  bindRegionChange: function (e) {
    var that = this
    this.setData({
      region: e.detail.value,
      area_code: e.detail.code[2],
      adcode: 0
    })
    qqMapSdk.geocoder({
      //获取表单传入地址
      address: e.detail.value[0] + e.detail.value[1] + e.detail.value[2], //地址
      success: function (res) { //成功后的回调
        that.setData({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
        })
        qqMapSdk.reverseGeocoder({
          location: {
            latitude: res.result.location.lat,
            longitude: res.result.location.lng
          },
          success: (res) => {
            var adcode = res.result.ad_info.adcode
            that.findChef(1,res.result.ad_info.adcode, 1)
            that.setData({
              region: [res.result.ad_info.province, res.result.ad_info.city, res.result.ad_info.district],
              area_code: adcode
            })
            that.bbb()
            setTimeout(()=>{
              wx.showLoading({
                title: '加载中'
              })
            })
          }
        })
      }
    })
  },
  unfold(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      if (this.data.distance_show) {
        this.setData({
          down1: "../../icon/down.png",
          fontColor1: "",
          upAndDown1: "downs",
          telescopic1: "shrink"
        })
        setTimeout(() => {
          this.setData({
            distance_show: false,
          })
        }, 300)
        return
      }
      this.setData({
        down1: "../../icon/down_active.png",
        down2: "../../icon/down.png",
        down3: "../../icon/down.png",
        fontColor1: "fontColor",
        fontColor2: "",
        fontColor3: "",
        upAndDown1: "up",
        upAndDown2: "downs",
        upAndDown3: "downs",
        telescopic1: "stretch",
        goodAt_show: false,
        grade_show: false,
      })
      setTimeout(() => {
        this.setData({
          distance_show: true
        })
      }, 200)
    } else if (item == 2) {
      if (this.data.goodAt_show) {
        this.setData({
          down2: "../../icon/down.png",
          fontColor2: "",
          upAndDown2: "downs",
          telescopic2: "shrink"
        })
        setTimeout(() => {
          this.setData({
            goodAt_show: false,
            goodAt: this.data.goodAts
          })
        }, 300)
        return
      }
      this.setData({
        down1: "../../icon/down.png",
        down2: "../../icon/down_active.png",
        down3: "../../icon/down.png",
        fontColor1: "",
        fontColor2: "fontColor",
        fontColor3: "",
        upAndDown1: "downs",
        upAndDown2: "up",
        upAndDown3: "downs",
        telescopic2: "stretch",
        distance_show: false,
        grade_show: false,
      })
      setTimeout(() => {
        this.setData({
          goodAt_show: true
        })
      }, 200)
    } else if (item == 3) {
      if (this.data.grade_show) {
        this.setData({
          down3: "../../icon/down.png",
          fontColor3: "",
          upAndDown3: "downs",
          telescopic3: "shrink"
        })
        setTimeout(() => {
          this.setData({
            grade_show: false
          })
        }, 300)
        return
      }
      this.setData({
        down1: "../../icon/down.png",
        down2: "../../icon/down.png",
        down3: "../../icon/down_active.png",
        fontColor1: "",
        fontColor2: "",
        fontColor3: "fontColor",
        upAndDown3: "up",
        upAndDown1: "downs",
        upAndDown2: "downs",
        telescopic3: "stretch",
        distance_show: false,
        goodAt_show: false,
      })
      setTimeout(() => {
        this.setData({
          grade_show: true
        })
      }, 200)
    }
  },
  choose(e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    if (item == 1) {
      var distances = JSON.parse(JSON.stringify(this.data.distances))
      distances.forEach(i => {
        i.flag = 0
        i.color = ""
      })
      distances[index].flag = 1
      distances[index].color = "fontColor"
      this.setData({
        down1: "../../icon/down.png",
        fontColor1: "",
        upAndDown1: "downs",
        telescopic1: "shrink",
        distanceValue: this.data.distances[index].cont == "全区" ? "距离我" : this.data.distances[index].cont,
        distance: this.data.distances[index].cont == "500m" ? 500 : this.data.distances[index].cont == "1km" ? 1000 : this.data.distances[index].cont == "3km" ? 3000 : this.data.distances[index].cont == "5km" ? 5000 : this.data.distances[index].cont == "10km" ? 10000 : "",
        distances: distances
      })
      setTimeout(() => {
        this.setData({
          distance_show: false
        })
        this.findChef(1,this.data.area_code, 2, this.data.distance, this.data.goodAtCode, this.data.gradeCode)
        wx.showLoading({
          title: '加载中'
        })
      }, 300)
    } else if (item == 2) {
      var goodAt = JSON.parse(JSON.stringify(this.data.goodAt))
      if (index == 0) {
        if (goodAt[0].flag == 1) {
          goodAt[0].flag = 0
          goodAt[0].active = ""
        } else if (goodAt[0].flag == 0) {
          goodAt.forEach(i => {
            i.flag = 0
            i.active = ""
          })
          goodAt[0].flag = 1
          goodAt[0].active = "active"
          this.setData({
            flags:0
          })
        }
      } else {
        goodAt[0].flag = 0
        goodAt[0].active = ""
        if (goodAt[index].flag == 0) {
          goodAt[index].flag = 1
          goodAt[index].active = "active"
          this.setData({
            flags:1
          })
        } else {
          goodAt[index].flag = 0
          goodAt[index].active = ""
          this.setData({
            flags:0
          })
        }
      }
      this.setData({
        goodAt: goodAt
      })
    } else if (item == 3) {
      var grade = JSON.parse(JSON.stringify(this.data.grade))
      grade.forEach(i => {
        i.flag = 0
        i.color = ""
      })
      grade[index].flag = 1
      grade[index].color = "fontColor"
      this.setData({
        down3: "../../icon/down.png",
        fontColor3: "",
        upAndDown3: "downs",
        telescopic3: "shrink",
        gradeValue: this.data.grade[index].cont == "不限" ? "厨师等级" : this.data.grade[index].cont,
        gradeCode: this.data.grade[index].code,
        grade: grade
      })
      setTimeout(() => {
        this.setData({
          grade_show: false
        })
        this.findChef(1,this.data.area_code, 2, this.data.distance, this.data.goodAtCode, this.data.gradeCode)
        wx.showLoading({
          title: '加载中'
        })
      }, 300)
    }
  },
  finish() {
    var value = ""
    var code = ""
    var goodAt = this.data.goodAt.filter(i => i.flag == 1)
    if (goodAt.length == 0 || goodAt[0].cont == "不限") {
      value = "擅长菜系"
      code = 0
    } else {
      goodAt.forEach(i => {
        if (i.flag == 1) {
          value += i.cont + ","
          code += i.code + ","
        }
      })
      value = value.substring(0, value.lastIndexOf(','));
      code = code.substring(0, code.lastIndexOf(','));
    }
    var goodAts = JSON.parse(JSON.stringify(this.data.goodAt))
    var flag = goodAts.some(i => i.active == '')
    if(flag&&this.data.flags==0){
      goodAts[0].flag = 1
      goodAts[0].active = "active"
    }
    this.setData({
      down2: "../../icon/down.png",
      fontColor2: "",
      upAndDown2: "downs",
      telescopic2: "shrink",
      goodAtValue: value,
      goodAtCode: code,
      goodAts: this.data.goodAt,
      goodAt: goodAts
    })
    wx.setStorageSync('goodAt', this.data.goodAt)
    setTimeout(() => {
      this.setData({
        goodAt_show: false
      })
      this.findChef(1,this.data.area_code, 2, this.data.distance, this.data.goodAtCode, this.data.gradeCode)
      wx.showLoading({
        title: '加载中'
      })
    }, 300)
  },
  close() {
    this.setData({
      down1: "../../icon/down.png",
      fontColor1: "",
      upAndDown1: "downs",
      telescopic1: "shrink",
      down2: "../../icon/down.png",
      fontColor2: "",
      upAndDown2: "downs",
      telescopic2: "shrink",
      down3: "../../icon/down.png",
      fontColor3: "",
      upAndDown3: "downs",
      telescopic3: "shrink"
    })
    setTimeout(() => {
      this.setData({
        distance_show: false,
        goodAt_show: false,
        grade_show: false,
        goodAt: this.data.goodAts
      })
    }, 300)
  },
  //进行经纬度转换为距离的计算
  Rad(d) {
    return d * Math.PI / 180.0;
  },
  // getMapDistance(lat1, lng1, lat2, lng2) {
  //   var radLat1 = this.Rad(lat1);
  //   var radLat2 = this.Rad(lat2);
  //   var a = radLat1 - radLat2;
  //   var b = this.Rad(lng1) - this.Rad(lng2);
  //   var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  //     Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  //   s = s * 6378.137; // EARTH_RADIUS;
  //   s = Math.round(s * 10000) / 10000;
  //   return s;
  // },
  // 点击地图
  clickMap() {
    this.setData({
      anima: "middleToUp"
    })
    setTimeout(() => {
      if (this.data.chefs.length != 0) {
        this.setData({
          fullScreen: true
        })
      }
    }, 300)
  },
  // 触摸开始事件
  touchStart: function (e) {
    startY = e.touches[0].pageY; // 获取触摸时的原点
    moveFlag = true;
  },
  // 触摸移动事件
  touchMove: function (e) {
    endY = e.touches[0].pageY; // 获取触摸时的原点
    if (moveFlag) {
      if (endY - startY > 50) {
        moveFlag = false;
        if (this.data.anima == "upToDown") {
          this.setData({
            anima: "downToMiddle",
            openScroll: false
          })
        } else if (this.data.anima == "downToMiddle") {
          this.setData({
            anima: "middleToUp"
          })
          setTimeout(() => {
            var markers = JSON.parse(JSON.stringify(this.data.markers))
            if (markers.length != 0) {
              markers.forEach(i => {
                i.callout.bgColor = '#4768f3'
                i.callout.borderColor = '#4768f3'
              })
              markers[0].callout.bgColor = '#e70013'
              markers[0].callout.borderColor = '#e70013'
              this.setData({
                fullScreen: true,
                markers: markers,
                latitude: markers[0].latitude,
                longitude: markers[0].longitude,
                current:0
              })
            }
          }, 300)
        } else if (this.data.anima == "middleToDown") {
          this.setData({
            anima: "downToMiddle",
            openScroll: false
          })
        }
      }
      // 上
      if (startY - endY > 50) {
        moveFlag = false;
        if (this.data.anima == "downToMiddle") {
          this.setData({
            anima: "middleToDown",
            openScroll: true
          })
        }
      }
    }
  },
  uselessEvent() {},
  // 触摸结束事件
  touchEnd: function () {
    moveFlag = true; // 回复滑动事件
  },
  viewList() {
    this.setData({
      anima: "upToDown",
      openScroll: true,
      fullScreen: false,
    })
  },
  getSetting: function () {
    let that = this;
    wx.getSetting({
      success: (res) => {
        // 查看位置权限的状态 如果是首次授权(undefined)或者之前拒绝授权(false)            
        //!res.authSetting['scope.userLocation']
        if (res.authSetting['scope.userLocation'] == false) {
          //之前拒绝授权(false)
          that.openConfirm()
        } else {
          //如果是首次授权则弹出授权窗口进行授权，如果之前进行了授权，则获取地理位置信息
          that.getLocation()
        }
      }
    })
  },
  openConfirm: function () {
    let that = this;
    wx.showModal({
      content: '检测到您没打开定位权限，是否去设置打开？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => {
              that.getLocation()
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  // 查找厨师
  findChef(page, area, type, distance = '', cuisine, cheflevel) {
    var obj = {
      token: wx.getStorageSync('userInfo').token,
      area: area,
      latitude: this.data.latitudes,
      longitude: this.data.longitudes,
      page:page
    }
    if (distance != "") {
      obj.distance = distance
    }
    if (cheflevel) {
      obj.cheflevel = cheflevel
    }
    if (cuisine) {
      obj.cuisine = cuisine
    }
    try {
      app.post('/house/findChef', obj).then(res => {
        if (res.data.status == 1) {
          wx.hideLoading()
          var chefArr = []
          res.data.data.rows.forEach((i, index) => {
            i.chef_name = i.chef_name.slice(0, 1) + '师傅'
            var obj = {
              id: index,
              latitude: Number(i.chef_work_latitude),
              longitude: Number(i.chef_work_longitude),
              width: 0,
              height: 0,
              iconPath: "../../icon/down_arrow.png",
              callout: {
                content: '—' + i.chef_name + '—',
                display: "ALWAYS",
                color: "#fff",
                fontSize: 15,
                borderRadius: 4,
                borderWidth: 2,
                bgColor: "#4768f3",
                borderColor: "#4768f3",
                padding: "2",
                textAlign: "center",
                anchorX: 0,
                anchorY: 20,
              }
            }
            chefArr.push(obj)
            i.distance = i.distance >= 1000 ? (Math.round(i.distance) / 1000).toFixed(1) + 'km' : Math.round(i.distance) + 'm'
          })
          if (chefArr.length == 0) {
            wx.showToast({
              title: '暂无厨师',
              icon: 'error',
              duration: 1000 //持续的时间
            })
            this.setData({
              fullScreen: false
            })
          } else if (this.data.anima == "middleToUp" && chefArr.length != 0) {
            this.setData({
              fullScreen: true
            })
          }
          if (this.data.fullScreen && chefArr.length != 0) {
            chefArr[0].callout.bgColor = '#e70013'
            chefArr[0].callout.borderColor = '#e70013'
          } else if (!this.data.fullScreen && chefArr.length != 0 && type == 1) {
            this.setData({
              anima: "upToDown"
            })
          } 
          // else if (!this.data.fullScreen && chefArr.length != 0 && type == 2) {
          //   chefArr[0].callout.bgColor = '#e70013'
          //   chefArr[0].callout.borderColor = '#e70013'
          //   this.setData({
          //     fullScreen: true
          //   })
          // }
          if(page>1){
            this.setData({
              markers: this.data.markers.concat(chefArr),
              chefs: this.data.chefs.concat(res.data.data.rows)
            })
          }else{
            this.setData({
              markers: chefArr,
              chefs: res.data.data.rows
            })
          }
        } else {
          wx.showToast({
            title: '当前系统繁忙',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      })
    } catch (error) {
      wx.showToast({
        title: '网络不稳定~',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },
  lower() {
    if (this.data.chefs.length % 10 == 0) {
      this.setData({
        page: this.data.page + 1
      })
      wx.showLoading({
        title: '加载中'
      })
      this.findChef(this.data.page,this.data.area_code, 2, this.data.distance, this.data.goodAtCode, this.data.gradeCode)
    }
  },
  // 轮播图index改变时
  eventhandle(e) {
    var markers = JSON.parse(JSON.stringify(this.data.markers))
    markers.forEach(i => {
      i.callout.bgColor = '#4768f3'
      i.callout.borderColor = '#4768f3'
    })
    markers[e.detail.current].callout.bgColor = '#e70013'
    markers[e.detail.current].callout.borderColor = '#e70013'
    this.setData({
      markers: markers
    })
  },
  // 点击气泡
  callouttaphandle(e) {
    var markers = JSON.parse(JSON.stringify(this.data.markers))
    markers.forEach(i => {
      i.callout.bgColor = '#4768f3'
      i.callout.borderColor = '#4768f3'
    })
    markers[e.markerId].callout.bgColor = '#e70013'
    markers[e.markerId].callout.borderColor = '#e70013'
    this.setData({
      markers: markers,
      current: e.markerId,
      anima: "middleToUp"
    })
    setTimeout(() => {
      this.setData({
        fullScreen: true
      })
    }, 300)
  },
  // 阻挡
  block() {},
  onLoad() {
    wx.showLoading({
      title: '加载中'
    })
    this.getSetting()
    var distances = JSON.parse(JSON.stringify(this.data.distances))
    distances[0].flag = 1
    distances[0].color = "fontColor"
    var goodAt = []
    var cuisine = wx.getStorageSync('cuisine')
    cuisine.unshift({
      cuisine_id: 0,
      cuisine_name: "不限"
    })
    cuisine.forEach(i => {
      goodAt.push({
        cont: i.cuisine_name,
        code: i.cuisine_id,
        active: "",
        flag: 0
      })
    })
    goodAt[0].flag = 1
    goodAt[0].active = "active"
    var grade = JSON.parse(JSON.stringify(this.data.grade))
    grade[0].flag = 1
    grade[0].color = "fontColor"
    this.setData({
      distances: distances,
      goodAt: goodAt,
      grade: grade,
      goodAts: goodAt
    })
  },
  onShow: function () {
    const { top,width,height, right} = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: (res) => {
        const {statusBarHeight} = res
        const margin = top - statusBarHeight
        this.setData({
          navHeight: height + statusBarHeight + (margin * 2),
          searchHeights: res.windowHeight - (height + statusBarHeight + (margin * 2)) - 50,
          selectsTop: (height + statusBarHeight + (margin * 2)) + 10,
          searchMarginTop: statusBarHeight + margin, // 状态栏 + 胶囊按钮边距
          searchHeight: height, // 与胶囊按钮同高
          searchWidth: right - width - 20 // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
        })
      }
    })
  }
})