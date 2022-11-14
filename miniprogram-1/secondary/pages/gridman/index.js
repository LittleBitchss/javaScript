// pages/gridman/gridman.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gridmanInfo: {
      img: app.domain + "/img/admin/filing-active.png",
      fontColor: "fontColor"
    },
    countryBanquetList: {
      img: app.domain + "/img/admin/information.png",
      fontColor: ""
    },
    index: 0,
    sexValue: "",
    provinceValue: "",
    cityValue: "",
    areaValue: "",
    streetValue: "",
    villageValue: "",
    nameValue: "",
    phoneValue: "",
    photo: "",
    sourceType: [
      'camera', 'album'
    ],
    show: false,
    data: []
  },
  toggle(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        gridmanInfo: {
          img: app.domain + "/img/admin/filing-active.png",
          fontColor: "fontColor"
        },
        countryBanquetList: {
          img: app.domain + "/img/admin/information.png",
          fontColor: ""
        },
        index: 0
      })
      wx.setNavigationBarTitle({
        title: '我的信息'
      })
    } else if (index == 1) {
      this.setData({
        gridmanInfo: {
          img: app.domain + "/img/admin/filing.png",
          fontColor: ""
        },
        countryBanquetList: {
          img: app.domain + "/img/admin/information-active.png",
          fontColor: "fontColor"
        },
        index: 1
      })
      wx.setNavigationBarTitle({
        title: '乡宴列表'
      })
      try {
        app.post('/gridmember/matsuriList', {
          gm_token: wx.getStorageSync('gridman').gm_token
        }).then(res => {
          if (res.data.status == 1) {
            res.data.data.forEach(i => {
              i.m_type = wx.getStorageSync('types')[i.m_type].mt_name
            });
            console.log(res);
            this.setData({
              data: res.data.data
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
  },
  photo() {
    const that = this
    //调用微信上传照片的方法
    wx.showActionSheet({
      itemList: ['拍照', '相册'],
      itemColor: "#f7982a",
      //成功时回调
      success(res) {
        if (!res.cancel) {
          //调用相册或者照相的方法，传参INDEX 
          that.chooseImage(res.tapIndex)
        }
      },
      //失败时回调
      fail(res) {
        console.log('调用失败');
      }
    })
  },
  //打开相册或者照相的方法
  chooseImage(tapIndex) {
    const that = this
    //调用微信方法 打开相册或者照相的功能
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      //根据下标选择data数据，以此判断是拍照还是相册
      sourceType: [that.data.sourceType[tapIndex]],
      success(res) {
        try {
          app.upload(res.tempFiles[0].tempFilePath, "gridman" + wx.getStorageSync('gridman').gm_id).then(res => {
            if (res.status == 1) {
              that.setData({
                photo: res.data.fullurl
              })
              var gridman = wx.getStorageSync('gridman')
              gridman.gm_photo = res.data.fullurl
              wx.setStorageSync('gridman', gridman)
              try {
                app.post('/gridmember/infoUpdate', {
                  gm_token: wx.getStorageSync('gridman').gm_token,
                  gm_photo: res.data.fullurl
                }).then(res => {
                  if (res.data.status == 1) {
                    wx.showToast({
                      title: '更换成功',
                      icon: 'success',
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
  findObj(Arr, j) {
    var a = {}
    Arr.forEach((i) => {
      if (i.code == j) {
        a = i
      }
    })
    return a
  },
  openPage() {
    this.setData({
      show: true
    })
  },
  // 退出
  quit() {
    wx.showModal({
      title: '警 告',
      content: '确认是否退出！',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('gridman')
          wx.removeStorageSync('province')
          wx.removeStorageSync('city')
          wx.removeStorageSync('area')
          wx.removeStorageSync('street')
          wx.removeStorageSync('village')
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    })
  },
  // 修改密码
  changePassword() {
    wx.showModal({
      title: '修改密码',
      content: '',
      editable: true,
      placeholderText: '请输入新密码',
      success: function (res) {
        if (res.confirm) {
          console.log(res.content);
          try {
            app.post('/gridmember/infoUpdate', {
              gm_token: wx.getStorageSync('gridman').gm_token,
              gm_password: res.content
            }).then(res => {
              if (res.data.status == 1) {
                wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 1000 //持续的时间
                })
                setTimeout(() => {
                  wx.removeStorageSync('gridman')
                  wx.removeStorageSync('province')
                  wx.removeStorageSync('city')
                  wx.removeStorageSync('area')
                  wx.removeStorageSync('street')
                  wx.removeStorageSync('village')
                  wx.reLaunch({
                    url: '/pages/index/index'
                  })
                }, 1000)
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
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({title: '加载中'})
    var data = wx.getStorageSync('gridman')
    if (data.gm_name) {
      try {
        app.post('/index/getMatsuiType').then(res => {
          if (res.data.status == 1) {
            wx.setStorageSync('types', res.data.data)
          }
        })
        app.post('/region/getProvince', {
          province_code: 0
        }).then(res => {
          if (res.data.status == 1) {
            wx.setStorageSync('province', res.data.data)
            this.setData({
              province: res.data.data
            })
          }
        }).then(res => {
          app.post('/region/getCity', {
            province_code: data.gm_province
          }).then(res => {
            if (res.data.status == 1) {
              wx.setStorageSync('city', res.data.data)
              this.setData({
                city: res.data.data
              })
            }
          }).then(res => {
            app.post('/region/getAreas', {
              city_code: data.gm_city
            }).then(res => {
              if (res.data.status == 1) {
                wx.setStorageSync('area', res.data.data)
                this.setData({
                  area: res.data.data
                })
              }
            }).then(res => {
              app.post('/region/getStreets', {
                area_code: data.gm_area
              }).then(res => {
                if (res.data.status == 1) {
                  wx.setStorageSync('street', res.data.data)
                  this.setData({
                    street: res.data.data
                  })
                }
              }).then(res => {
                app.post('/region/getVillage', {
                  street_code: data.gm_street
                }).then(res => {
                  if (res.data.status == 1) {
                    wx.setStorageSync('village', res.data.data)
                    this.setData({
                      village: res.data.data
                    })
                  }
                }).then(res => {
                  this.setData({
                    photo: data.gm_photo,
                    nameValue: data.gm_name,
                    sexValue: data.gm_sex,
                    phoneValue: data.gm_phone,
                    provinceValue: this.findObj(wx.getStorageSync('province'), data.gm_province).name,
                    cityValue: this.findObj(wx.getStorageSync('city'), data.gm_city).name,
                    areaValue: this.findObj(wx.getStorageSync('area'), data.gm_area).name,
                    streetValue: this.findObj(wx.getStorageSync('street'), data.gm_street).name,
                    villageValue: this.findObj(wx.getStorageSync('village'), data.gm_village).name
                  })
                  wx.hideLoading()
                })
              })
            })
          })
        })
      } catch {
        wx.showToast({
          title: '网络不稳定~',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }
    }
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
    let pages = getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; //前一个页面
    beforePage.onShow();
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