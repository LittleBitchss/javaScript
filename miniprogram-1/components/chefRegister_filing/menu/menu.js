// components/chefRegister_filing/menu/menu.js
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
    menus: [],
    show: false,
    current: 0,
    sourceType: [
      'camera', 'album'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus(e) {
      var item = e.currentTarget.dataset.item
      var menus = JSON.parse(JSON.stringify(this.data.menus))
      if (item == 6) {
        if (menus[this.data.current].disheCategorys[0].cont == "请输入套餐内的主食") {
          menus[this.data.current].disheCategorys[0].cont = ""
        }
      } else if (item == 7) {
        if (menus[this.data.current].disheCategorys[1].cont == "请输入套餐内的冷菜") {
          menus[this.data.current].disheCategorys[1].cont = ""
        }
      } else if (item == 8) {
        if (menus[this.data.current].disheCategorys[2].cont == "请输入套餐内的热菜") {
          menus[this.data.current].disheCategorys[2].cont = ""
        }
      } else if (item == 9) {
        if (menus[this.data.current].disheCategorys[3].cont == "请输入套餐内的汤煲") {
          menus[this.data.current].disheCategorys[3].cont = ""
        }
      } else if (item == 10) {
        if (menus[this.data.current].disheCategorys[4].cont == "请输入套餐内的水果") {
          menus[this.data.current].disheCategorys[4].cont = ""
        }
      }
      this.setData({
        menus: menus
      })
    },
    inputs(e) {
      var item = e.currentTarget.dataset.item
      var menus = JSON.parse(JSON.stringify(this.data.menus))
      if (item == 1) {
        menus[this.data.current].name = e.detail.value
      } else if (item == 2) {
        menus[this.data.current].startPeople = e.detail.value
      } else if (item == 3) {
        menus[this.data.current].endPeople = e.detail.value
      } else if (item == 4) {
        menus[this.data.current].price = e.detail.value
      } else if (item == 5) {
        menus[this.data.current].disheNum = e.detail.value
      } else if (item == 6) {
        menus[this.data.current].disheCategorys[0].cont = e.detail.value
        menus[this.data.current].disheCategorys[0].fontColor = "_inp"
      } else if (item == 7) {
        menus[this.data.current].disheCategorys[1].cont = e.detail.value
        menus[this.data.current].disheCategorys[1].fontColor = "_inp"
      } else if (item == 8) {
        menus[this.data.current].disheCategorys[2].cont = e.detail.value
        menus[this.data.current].disheCategorys[2].fontColor = "_inp"
      } else if (item == 9) {
        menus[this.data.current].disheCategorys[3].cont = e.detail.value
        menus[this.data.current].disheCategorys[3].fontColor = "_inp"
      } else if (item == 10) {
        menus[this.data.current].disheCategorys[4].cont = e.detail.value
        menus[this.data.current].disheCategorys[4].fontColor = "_inp"
      }
      this.setData({
        menus: menus
      })
    },
    blur(e) {
      var item = e.currentTarget.dataset.item
      var menus = JSON.parse(JSON.stringify(this.data.menus))
      if (item == 6) {
        if (e.detail.value == "") {
          menus[this.data.current].disheCategorys[0].cont = '请输入套餐内的主食'
          menus[this.data.current].disheCategorys[0].fontColor = ''
        }
      } else if (item == 7) {
        if (e.detail.value == "") {
          menus[this.data.current].disheCategorys[1].cont = '请输入套餐内的冷菜'
          menus[this.data.current].disheCategorys[1].fontColor = ''
        }
      } else if (item == 8) {
        if (e.detail.value == "") {
          menus[this.data.current].disheCategorys[2].cont = '请输入套餐内的热菜'
          menus[this.data.current].disheCategorys[2].fontColor = ''
        }
      } else if (item == 9) {
        if (e.detail.value == "") {
          menus[this.data.current].disheCategorys[3].cont = '请输入套餐内的汤煲'
          menus[this.data.current].disheCategorys[3].fontColor = ''
        }
      } else if (item == 10) {
        if (e.detail.value == "") {
          menus[this.data.current].disheCategorys[4].cont = '请输入套餐内的水果'
          menus[this.data.current].disheCategorys[4].fontColor = ''
        }
      }
      this.setData({
        menus: menus
      })
    },
    openFilter() {
      this.setData({
        show: true
      })
    },
    eventhandle(e) {
      this.setData({
        current: e.detail.current
      })
    },
    choose(e) {
      var menus = JSON.parse(JSON.stringify(this.data.menus))
      var index = e.currentTarget.dataset.index
      menus[this.data.current].disheCategorys[index].bgColor = "bgColor"
      menus[this.data.current].disheCategorys[index].active = true
      menus[this.data.current].fontColor = "_right"
      menus[this.data.current].disheCategory = ""
      var obj = menus[this.data.current].disheCategorys.filter(i => i.active == true)
      obj.forEach(i => {
        menus[this.data.current].disheCategory += i.name + '，'
      });
      menus[this.data.current].disheCategory = menus[this.data.current].disheCategory.substring(0, menus[this.data.current].disheCategory.length - 1);
      this.setData({
        menus: menus
      })
    },
    finish() {
      this.setData({
        show: false
      })
    },
    remove(e) {
      var index = e.currentTarget.dataset.index
      var item = e.currentTarget.dataset.item
      if (item == 6) {
        this.move(index, '请输入套餐内的主食')
      } else if (item == 7) {
        this.move(index, '请输入套餐内的冷菜')
      } else if (item == 8) {
        this.move(index, '请输入套餐内的热菜')
      } else if (item == 9) {
        this.move(index, '请输入套餐内的汤煲')
      } else if (item == 10) {
        this.move(index, '请输入套餐内的水果')
      }
    },
    move(index, placeholder) {
      var menus = JSON.parse(JSON.stringify(this.data.menus))
      var that = this
      wx.showModal({
        title: '提示',
        content: '是否删除' + placeholder.substr(placeholder.length - 2) + '类别',
        success(res) {
          if (res.confirm) {
            menus[that.data.current].disheCategorys[index].bgColor = ""
            menus[that.data.current].disheCategorys[index].fontColor = ""
            menus[that.data.current].disheCategorys[index].active = false
            menus[that.data.current].disheCategorys[index].cont = placeholder
            menus[that.data.current].disheCategory = ""
            var obj = menus[that.data.current].disheCategorys.filter(i => i.active == true)
            if (obj.length != 0) {
              obj.forEach(i => {
                menus[that.data.current].disheCategory += i.name + '，'
              });
              menus[that.data.current].disheCategory = menus[that.data.current].disheCategory.substring(0, menus[that.data.current].disheCategory.length - 1);
            } else {
              menus[that.data.current].disheCategory = "请增加菜品类别"
              menus[that.data.current].fontColor = ""
            }
            that.setData({
              menus: menus
            })
          }
        }
      })
    },
    // 添加img
    addImg(e) {
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
      var menus = JSON.parse(JSON.stringify(that.data.menus))
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
              app.upload(i.tempFilePath, 'dishesImg/' + (wx.getStorageSync('chefInfo').chef_id + 'chef') + ('combo' + that.data.current + 1)).then(res => {
                if (res.status == 1) {
                  menus[that.data.current].dishesImg.push(res.data.fullurl)
                }
                that.setData({
                  menus: menus
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
    removeImg(e) {
      var menus = JSON.parse(JSON.stringify(this.data.menus))
      var index = e.currentTarget.dataset.index
      menus[this.data.current].dishesImg.splice(index, 1)
      this.setData({
        menus: menus
      })
    },
    submit() {
      wx.showLoading({
        title: '提交中',
      })
      var cb_img = ""
      var cooklist = []
      var arr = [
        "请输入套餐内的主食",
        "请输入套餐内的冷菜",
        "请输入套餐内的热菜",
        "请输入套餐内的汤煲",
        "请输入套餐内的水果"
      ]
      if (this.data.menus[this.data.current].dishesImg.length != 0) {
        cb_img = this.data.menus[this.data.current].dishesImg.join(',')
      }
      this.data.menus[this.data.current].disheCategorys.forEach((i, index) => {
        if (i.cont != arr[index]) {
          cooklist.push({
            cbd_menu: i.cont,
            cbd_ct_id: index + 1
          })
        }
      })
      cooklist = JSON.stringify(cooklist)
      var obj = {
        token: wx.getStorageSync('userInfo').chef_token,
        cb_id: this.data.menus[this.data.current].id, //y
        cb_name: this.data.menus[this.data.current].name,
        cb_meals_min: this.data.menus[this.data.current].startPeople,
        cb_meals_max: this.data.menus[this.data.current].endPeople,
        cb_price: this.data.menus[this.data.current].price,
        cb_num: this.data.menus[this.data.current].disheNum,
        cb_img: cb_img,
        cooklist: cooklist
      }
      if (obj.cb_name != '' && obj.cb_meals_min != '' && obj.cb_meals_max != '' && obj.cb_price != '' && obj.cb_num != '' && (obj.cb_img != '' || obj.cooklist != "[]")) {
        try {
          app.post('/chefoperation/updateCookbook', obj).then(res => {
            if (res.data.status == 1) {
              var menus = JSON.parse(JSON.stringify(this.data.menus))
              menus[this.data.current].id = res.data.data.id
              this.setData({
                menus: menus
              })
              wx.showToast({
                title: res.data.msg,
                icon: 'success',
                duration: 1000
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
        wx.showToast({
          title: '请完善菜品信息',
          icon: 'error',
          duration: 1000
        })
      }
    },
    addMenu() {
      var menus = JSON.parse(JSON.stringify(this.data.menus))
      menus.push({
        id: 0,
        name: "",
        startPeople: "",
        endPeople: "",
        price: "",
        disheNum: "",
        disheCategory: "请增加菜品类别",
        dishe_show: false,
        fontColor: "",
        disheCategorys: [{
            type: 1,
            name: "主食",
            cont: "请输入套餐内的主食",
            fontColor: "",
            bgColor: "",
            active: false
          },
          {
            type: 2,
            name: "冷菜",
            cont: "请输入套餐内的冷菜",
            fontColor: "",
            bgColor: "",
            active: false
          },
          {
            type: 3,
            name: "热菜",
            cont: "请输入套餐内的热菜",
            fontColor: "",
            bgColor: "",
            active: false
          },
          {
            type: 4,
            name: "汤煲",
            cont: "请输入套餐内的汤煲",
            fontColor: "",
            bgColor: "",
            active: false
          },
          {
            type: 5,
            name: "水果",
            cont: "请输入套餐内的水果",
            fontColor: "",
            bgColor: "",
            active: false
          }
        ],
        dishesImg: []
      })
      this.setData({
        menus: menus,
        current:this.data.menus.length,
      })
    },
    removeMenu() {
      var that = this
      wx.showModal({
        title: '提示',
        content: '是否删除套餐' + (that.data.current + 1),
        success(res) {
          if (res.confirm) {
            try {
              app.post('/chefoperation/delCookBooklist', {
                token: wx.getStorageSync('userInfo').chef_token,
                cb_id: that.data.menus[that.data.current].id
              }).then(res => {
                if (res.data.status == 1) {
                  that.obtain()
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 1000
                  })
                  that.setData({
                    current:0,
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
        }
      })
    },
    obtain() {
      this.setData({
        menus: [{
            id: 0,
            name: "",
            startPeople: "",
            endPeople: "",
            price: "",
            disheNum: "",
            disheCategory: "请增加菜品类别",
            dishe_show: false,
            fontColor: "",
            disheCategorys: [{
                type: 1,
                name: "主食",
                cont: "请输入套餐内的主食",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 2,
                name: "冷菜",
                cont: "请输入套餐内的冷菜",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 3,
                name: "热菜",
                cont: "请输入套餐内的热菜",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 4,
                name: "汤煲",
                cont: "请输入套餐内的汤煲",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 5,
                name: "水果",
                cont: "请输入套餐内的水果",
                fontColor: "",
                bgColor: "",
                active: false
              }
            ],
            dishesImg: []
          },
          {
            id: 0,
            name: "",
            startPeople: "",
            endPeople: "",
            price: "",
            disheNum: "",
            disheCategory: "请增加菜品类别",
            dishe_show: false,
            fontColor: "",
            disheCategorys: [{
                type: 1,
                name: "主食",
                cont: "请输入套餐内的主食",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 2,
                name: "冷菜",
                cont: "请输入套餐内的冷菜",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 3,
                name: "热菜",
                cont: "请输入套餐内的热菜",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 4,
                name: "汤煲",
                cont: "请输入套餐内的汤煲",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 5,
                name: "水果",
                cont: "请输入套餐内的水果",
                fontColor: "",
                bgColor: "",
                active: false
              }
            ],
            dishesImg: []
          },
          {
            id: 0,
            name: "",
            startPeople: "",
            endPeople: "",
            price: "",
            disheNum: "",
            disheCategory: "请增加菜品类别",
            dishe_show: false,
            fontColor: "",
            disheCategorys: [{
                type: 1,
                name: "主食",
                cont: "请输入套餐内的主食",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 2,
                name: "冷菜",
                cont: "请输入套餐内的冷菜",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 3,
                name: "热菜",
                cont: "请输入套餐内的热菜",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 4,
                name: "汤煲",
                cont: "请输入套餐内的汤煲",
                fontColor: "",
                bgColor: "",
                active: false
              },
              {
                type: 5,
                name: "水果",
                cont: "请输入套餐内的水果",
                fontColor: "",
                bgColor: "",
                active: false
              }
            ],
            dishesImg: []
          }
        ]
      })
      try {
        app.post('/chefoperation/cookbooklist', {
          token: wx.getStorageSync('userInfo').chef_token
        }).then(res => {
          if (res.data.status == 1) {
            var arr = []
            if (res.data.data.length > 3) {
              res.data.data.forEach(i => {
                arr.push({
                  id: 0,
                  name: "",
                  startPeople: "",
                  endPeople: "",
                  price: "",
                  disheNum: "",
                  disheCategory: "请增加菜品类别",
                  dishe_show: false,
                  fontColor: "",
                  disheCategorys: [{
                      type: 1,
                      name: "主食",
                      cont: "请输入套餐内的主食",
                      fontColor: "",
                      bgColor: "",
                      active: false
                    },
                    {
                      type: 2,
                      name: "冷菜",
                      cont: "请输入套餐内的冷菜",
                      fontColor: "",
                      bgColor: "",
                      active: false
                    },
                    {
                      type: 3,
                      name: "热菜",
                      cont: "请输入套餐内的热菜",
                      fontColor: "",
                      bgColor: "",
                      active: false
                    },
                    {
                      type: 4,
                      name: "汤煲",
                      cont: "请输入套餐内的汤煲",
                      fontColor: "",
                      bgColor: "",
                      active: false
                    },
                    {
                      type: 5,
                      name: "水果",
                      cont: "请输入套餐内的水果",
                      fontColor: "",
                      bgColor: "",
                      active: false
                    }
                  ],
                  dishesImg: []
                })
              })
              this.setData({
                menus: arr
              })
            }
            var menus = JSON.parse(JSON.stringify(this.data.menus))
            res.data.data.forEach((i, index) => {
              menus[index].id = i.cb_id
              menus[index].name = i.cb_name
              menus[index].startPeople = i.cb_meals_min
              menus[index].endPeople = i.cb_meals_max
              menus[index].price = i.cb_price
              menus[index].disheNum = i.cb_num
              menus[index].dishesImg = i.cb_img ? i.cb_img.length == 1 ? i.cb_img.split('') : i.cb_img.split(',') : []
              if (i.cooklist.length != 0) {
                menus[index].disheCategory = ''
                i.cooklist.forEach((i) => {
                  menus[index].disheCategorys[i.cbd_ct_id - 1].cont = i.cbd_menu
                  menus[index].disheCategorys[i.cbd_ct_id - 1].fontColor = '_inp'
                  menus[index].disheCategorys[i.cbd_ct_id - 1].bgColor = 'bgColor'
                  menus[index].disheCategorys[i.cbd_ct_id - 1].active = true
                  menus[index].disheCategory += menus[index].disheCategorys[i.cbd_ct_id - 1].name + '，'
                })
                menus[index].disheCategory = menus[index].disheCategory.substring(0, menus[index].disheCategory.length - 1);
                menus[index].fontColor = '_right'
              }
            })
            this.setData({
              menus: menus
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
  },
  lifetimes: {
    attached: function () {
      wx.showLoading({
        title: '加载中',
      })
      this.obtain()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})