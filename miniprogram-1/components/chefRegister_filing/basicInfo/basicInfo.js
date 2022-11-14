// components/basicInfo/basicInfo.js
const app = getApp()
var QQMapWX = require('../../../utils/js/qqmap-wx-jssdk.min');
const qqMapSdk = new QQMapWX({
  key: 'ABNBZ-GKPLS-FOAOJ-6HOP3-GAWZO-NNFDH'
});
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
    domain: app.domain + "/img/chef/",
    nameValue: "",
    namePlaceholder: "请输入姓名",
    namePlaceholderClass: "placeholderClass",

    ageValue: "",
    agePlaceholder: "请输入年龄",
    agePlaceholderClass: "placeholderClass",

    cookAgeValue: "",
    cookAgePlaceholder: "请输入厨龄",
    cookAgePlaceholderClass: "placeholderClass",

    phoneValue: "",
    phonePlaceholder: "请输入联系方式",
    phonePlaceholderClass: "placeholderClass",

    addressValue: "",
    addressPlaceholder: "请输入详细地址",
    addressPlaceholderClass: "placeholderClass",

    IDValue: "",
    IDPlaceholder: "请输入身份证号码",
    IDPlaceholderClass: "placeholderClass",

    licenseValue: "",
    licensePlaceholder: "请输入营业执照编号",
    licensePlaceholderClass: "placeholderClass",

    sex: [{
      code: '001',
      name: '男'
    }, {
      code: '002',
      name: '女'
    }],
    sexValue: "请选择性别",
    sex_show: false,
    fontColor1: "",

    cuisine: [],
    cuisines: [],
    cuisineValue: "请选择擅长的菜系",
    chef_cuisine: "",
    cuisine_show: false,
    fontColor2: "",

    region: ["请选择地区"],
    regionCode: [],
    fontColor3: "",

    grade: [{
      code: 1,
      name: '初级（国家职业资格五级）'
    }, {
      code: '2',
      name: '中级（国家职业资格四级）'
    }, {
      code: 3,
      name: '高级（国家职业资格三级）'
    }, {
      code: 4,
      name: '技师（国家职业资格二级）'
    }, {
      code: 5,
      name: '高级技师（国家职业资格一级）'
    }],
    gradeValue: "请选择厨师等级",
    gradeCode: "",
    grade_show: false,
    fontColor4: "",

    IDCardDate: "请选择",
    fontColor5: "",

    photo1: "",
    photo2: "",
    photo3: "",
    photo4: "",
    photo5: "",
    photo6: "",
    sourceType: [
      'camera', 'album'
    ],
    runScopeValue: "",
    checked1: "",
    checked2: "",
    checked3: "",
    runScopeValus: ["全部接受", "家宴到家", "酒席"],

    addressObj: {},
    show: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 输入信息
    enter(e) {
      if (e.currentTarget.dataset.item == "0") {
        this.setData({
          nameValue: e.detail.value
        })
      } else if (e.currentTarget.dataset.item == "1") {
        this.setData({
          ageValue: e.detail.value
        })
      } else if (e.currentTarget.dataset.item == "2") {
        this.setData({
          cookAgeValue: e.detail.value
        })
      } else if (e.currentTarget.dataset.item == "3") {
        this.setData({
          phoneValue: e.detail.value
        })
      } else if (e.currentTarget.dataset.item == "4") {
        this.setData({
          addressValue: e.detail.value
        })
      } else if (e.currentTarget.dataset.item == "5") {
        this.setData({
          IDValue: e.detail.value
        })
      } else if (e.currentTarget.dataset.item == "6") {
        this.setData({
          licenseValue: e.detail.value
        })
      }
    },
    // 失去焦点
    blur(e) {
      var nameReg = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
      var ageReg = /^((1[0-5])|[1-9])?\d$/;
      var phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      var licenseReg = /^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$/;
      var IDReg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (e.currentTarget.dataset.item == "0") {
        if (this.data.nameValue.replace(/\s+/g, '') != "") {
          if (nameReg.test(this.data.nameValue)) {} else {
            this.setData({
              namePlaceholder: "格式不正确",
              namePlaceholderClass: "placeholderClassErr",
              nameValue: ""
            })
          }
        } else {
          this.setData({
            nameValue: "",
          })
        }
      } else if (e.currentTarget.dataset.item == "1") {
        if (this.data.ageValue != "") {
          if (ageReg.test(this.data.ageValue)) {} else {
            this.setData({
              agePlaceholder: "格式不正确",
              agePlaceholderClass: "placeholderClassErr",
              ageValue: ""
            })
          }
        } else {
          this.setData({
            ageValue: "",
          })
        }
      } else if (e.currentTarget.dataset.item == "2") {
        if (this.data.cookAgeValue != "") {
          if (ageReg.test(this.data.cookAgeValue)) {} else {
            this.setData({
              cookAgePlaceholder: "格式不正确",
              cookAgePlaceholderClass: "placeholderClassErr",
              cookAgeValue: ""
            })
          }
        } else {
          this.setData({
            cookAgeValue: "",
          })
        }
      } else if (e.currentTarget.dataset.item == "3") {
        if (this.data.phoneValue.replace(/\s+/g, '') != "") {
          if (phoneReg.test(this.data.phoneValue)) {} else {
            this.setData({
              phonePlaceholder: "格式不正确",
              phonePlaceholderClass: "placeholderClassErr",
              phoneValue: ""
            })
          }
        } else {
          this.setData({
            phoneValue: "",
          })
        }
      } else if (e.currentTarget.dataset.item == "4") {
        if (!this.data.addressValue) {
          this.setData({
            addressPlaceholder: "请输入详细地址",
            addressPlaceholderClass: "placeholderClassErr",
            addressValue: ""
          })
        } else {}
      } else if (e.currentTarget.dataset.item == "5") {
        if (this.data.IDValue.replace(/\s+/g, '') != "") {
          if (IDReg.test(this.data.IDValue)) {} else {
            this.setData({
              IDPlaceholder: "格式不正确",
              IDPlaceholderClass: "placeholderClassErr",
              IDValue: ""
            })
          }
        } else {
          this.setData({
            IDValue: "",
          })
        }
      } else if (e.currentTarget.dataset.item == "6") {
        if (this.data.licenseValue.replace(/\s+/g, ' ') != "") {
          if (licenseReg.test(this.data.licenseValue)) {

          } else {
            this.setData({
              licensePlaceholder: "格式不正确",
              licensePlaceholderClass: "placeholderClassErr",
              licenseValue: ""
            })
          }
        } else {
          this.setData({
            licenseValue: "",
          })
        }
      }
    },
    unfold(e) {
      var item = e.currentTarget.dataset.item
      if (item == 0) {
        this.setData({
          sex_show: !this.data.sex_show,
          cuisine_show: false,
          grade_show: false
        })
      } else if (item == 1) {
        this.setData({
          cuisine_show: !this.data.cuisine_show,
          sex_show: false,
          grade_show: false
        })
      } else if (item == 2) {
        this.setData({
          grade_show: !this.data.grade_show,
          sex_show: false,
          cuisine_show: false
        })
      }
    },
    choose(e) {
      var index = e.currentTarget.dataset.index
      var item = e.currentTarget.dataset.item
      if (item == 0) {
        this.setData({
          sexValue: this.data.sex[index].name,
          sex_show: false,
          fontColor1: "fontColor"
        })
        chefInfo.chef_sex = this.data.sex[index].name
      } else if (item == 1) {
        var cuisine = JSON.parse(JSON.stringify(this.data.cuisine))
        if (cuisine[index].active == "") {
          cuisine[index].active = "active"
        } else {
          cuisine[index].active = ""
        }
        this.setData({
          cuisine: cuisine
        })
      } else if (item == 2) {
        this.setData({
          gradeValue: this.data.grade[index].name,
          gradeCode: this.data.grade[index].code,
          grade_show: false,
          fontColor4: "fontColor"
        })

      }
    },
    close() {
      this.setData({
        sex_show: false,
        cuisine_show: false,
        grade_show: false,
        cuisine: this.data.cuisines
      })
    },
    block() {},
    finish() {
      var value = ""
      var chef_cuisine = ""
      var fontColor = ""
      var cuisine = this.data.cuisine.filter(i => i.active == "active")
      if (cuisine.length == 0) {
        value = "请选择擅长的菜系"
        fontColor = ""
      } else {
        cuisine.forEach(i => {
          if (i.active == "active") {
            value += i.cont + ","
            fontColor = "fontColor"
            chef_cuisine += i.cuisine_id + ","
          }
        })
        value = value.substring(0, value.lastIndexOf(','));
        chef_cuisine = chef_cuisine.substring(0, chef_cuisine.lastIndexOf(','));
      }
      this.setData({
        cuisine_show: false,
        fontColor2: fontColor,
        cuisineValue: value,
        chef_cuisine: chef_cuisine,
        cuisine: cuisine,
        cuisines: this.data.cuisine
      })
    },
    siteTesting: function (e) {
      var addressObj = this.data.addressObj
      console.log(addressObj);
      if (!addressObj.province) {
        this.areaSelect.showDialog();
      } else {
        this.areaSelect.pass({
          addressObj: addressObj
        });
      }
      this.setData({
        show: true
      })
    },
    bindDateChange(e) {
      this.setData({
        IDCardDate: e.detail.value,
        fontColor5: "fontColor"
      })
    },
    radioChange(e) {
      var val = e.detail.value
      if (val == "全部接受") {
        this.setData({
          runScopeValue: "0"
        })
      } else if (val == "家宴到家") {
        this.setData({
          runScopeValue: "1"
        })
      } else if (val == "酒席") {
        this.setData({
          runScopeValue: "2"
        })
      }
    },
    // 上传图片
    upload(e) {
      var item = e.currentTarget.dataset.item
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
            app.upload(res.tempFiles[0].tempFilePath, "chef" + wx.getStorageSync('chefInfo').chef_id).then(res => {
              if (res.status == 1) {
                if (item == 1) {
                  that.setData({
                    photo1: res.data.fullurl
                  })
                } else if (item == 2) {
                  that.setData({
                    photo2: res.data.fullurl
                  })
                } else if (item == 3) {
                  that.setData({
                    photo3: res.data.fullurl
                  })
                } else if (item == 4) {
                  that.setData({
                    photo4: res.data.fullurl
                  })
                } else if (item == 5) {
                  that.setData({
                    photo5: res.data.fullurl
                  })
                } else if (item == 6) {
                  that.setData({
                    photo6: res.data.fullurl
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
    addressResolution(addres, callback) {
      qqMapSdk.geocoder({
        //获取表单传入地址
        address: addres, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
        success: function (res) { //成功后的回调
          var latitude = res.result.location.lat;
          var longitude = res.result.location.lng;
          callback({
            longitude: longitude,
            latitude: latitude
          })
        }
      })
    },
    // 提交信息
    basicInfosubmit() {
      wx.showLoading({
        title: '提交中',
      })
      var obj = {
        chef_photo: this.data.photo1,
        chef_name: this.data.nameValue,
        chef_sex: this.data.sexValue,
        chef_age: this.data.ageValue,
        chef_cooking_age: this.data.cookAgeValue,
        chef_phone: this.data.phoneValue,
        chef_cuisine: this.data.chef_cuisine,
        chef_province: this.data.regionCode[0],
        chef_city: this.data.regionCode[1],
        chef_area: this.data.regionCode[2],
        chef_street: this.data.regionCode[3],
        chef_village: this.data.regionCode[4],
        chef_work_address: this.data.addressValue,
        chef_carry_type: this.data.runScopeValue,
        chef_level: this.data.gradeCode,
        chef_cheflicense: this.data.photo2,
        chef_idcard: this.data.IDValue,
        chef_validity_id_card: this.data.IDCardDate,
        chef_idcard_path: this.data.photo3,
        chef_idcard_other_side_path: this.data.photo4,
        chef_license: this.data.licenseValue,
        chef_license_path: this.data.photo5,
        chef_health_certificate: this.data.photo6,
      }
      if (obj.chef_photo != "" && obj.chef_name != "" && obj.chef_sex != "请选择性别" && obj.chef_age != "" && obj.chef_cooking_age != "" && obj.chef_phone != "" && this.data.cuisineValue != "请选择擅长的菜系" && obj.chef_work_address != "" && obj.chef_carry_type != "" && this.data.gradeValue != "请选择厨师等级" && obj.chef_cheflicense != "" && obj.chef_idcard != "" && obj.chef_validity_id_card != "请选择" && obj.chef_idcard_path != "" && obj.chef_idcard_other_side_path != "" && obj.chef_license != "" && obj.chef_license_path != "" && obj.chef_health_certificate != "" && obj.chef_province != "" && obj.chef_city != "" && obj.chef_area != "") {
        var addres = this.data.region[0] + this.data.region[1] + this.data.region[2] + this.data.region[3] + this.data.region[4] + this.data.addressValue
        this.addressResolution(addres, (res) => {
          obj.chef_work_latitude = res.latitude
          obj.chef_work_longitude = res.longitude
          obj.token = wx.getStorageSync('userInfo').chef_token
          try {
            app.post('/chefoperation/updates', obj).then(res => {
              if (res.data.status == 1) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 1000 //持续的时间
                })
                wx.removeStorageSync('chefInfo')
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'error',
                  duration: 1000 //持续的时间
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
        })
      } else {
        wx.showToast({
          title: '请完善信息',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    },
    findObj(Arr, j) {
      var a = {}
      Arr.forEach((i) => {
        if (i.code == j) {
          a = i
        }
      })
      return a
    },
    _cancelEvent(e) {
      var addressObj = this.data.addressObj
      this.setData({
        show: e.detail.show
      })
      if (!addressObj.province) {
        this.areaSelect.hideDialog();
      }
    },
    _confirmEvent(e) {
      var Obj = this.areaSelect.data.addressObj
      var region = [
        Obj.province.provinceName,
        Obj.city.cityName,
        Obj.area.areaName,
        Obj.address.addressName,
        Obj.community.communityName,
      ]
      var regionCode = [
        Obj.province.provinceCode,
        Obj.city.cityCode,
        Obj.area.areaCode,
        Obj.address.addressCode,
        Obj.community.communityCode,
      ]
      this.setData({
        show: e.detail.show,
        addressObj: Obj,
        region: region,
        regionCode: regionCode,
        fontColor3: "fontColor",
      })
    },
    eventhandle() {
      var addressObj = this.data.addressObj
      if (!addressObj.province) {
        this.areaSelect.hideDialog();
      }
      this.setData({
        show: false
      })
    },
  },
  lifetimes: {
    attached: function () {
      this.areaSelect = this.selectComponent("#areaSelect");
      wx.showLoading({
        title: '加载中',
      })
      var cuisineArr = []
      var cuisine = wx.getStorageSync('cuisine')
      cuisine.forEach(i => {
        cuisineArr.push({
          cont: i.cuisine_name,
          active: "",
          cuisine_id: i.cuisine_id
        })
      })
      try {
        app.post('/chefoperation/getChefInfo', {
          token: wx.getStorageSync('userInfo').chef_token
        }).then(res => {
          if (res.data.status == 1) {
            var res = res.data.data
            console.log(res);
            var chef_region = [res.local.provinces, res.local.city, res.local.area, res.local.street, res.local.village]
            var cuisineValue = ""
            var chef_cuisine = ""
            res.chef_cuisine.forEach(i => {
              cuisineValue += cuisineArr.find(j => j.cuisine_id == i.cuisine_id).cont + ","
              cuisineArr.find(j => j.cuisine_id == i.cuisine_id).active = "active"
              chef_cuisine += i.cuisine_id + ","
            })
            chef_cuisine = chef_cuisine.substring(0, chef_cuisine.lastIndexOf(','));
            cuisineValue = cuisineValue.substring(0, cuisineValue.lastIndexOf(','));
            this.setData({
              photo1: res.chef_photo,
              nameValue: res.chef_name,
              sexValue: res.chef_sex,
              ageValue: res.chef_age,
              cookAgeValue: res.chef_cooking_age,
              phoneValue: res.chef_phone,
              cuisineValue: cuisineValue,
              chef_cuisine: chef_cuisine,
              region: chef_region,
              regionCode: [res.chef_province, res.chef_city, res.chef_area, res.chef_street, res.chef_village],
              addressValue: res.chef_work_address ? res.chef_work_address : "",
              gradeValue: res.chef_level ? this.data.grade.find(i => i.code == res.chef_level).name : "请选择厨师等级",
              gradeCode: res.chef_level,
              photo2: res.chef_cheflicense,
              IDValue: res.chef_idcard,
              IDCardDate: res.chef_validity_id_card ? res.chef_validity_id_card : "请选择",
              photo3: res.chef_idcard_path,
              photo4: res.chef_idcard_other_side_path ? res.chef_idcard_other_side_path : "",
              licenseValue: res.chef_license ? res.chef_license : "",
              photo5: res.chef_license_path ? res.chef_license_path : "",
              photo6: res.chef_health_certificate ? res.chef_health_certificate : "",
              fontColor1: "fontColor",
              fontColor2: "fontColor",
              fontColor3: "fontColor",
              fontColor4: "fontColor",
              fontColor5: "fontColor",
              cuisine: cuisineArr,
              cuisines: cuisineArr
            })
            if (res.chef_carry_type == 0) {
              this.setData({
                checked1: true,
                runScopeValue: res.chef_carry_type.toString()
              })
            } else if (res.chef_carry_type == 1) {
              this.setData({
                checked2: true,
                runScopeValue: res.chef_carry_type.toString()
              })
            } else if (res.chef_carry_type == 2) {
              this.setData({
                checked3: true,
                runScopeValue: res.chef_carry_type.toString()
              })
            }
            res.chef_cuisine = chef_cuisine
            delete res.local
            res.chef_region = chef_region
            delete res.score
            delete res.red_black
            wx.setStorageSync('chefInfo', res)
            wx.hideLoading()
          }
        })
      } catch {
        wx.showToast({
          title: '网络不稳定~',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
      this.setData({
        cuisine: cuisineArr,
        cuisines: cuisineArr
      })
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
}) //91330327MA298MDQ8F 13456966189