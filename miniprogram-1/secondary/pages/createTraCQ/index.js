// secondary/pages/createTraCQ/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    sourceType: [
      'camera', 'album'
    ],
    active1: '',
    active2: '',
    actives1: '',
    actives2: '',
    actives3: '',
    avatar: '',
    name: '',
    names: '请进行身份验证',
    IDCard: '',
    IDCardIs: '',
    IDCardThe: '',
    companyName: '',
    companyNames: '请填写您当前就职的公司',
    companyNameNum: 0,
    license: '',
    licenseNum: 0,
    licensePhoto: '',
    dutuies: '',
    maskType: 0
  },
  openpage(e) {
    var item = e.currentTarget.dataset.item
    this.setData({
      show: true,
      maskType: item
    })
    if (item == 1) {
      if (this.data.names == '请进行身份验证') {
        this.setData({
          name: '',
          IDCard: '',
          IDCardIs: '',
          IDCardThe: '',
          actives1: ''
        })
      } else {
        this.setData({
          actives1: 'actives'
        })
      }
    } else if (item == 2) {
      if (this.data.companyNames == '请填写您当前就职的公司') {
        this.setData({
          companyName: '',
          companyNameNum: 0,
          license: '',
          licenseNum: 0,
          licensePhoto: '',
          actives2: ''
        })
      } else {
        this.setData({
          actives2: 'actives'
        })
      }
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
          app.upload(res.tempFiles[0].tempFilePath, "recruitment" + wx.getStorageSync('userInfo').user_id).then(res => {
            if (res.status == 1) {
              if (item == 1) {
                that.setData({
                  avatar: res.data.fullurl
                })
                if (that.data.avatar != '' && that.data.names != '请进行身份验证' && that.data.companyNames != '请填写您当前就职的公司' && that.data.dutuies != '') {
                  that.setData({
                    actives3: 'actives'
                  })
                } else {
                  that.setData({
                    actives3: ''
                  })
                }
              } else if (item == 2) {
                that.setData({
                  IDCardIs: res.data.fullurl
                })
                if (that.data.name != '' && that.data.IDCard != '' && that.data.IDCardIs != '' && that.data.IDCardThe != '') {
                  that.setData({
                    actives1: 'actives'
                  })
                }
              } else if (item == 3) {
                that.setData({
                  IDCardThe: res.data.fullurl
                })
                if (that.data.name != '' && that.data.IDCard != '' && that.data.IDCardIs != '' && that.data.IDCardThe != '') {
                  that.setData({
                    actives1: 'actives'
                  })
                }
              } else if (item == 4) {
                that.setData({
                  licensePhoto: res.data.fullurl
                })
                if (that.data.companyName != '' && that.data.license != '' && that.data.licensePhoto != '') {
                  that.setData({
                    actives2: 'actives'
                  })
                }
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
  inputs(e) {
    var item = e.currentTarget.dataset.item
    var val = e.detail.value
    var cur = e.detail.cursor
    if (item == 1) {
      this.setData({
        name: val
      })
      if (this.data.name != '' && this.data.IDCard != '' && this.data.IDCardIs != '' && this.data.IDCardThe != '') {
        this.setData({
          actives1: 'actives'
        })
      } else {
        this.setData({
          actives1: ''
        })
      }
    } else if (item == 2) {
      this.setData({
        IDCard: val
      })
      if (this.data.name != '' && this.data.IDCard != '' && this.data.IDCardIs != '' && this.data.IDCardThe != '') {
        this.setData({
          actives1: 'actives'
        })
      } else {
        this.setData({
          actives1: ''
        })
      }
    } else if (item == 3) {
      this.setData({
        companyName: val,
        companyNameNum: cur
      })
      if (this.data.companyName != '' && this.data.license != '' && this.data.licensePhoto != '') {
        this.setData({
          actives2: 'actives'
        })
      } else {
        this.setData({
          actives2: ''
        })
      }
    } else if (item == 4) {
      this.setData({
        license: val,
        licenseNum: cur
      })
      if (this.data.companyName != '' && this.data.license != '' && this.data.licensePhoto != '') {
        this.setData({
          actives2: 'actives'
        })
      } else {
        this.setData({
          actives2: ''
        })
      }
    } else if (item == 5) {
      this.setData({
        dutuies: val
      })
      if (this.data.avatar != '' && this.data.names != '请进行身份验证' && this.data.companyNames != '请填写您当前就职的公司' && this.data.dutuies != '') {
        this.setData({
          actives3: 'actives'
        })
      } else {
        this.setData({
          actives3: ''
        })
      }
    }
  },
  complete(e) {
    var item = e.currentTarget.dataset.item
    if (item == 1) {
      if (this.data.name != '' && this.data.IDCard != '' && this.data.IDCardIs != '' && this.data.IDCardThe != '') {
        this.setData({
          names: this.data.name,
          show: false
        })
        if (this.data.avatar != '' && this.data.names != '请进行身份验证' && this.data.companyNames != '请填写您当前就职的公司' && this.data.dutuies != '') {
          this.setData({
            actives3: 'actives'
          })
        } else {
          this.setData({
            actives3: ''
          })
        }
      }
    } else if (item == 2) {
      if (this.data.companyName != '' && this.data.license != '' && this.data.licensePhoto != '') {
        this.setData({
          companyNames: this.data.companyName,
          show: false
        })
        if (this.data.avatar != '' && this.data.names != '请进行身份验证' && this.data.companyNames != '请填写您当前就职的公司' && this.data.dutuies != '') {
          this.setData({
            actives3: 'actives'
          })
        } else {
          this.setData({
            actives3: ''
          })
        }
      }
    } else if (item == 3) {
      if (this.data.avatar != '' && this.data.names != '请进行身份验证' && this.data.companyNames != '请填写您当前就职的公司' && this.data.dutuies != '') {
        var obj = {
          avatar: this.data.avatar,
          name: this.data.name,
          IDCard: this.data.IDCard,
          IDCardIs: this.data.IDCardIs,
          IDCardThe: this.data.IDCardThe,
          companyName: this.data.companyName,
          license: this.data.license,
          licensePhoto: this.data.licensePhoto,
          dutuies: this.data.dutuies,
        }
        console.log(obj);
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '编辑名片',
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