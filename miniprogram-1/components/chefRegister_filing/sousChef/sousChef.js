// components/sousChef/sousChef.js
const app = getApp()
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
    domain:app.domain+"/img/chef/",
    sousChefArr: [],
    sexs: [{
      code: '001',
      name: '男'
    }, {
      code: '002',
      name: '女'
    }],
    sourceType: [
      'camera', 'album'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    unfold(e){
      var index = e.currentTarget.dataset.index
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      sousChefArr[index].sex.sex_show = !sousChefArr[index].sex.sex_show
      this.setData({
        sousChefArr:sousChefArr
      })
    },
    choose(e){
      var item = e.currentTarget.dataset.item
      var index = e.currentTarget.dataset.index
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      sousChefArr[item].sex.sexValue = this.data.sexs[index].name
      sousChefArr[item].sex.sex_show = false
      sousChefArr[item].sex.fontColor1= "fontColor"
      this.setData({
        sousChefArr:sousChefArr
      })
    },
    close() {
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      sousChefArr.forEach(i=>{
        i.sex.sex_show = false
      })
      this.setData({
        sousChefArr: sousChefArr
      })
    },
    // 输入信息
    enter(e) {
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      var item = e.currentTarget.dataset.item
      var index = e.currentTarget.dataset.index
      if (item == "0") {
        sousChefArr[index].name.nameValue = e.detail.value
        this.setData({
          sousChefArr: sousChefArr
        })
      } else if (item == "1") {
        sousChefArr[index].age.ageValue = e.detail.value
        this.setData({
          sousChefArr: sousChefArr
        })
      } else if (item == "2") {
        sousChefArr[index].phone.phoneValue = e.detail.value
        this.setData({
          sousChefArr: sousChefArr
        })
      }
    },
    // 失去焦点
    blur(e) {
      var nameReg = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,30}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,30}$))/;
      var ageReg = /^((1[0-5])|[1-9])?\d$/;
      var phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      var item = e.currentTarget.dataset.item
      var index = e.currentTarget.dataset.index
      if (item == "0") {
        if (sousChefArr[index].name.nameValue.replace(/\s+/g, '') != "") {
          if (nameReg.test(sousChefArr[index].name.nameValue)) {
            this.setData({})
          } else {
            sousChefArr[index].name.nameValue = ""
            sousChefArr[index].name.namePlaceholder = "格式不正确"
            sousChefArr[index].name.namePlaceholderClass = "placeholderClassErr"
          }
        } else {
          sousChefArr[index].name.nameValue = ""
        }
      } else if (item == "1") {
        if (sousChefArr[index].age.ageValue.replace(/\s+/g, '') != "") {
          if (ageReg.test(sousChefArr[index].age.ageValue)) {
            this.setData({})
          } else {
            sousChefArr[index].age.ageValue = ""
            sousChefArr[index].age.agePlaceholder = "格式不正确"
            sousChefArr[index].age.agePlaceholderClass = "placeholderClassErr"
          }
        } else {
          sousChefArr[index].age.ageValue = ""
        }
      } else if (item == "2") {
        if (sousChefArr[index].phone.phoneValue.replace(/\s+/g, '') != "") {
          if (phoneReg.test(sousChefArr[index].phone.phoneValue)) {
            this.setData({})
          } else {
            sousChefArr[index].phone.phoneValue = ""
            sousChefArr[index].phone.phonePlaceholder = "格式不正确"
            sousChefArr[index].phone.phonePlaceholderClass = "placeholderClassErr"
          }
        } else {
          sousChefArr[index].phone.phoneValue = ""
        }
      }
      this.setData({
        sousChefArr: sousChefArr,
      })
    },
    // 添加健康证
    addImg(e) {
      var index = e.currentTarget.dataset.index
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
            that.chooseImage(res.tapIndex, index, item)
          }
        },
        //失败时回调
        fail(res) {
          console.log('调用失败');
        }
      })
    },
    //打开相册或者照相的方法
    chooseImage(tapIndex, index,item) {
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      const that = this
      //调用微信方法 打开相册或者照相的功能
      wx.chooseMedia({
        count: 1,
        sizeType: ['compressed'],
        //根据下标选择data数据，以此判断是拍照还是相册
        sourceType: [that.data.sourceType[tapIndex]],
        success(res) {
          try {
            app.upload(res.tempFiles[0].tempFilePath, "chef/sousChef"+wx.getStorageSync('chefInfo').chef_id).then(res => {
              if (res.status == 1) {
                if(item == 1){
                  sousChefArr[index].photo = res.data.fullurl
                }else if(item == 2){
                  sousChefArr[index].photos = res.data.fullurl
                }
                that.setData({
                  sousChefArr: sousChefArr
                })
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
    // 添加帮厨
    addChefs() {
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      sousChefArr.push({
        name: {
          nameValue: "",
          namePlaceholder: "请输入姓名",
          namePlaceholderClass: "placeholderClass"
        },
        sex: {
          sexValue: "请选择性别",
          sex_show: false,
          fontColor1: ""
        },
        age: {
          ageValue: "",
          agePlaceholder: "请输入年龄",
          agePlaceholderClass: "placeholderClass"
        },
        phone: {
          phoneValue: "",
          phonePlaceholder: "请输入联系方式",
          phonePlaceholderClass: "placeholderClass"
        },
        photo: "",
        photos: ""
      })
      this.setData({
        sousChefArr: sousChefArr
      })
    },
    // 删除帮厨
    deleteChefs(e) {
      var that = this
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      var index = e.currentTarget.dataset.index
      console.log(index);
      sousChefArr.splice(index, 1)
      wx.showModal({
        content: "是否确定删除？",
        success(res) {
          if (res.confirm) {
            that.setData({
              sousChefArr: sousChefArr
            })
          }
        }
      })

    },
    // 提交信息
    sousChefSubmit(e) {
      wx.showLoading({
        title: '提交中',
      })
      var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
      var newArr = []
      if (sousChefArr.length == 0) {
        sousChefArr.push({})
        try {
          app.post('/chefoperation/saveKitchenHelper', {
            token: wx.getStorageSync('userInfo').chef_token,
            list: JSON.stringify(sousChefArr)
          }).then(res => {
            if (res.data.status == 1) {
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1000 //持续的时间
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'errer',
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
      } else {
        sousChefArr.forEach(i => {
          var obj = {
            kh_name: i.name.nameValue,
            kh_sex: i.sex.sexValue,
            kh_age: i.age.ageValue,
            kh_phone: i.phone.phoneValue,
            kh_health_certificate: i.photos,
            kh_photo:i.photo
          }
          newArr.push(obj)
        })
        var aa = newArr.every(item =>
          item.kh_name != "" && item.kh_sex != "请输入性别" && item.kh_age != "" && item.kh_phone != "" && item.kh_health_certificate != "" && item.kh_photo != ""
        )
        if (aa) {
          try {
            app.post('/chefoperation/saveKitchenHelper', {
              token: wx.getStorageSync('userInfo').chef_token,
              list: JSON.stringify(newArr)
            }).then(res => {
              if (res.data.status == 1) {
                var sousChefArr = JSON.parse(JSON.stringify(this.data.sousChefArr))
                sousChefArr.forEach(i=>{
                    i.name.nameColor = ""
                    i.sex.sexColor = ""
                    i.age.ageColor = ""
                    i.phone.phoneColor = ""
                })
                this.setData({
                  sousChefArr:sousChefArr
                })
                wx.showToast({
                  title: res.data.msg,
                  icon: 'success',
                  duration: 1000 //持续的时间
                })
              } else {
                console.log(res);
                wx.showToast({
                  title: res.data.msg,
                  icon: 'errer',
                  duration: 1000 //持续的时间
                })
              }
            })
          } catch {
            wx.showToast({
              title: '网络不稳定~',
              icon: 'error',
              duration: 1000 //持续的时间
            })
          }
        } else {
          wx.showToast({
            title: "请完善信息",
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      }
    }
  },
  lifetimes: {
    attached: function () {
      wx.showLoading({
        title: '加载中',
      })
      try {
        app.post('/chefoperation/getKitchenHelper', {
          token: wx.getStorageSync('userInfo').chef_token
        }).then(res => {
          if (res.data.status == 1) {
            var sousChefArr = []
            if (res.data.data.length != 0) {
              res.data.data.forEach(i => {
                var obj = {
                  name: {
                    nameValue: i.kh_name,
                    namePlaceholder: "请输入姓名",
                    namePlaceholderClass: "placeholderClass"
                  },
                  sex: {
                    sexValue: i.kh_sex,
                    sex_show: false,
                    fontColor1: "fontColor"
                  },
                  age: {
                    ageValue: i.kh_age,
                    agePlaceholder: "请输入年龄",
                    agePlaceholderClass: "placeholderClass"
                  },
                  phone: {
                    phoneValue: i.kh_phone,
                    phonePlaceholder: "请输入联系方式",
                    phonePlaceholderClass: "placeholderClass"
                  },
                  photo: i.kh_photo,
                  photos: i.kh_health_certificate
                }
                sousChefArr.push(obj)
              })
              this.setData({
                sousChefArr: sousChefArr
              })
            } else {
              this.setData({
                sousChefArr: [{
                  name: {
                    nameValue: "",
                    namePlaceholder: "请输入姓名",
                    namePlaceholderClass: "placeholderClass"
                  },
                  sex: {
                    sexValue: "请选择性别",
                    sex_show: false,
                    fontColor1: ""
                  },
                  age: {
                    ageValue: "",
                    agePlaceholder: "请输入年龄",
                    agePlaceholderClass: "placeholderClass"
                  },
                  phone: {
                    phoneValue: "",
                    phonePlaceholder: "请输入联系方式",
                    phonePlaceholderClass: "placeholderClass"
                  },
                  photo: "",
                  photos: ""
                }],
              })
            }
          }else{
            this.setData({
              sousChefArr: [{
                name: {
                  nameValue: "",
                  namePlaceholder: "请输入姓名",
                  namePlaceholderClass: "placeholderClass"
                },
                sex: {
                  sexValue: "请选择性别",
                  sex_show: false,
                  fontColor1: ""
                },
                age: {
                  ageValue: "",
                  agePlaceholder: "请输入年龄",
                  agePlaceholderClass: "placeholderClass"
                },
                phone: {
                  phoneValue: "",
                  phonePlaceholder: "请输入联系方式",
                  phonePlaceholderClass: "placeholderClass"
                },
                photo: "",
                photos: ""
              }],
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
    }
  }
})