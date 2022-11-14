// secondary/pages/photoRecord/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m_id: "",
    m_chef_id: "",
    kitchenware: [],
    disinfect: [],
    dishes: [],
    sourceType: [
      'camera', 'album'
    ]
  },
  remove(e) {
    var item = e.currentTarget.dataset.item
    var index = e.currentTarget.dataset.index
    var kitchenware = JSON.parse(JSON.stringify(this.data.kitchenware))
    var disinfect = JSON.parse(JSON.stringify(this.data.disinfect))
    var dishes = JSON.parse(JSON.stringify(this.data.dishes))
    if (item == 1) {
      kitchenware.splice(index, 1)
    } else if (item == 2) {
      disinfect.splice(index, 1)
    } else if (item == 3) {
      dishes.splice(index, 1)
    }
    this.setData({
      kitchenware: kitchenware,
      disinfect: disinfect,
      dishes: dishes
    })
  },
  // 添加img
  addImg(e) {
    var item = e.currentTarget.dataset.item
    var file = e.currentTarget.dataset.file
    const that = this
    //调用微信上传照片的方法
    wx.showActionSheet({
      itemList: ['拍照', '相册'],
      itemColor: "#f7982a",
      //成功时回调
      success(res) {
        if (!res.cancel) {
          //调用相册或者照相的方法，传参INDEX 
          that.chooseImage(res.tapIndex, item, file)
        }
      },
      //失败时回调
      fail(res) {
        console.log('调用失败');
      }
    })
  },
  //打开相册或者照相的方法
  chooseImage(tapIndex, item, file) {
    const that = this
    var kitchenware = JSON.parse(JSON.stringify(that.data.kitchenware))
    var disinfect = JSON.parse(JSON.stringify(that.data.disinfect))
    var dishes = JSON.parse(JSON.stringify(that.data.dishes))
    //调用微信方法 打开相册或者照相的功能
    wx.chooseMedia({
      count: 9,
      mediaType: ["mix"],
      sizeType: ['compressed'],
      //根据下标选择data数据，以此判断是拍照还是相册
      sourceType: [that.data.sourceType[tapIndex]],
      success(res) {
        res.tempFiles.forEach(i => {
          try {
            app.upload(i.tempFilePath, file).then(res => {
              if (res.status == 1) {
                if (item == 1) {
                  kitchenware.push(res.data.fullurl)
                } else if (item == 2) {
                  disinfect.push(res.data.fullurl)
                } else if (item == 3) {
                  dishes.push(res.data.fullurl)
                }
              }
              that.setData({
                kitchenware: kitchenware,
                disinfect: disinfect,
                dishes: dishes
              })
            })
          } catch {
            wx.showToast({
              title: '网络不稳定~',
              icon: 'error',
              duration: 1000 //持续的时间
            })
          }
        })
      }
    })
  },
  save() {
    wx.showLoading({
      title: '提交中'
    })
    var pics = [{
        type: 1,
        list: this.data.kitchenware
      },
      {
        type: 2,
        list: this.data.disinfect
      },
      {
        type: 3,
        list: this.data.dishes
      }
    ]
    try {
      app.post('/chefoperation/recordOperation', {
        token: wx.getStorageSync('userInfo').chef_token,
        matsuri_id: this.data.m_id,
        lists: JSON.stringify(pics)
      }).then(res => {
        wx.hideLoading()
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
      })
    } catch {
      wx.showToast({
        title: '网络不稳定~',
        icon: 'error',
        duration: 1000 //持续的时间
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(()=>{
      wx.showLoading({
        title: '加载中'
      })
    },200)
    wx.setNavigationBarTitle({
      title: '拍照记录',
    })
    this.setData({
      m_id: options.m_id,
      m_chef_id: options.m_chef_id
    })
    try {
      app.post('/chefoperation/getRecordOperation', {
        token: wx.getStorageSync('userInfo').chef_token,
        matsuri_id: options.m_id
      }).then(res => {
        if (res.data.status == 1) {
          var obj1 = res.data.data.find(item => item.type == 1)
          if (obj1 != undefined) {
            this.setData({
              kitchenware: obj1.list
            })
          } else {
            this.setData({
              kitchenware: []
            })
          }
          var obj2 = res.data.data.find(item => item.type == 2)
          if (obj2 != undefined) {
            this.setData({
              disinfect: obj2.list
            })
          } else {
            this.setData({
              disinfect: []
            })
          }
          var obj3 = res.data.data.find(item => item.type == 3)
          if (obj3 != undefined) {
            this.setData({
              dishes: obj3.list
            })
          } else {
            this.setData({
              dishes: []
            })
          }
        }
        setTimeout(()=>{
          wx.hideLoading()
        },500)
      })
    } catch {
      wx.showToast({
        title: '网络不稳定~',
        icon: 'error',
        duration: 1000 //持续的时间
      })
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