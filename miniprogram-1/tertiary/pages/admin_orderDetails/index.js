// tertiary/pages/admin_orderDetails/index.js
const app = getApp()
const utils = require("../../../utils/utils")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain + "/img/chefs/",
    chef: app.domain + "/img/chef/chef.png",
    active0: "active",
    active1: "",
    active2: "",
    active3: "",
    active4: "",
    active5: "",
    active6: "",
    show: 0,
    basic: {},
    types: [],
    Family: app.domain + "/img/report/Family-active.png",
    hall: app.domain + "/img/report/hall.png",
    fontColor11: "",
    fontColor22: "fontColor",
    province: [],
    provinceValue: "",
    city: [],
    cityValue: "",
    area: [],
    areaValue: "",
    street: [],
    streetValue: "",
    village: [],
    villageValue: "",
    shows: 1,

    cover: "",
    a_name: "",
    address: "",
    swipers: [],
    hallx: [],
    hallxs: [],
    hallxss: "",
    startDate: "",
    endDate: "",
    chefIf: {},
    grades: [{
      code: '1',
      name: '初级(国家职业资格五级)'
    }, {
      code: '2',
      name: '中级(国家职业资格四级)'
    }, {
      code: '003',
      name: '高级(国家职业资格三级)'
    }, {
      code: '4',
      name: '技师(国家职业资格二级)'
    }, {
      code: '5',
      name: '高级技师(国家职业资格一级)'
    }],
    star: [{
      stars: [app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/star.png"]
    }, {
      stars: [app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png", app.domain + "/img/chef/redStar.png"]
    }],
    ig: {},
    val15: "",
    checked1: "",
    checked11: "",
    checked2: "",
    checked22: "",
    checked3: "",
    checked33: "",
    checked4: "",
    checked44: "",
    checked5: "",
    checked55: "",
    checked6: "",
    checked66: "",
    checked666: "",
    checked7: "",
    checked77: "",
    checked8: "",
    checked88: "",
    checked888: "",
    checked9: "",
    checked99: "",
    checked10: "",
    checked1010: "",
    checked101010: "",
    checked111: "",
    checked1111: "",
    checked12: "",
    checked1212: "",
    checked13: "",
    checked1313: "",
    checked14: "",
    checked1414: "",

    Hchecked1: "",
    Hchecked11: "",
    Hchecked111: "",
    Hchecked11111: "",
    Hchecked2: "",
    Hchecked22: "",
    Hchecked222: "",
    Hchecked2222: "",
    Hchecked22222: "",
    Hchecked3: "",
    Hchecked33: "",
    Hchecked333: "",
    Hchecked3333: "",
    Hchecked33333: "",
    Hchecked333333: "",

    operation: [],
    bg1: "bgColor",
    bg2: "",
    bg3: "",
    isShow: 0,
    arr1: [],
    arr2: [],
    arr3: [],


    Gval0: "",
    Gval00: "",
    Gval1: "",
    Gchecked1: "",
    Gchecked11: "",
    Gval2: "",
    Gchecked2: "",
    Gchecked22: "",
    Gval3: "",
    Gchecked3: "",
    Gchecked33: "",
    Gval4: "",
    Gchecked4: "",
    Gchecked44: "",
    Gval5: "",
    Gchecked5: "",
    Gchecked55: "",
    Gval6: "",
    Gchecked6: "",
    Gchecked66: "",
    Gval7: "",
    Gchecked7: "",
    Gchecked77: "",
    Gval8: "",
    Gchecked8: "",
    Gchecked88: "",
    Gval9: "",
    Gchecked9: "",
    Gchecked99: "",
    Gval10: "",
    Gchecked10: "",
    Gchecked1010: "",
    Gval11: "",
    Gchecked11: "",
    Gchecked1111: "",
    Gval12: "",
    Gchecked12: "",
    Gchecked1212: "",
    Gval13: "",
    Gchecked13: "",
    Gchecked1313: "",
    Gval14: "",
    Gchecked14: "",
    Gchecked1414: "",
    Gval15: "",
    Gchecked15: "",
    Gchecked15: "",

    approvalVal: "",

    GinpVal3: "",
    GinpVal4: "",
    GinpVal5: "",
    GinpVal6: ""
  },
  taggle(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        active0: "active",
        active1: "",
        active2: "",
        active3: "",
        active4: "",
        active5: "",
        active6: "",
        show: 0
      })
    } else if (index == 1) {
      this.setData({
        active0: "",
        active1: "active",
        active2: "",
        active3: "",
        active4: "",
        active5: "",
        active6: "",
        show: 1

      })
    } else if (index == 2) {
      this.setData({
        active0: "",
        active1: "",
        active2: "active",
        active3: "",
        active4: "",
        active5: "",
        active6: "",
        show: 2
      })
    } else if (index == 3) {
      this.setData({
        active0: "",
        active1: "",
        active2: "",
        active3: "active",
        active4: "",
        active5: "",
        active6: "",
        show: 3
      })
    } else if (index == 4) {
      this.setData({
        active0: "",
        active1: "",
        active2: "",
        active3: "",
        active4: "active",
        active5: "",
        active6: "",
        show: 4
      })
    } else if (index == 5) {
      this.setData({
        active0: "",
        active1: "",
        active2: "",
        active3: "",
        active4: "",
        active5: "active",
        active6: "",
        arr1: this.data.operation.length == 0 ? [] : this.data.operation.find(i => i.type == 1) == undefined ? [] : this.data.operation.find(i => i.type == 1).list,
        arr2: this.data.operation.length == 0 ? [] : this.data.operation.find(i => i.type == 2) == undefined ? [] : this.data.operation.find(i => i.type == 2).list,
        arr3: this.data.operation.length == 0 ? [] : this.data.operation.find(i => i.type == 3) == undefined ? [] : this.data.operation.find(i => i.type == 3).list,
        show: 5,
      })
    } else if (index == 6) {
      this.setData({
        active0: "",
        active1: "",
        active2: "",
        active3: "",
        active4: "",
        active5: "",
        active6: "active",
        show: 6,
        Gval0: this.data.ig ? this.data.ig.ig_disinfection_date.slice(0, 10) : "",
        Gval00: this.data.ig ? this.data.ig.gm_name : ""
      })
      if (this.data.ig) {
        var {
          ig_processing_site_pollution_source: val1,
          ig_processing_site_sanitary: val2,
          ig_processing_site_toxic_substances: val3,
          ig_employees_num: inpVal3,
          ig_health_certificate_num: inpVal4,
          ig_disinfection_requirement: val4,
          ig_disinfection_mode: inpVal5,
          ig_disinfection_date: inpVal6,
          ig_food_fresh: val5,
          ig_food_high_risk: val6,
          ig_food_overdue: val7,
          ig_food_dead: val8,
          ig_food_color_taste: val9,
          ig_food_cook_thoroughly: val10,
          ig_food_separate_storage: val11,
          ig_food_put_in_refrigerator: val12,
          ig_food_seafood_special_tools: val13,
          ig_food_timely_processing: val14,
          ig_food_sample_retention: val15,
        } = this.data.ig
        this.setData({
          GinpVal3: inpVal3,
          GinpVal4: inpVal4,
          GinpVal5: inpVal5,
          GinpVal6: inpVal6.slice(0, 10),
        })
        if (val1 == "是") {
          this.setData({
            Gchecked1: true,
            Gval1: val1
          })
        } else {
          this.setData({
            Gchecked11: true,
            Gval1: val1
          })
        }
        if (val2 == "是") {
          this.setData({
            Gchecked2: true,
            Gval2: val2
          })
        } else {
          this.setData({
            Gchecked22: true,
            Gval2: val2
          })
        }
        if (val3 == "是") {
          this.setData({
            Gchecked3: true,
            Gval3: val3
          })
        } else {
          this.setData({
            Gchecked33: true,
            Gval3: val3
          })
        }
        if (val4 == "是") {
          this.setData({
            Gchecked4: true,
            Gval4: val4
          })
        } else {
          this.setData({
            Gchecked44: true,
            Gval4: val4
          })
        }
        if (val5 == "是") {
          this.setData({
            Gchecked5: true,
            Gval5: val5
          })
        } else {
          this.setData({
            Gchecked55: true,
            Gval5: val5
          })
        }
        if (val6 == "是") {
          this.setData({
            Gchecked6: true,
            Gval6: val6
          })
        } else {
          this.setData({
            Gchecked66: true,
            Gval6: val6
          })
        }
        if (val7 == "是") {
          this.setData({
            Gchecked7: true,
            Gval7: val7
          })
        } else {
          this.setData({
            Gchecked77: true,
            Gval7: val7
          })
        }
        if (val8 == "是") {
          this.setData({
            Gchecked8: true,
            Gval8: val8
          })
        } else {
          this.setData({
            Gchecked88: true,
            Gval8: val8
          })
        }
        if (val9 == "是") {
          this.setData({
            Gchecked9: true,
            Gval9: val9
          })
        } else {
          this.setData({
            Gchecked99: true,
            Gval9: val9
          })
        }
        if (val10 == "是") {
          this.setData({
            Gchecked10: true,
            Gval10: val10
          })
        } else {
          this.setData({
            Gchecked1010: true,
            Gval10: val10
          })
        }
        if (val11 == "是") {
          this.setData({
            Gchecked11: true,
            Gval11: val11
          })
        } else {
          this.setData({
            Gchecked1111: true,
            Gval11: val11
          })
        }
        if (val12 == "是") {
          this.setData({
            Gchecked12: true,
            Gval12: val12
          })
        } else {
          this.setData({
            Gchecked1212: true,
            Gval12: val12
          })
        }
        if (val13 == "是") {
          this.setData({
            Gchecked13: true,
            Gval13: val13
          })
        } else {
          this.setData({
            Gchecked1313: true,
            Gval13: val13
          })
        }
        if (val14 == "是") {
          this.setData({
            Gchecked14: true,
            Gval14: val14
          })
        } else {
          this.setData({
            Gchecked1414: true,
            Gval14: val14
          })
        }
        if (val15 == "是") {
          this.setData({
            Gchecked15: true,
            Gval15: val15
          })
        } else {
          this.setData({
            Gchecked1515: true,
            Gval15: val15
          })
        }
      }
    }
  },
  toggles(e) {
    var index = e.currentTarget.dataset.index
    if (index == 0) {
      this.setData({
        bg1: "bgColor",
        bg2: "",
        bg3: "",
        isShow: 0
      })
    } else if (index == 1) {
      this.setData({
        bg1: "",
        bg2: "bgColor",
        bg3: "",
        isShow: 1
      })
    } else if (index == 2) {
      this.setData({
        bg1: "",
        bg2: "",
        bg3: "bgColor",
        isShow: 2
      })
    }
  },
  inputs(e) {
    this.setData({
      approvalVal: e.detail.value
    })
  },
  approvaling(type) {
    var obj = {
      m_token: wx.getStorageSync('admin').m_token,
      m_id: this.data.m_id,
      m_approval: type,
      m_approval_remark: this.data.approvalVal
    }
    try {
      app.post('/manage/setApproval', obj).then(res => {
        if (res.data.status == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000 //持续的时间
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
            let pages = getCurrentPages(); // 当前页面
            let beforePage = pages[pages.length - 2]; //前一个页面
            let approval = beforePage.selectComponent('#approval')
            approval.aaa();
          }, 1000)
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
  },
  approval(e) {
    var index = e.currentTarget.dataset.index
    if (index == 1) {
      this.approvaling(1)
    } else if (index == 2) {
      this.approvaling(2)
    }
    wx.showLoading({
      title: '加载中',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var admin = wx.getStorageSync('admin')
    this.setData({
      types: wx.getStorageSync('types'),
      m_id: options.m_id
    })
    wx.setNavigationBarTitle({
      title: '乡宴详情',
    })
    try {
      wx.showLoading({
        title: '加载中',
      })
      app.post('/manage/matsuriDetail', {
        m_token: admin.m_token,
        m_id: options.m_id
      }).then(res => {
        if (res.data.status == 1) {
          if (res.data.data.food) {
            var {
              fs_pork,
              fs_sick_poisoned,
              fs_vegetables,
              fs_pesticides,
              fs_baijiu,
              fs_baijiu_inspection_certificate,
              fs_edible_oil,
              fs_edible_oil_inspection_certificate,
              fs_drinks,
              fs_drinks_inspection_certificate,
              fs_cold_dishes,
              fs_seafood,
              fs_erminated_potato,
              fs_wild_fungus,
              fs_dishes
            } = res.data.data.food
            fs_pork = fs_pork.indexOf(',') == -1 ? [fs_pork] : fs_pork.split(',')
            fs_vegetables = fs_vegetables.indexOf(',') == -1 ? [fs_vegetables] : fs_vegetables.split(',')
            fs_baijiu = fs_baijiu.indexOf(',') == -1 ? [fs_baijiu] : fs_baijiu.split(',')
            fs_edible_oil = fs_edible_oil.indexOf(',') == -1 ? [fs_edible_oil] : fs_edible_oil.split(',')
            fs_drinks = fs_drinks.indexOf(',') == -1 ? [fs_drinks] : fs_drinks.split(',')
            if (fs_pork.length == 2) {
              this.setData({
                checked1: true,
                checked11: true,
                val1: fs_pork
              })
            } else if (fs_pork[0] == "市场购买") {
              this.setData({
                checked1: true,
                val1: [fs_pork[0]]
              })
            } else if (fs_pork[0] == "自家喂养") {
              this.setData({
                checked11: true,
                val1: [fs_pork[0]]
              })
            }
            if (fs_sick_poisoned == "无") {
              this.setData({
                checked22: true,
                val2: fs_sick_poisoned
              })
            } else {
              this.setData({
                checked2: true,
                val2: fs_sick_poisoned
              })
            }
            if (fs_vegetables.length == 2) {
              this.setData({
                checked3: true,
                checked33: true,
                val3: fs_vegetables
              })
            } else if (fs_vegetables[0] == "市场购买") {
              this.setData({
                checked3: true,
                val3: [fs_vegetables[0]]
              })
            } else if (fs_vegetables[0] == "自家种植") {
              this.setData({
                checked33: true,
                val3: [fs_vegetables[0]]
              })
            }
            if (fs_pesticides == "无") {
              this.setData({
                checked44: true,
                val4: fs_pesticides
              })
            } else {
              this.setData({
                checked4: true,
                val4: fs_pesticides
              })
            }

            if (fs_baijiu.length == 2) {
              this.setData({
                checked5: true,
                checked55: true,
                val5: fs_baijiu
              })
            } else if (fs_baijiu[0] == "瓶装") {
              this.setData({
                checked5: true,
                val5: [fs_baijiu[0]]
              })
            } else if (fs_baijiu[0] == "散装") {
              this.setData({
                checked55: true,
                val5: [fs_baijiu[0]]
              })
            }

            if (fs_baijiu_inspection_certificate == "有") {
              this.setData({
                checked6: true,
                val6: fs_baijiu_inspection_certificate
              })
            } else if (fs_baijiu_inspection_certificate == "无") {
              this.setData({
                checked66: true,
                val6: fs_baijiu_inspection_certificate
              })
            } else {
              this.setData({
                checked666: true,
                val6: fs_baijiu_inspection_certificate
              })
            }

            if (fs_edible_oil.length == 2) {
              this.setData({
                checked7: true,
                checked77: true,
                val7: fs_edible_oil
              })
            } else if (fs_edible_oil[0] == "瓶装") {
              this.setData({
                checked7: true,
                val7: [fs_edible_oil[0]]
              })
            } else if (fs_edible_oil[0] == "散装") {
              this.setData({
                checked77: true,
                val7: [fs_edible_oil[0]]
              })
            }

            if (fs_edible_oil_inspection_certificate == "有") {
              this.setData({
                checked8: true,
                val8: fs_edible_oil_inspection_certificate
              })
            } else if (fs_edible_oil_inspection_certificate == "无") {
              this.setData({
                checked88: true,
                val8: fs_edible_oil_inspection_certificate
              })
            } else {
              this.setData({
                checked888: true,
                val8: fs_edible_oil_inspection_certificate
              })
            }

            if (fs_drinks.length == 2) {
              this.setData({
                checked9: true,
                checked99: true,
                val9: fs_drinks
              })
            } else if (fs_drinks[0] == "外购") {
              this.setData({
                checked9: true,
                val9: [fs_drinks[0]]
              })
            } else if (fs_drinks[0] == "自制") {
              this.setData({
                checked99: true,
                val9: [fs_drinks[0]]
              })
            }

            if (fs_drinks_inspection_certificate == "有") {
              this.setData({
                checked10: true,
                val10: fs_drinks_inspection_certificate
              })
            } else if (fs_drinks_inspection_certificate == "无") {
              this.setData({
                checked1010: true,
                val10: fs_drinks_inspection_certificate
              })
            } else {
              this.setData({
                checked101010: true,
                val10: fs_drinks_inspection_certificate
              })
            }
            if (fs_cold_dishes == "外购") {
              this.setData({
                checked111: true,
                val11: fs_cold_dishes
              })
            } else {
              this.setData({
                checked1111: true,
                val11: fs_cold_dishes
              })
            }
            if (fs_seafood == "有") {
              this.setData({
                checked12: true,
                val12: fs_seafood
              })
            } else {
              this.setData({
                checked1212: true,
                val12: fs_seafood
              })
            }
            if (fs_erminated_potato == "有") {
              this.setData({
                checked13: true,
                val13: fs_erminated_potato
              })
            } else {
              this.setData({
                checked1313: true,
                val13: fs_erminated_potato
              })
            }
            if (fs_wild_fungus == "有") {
              this.setData({
                checked14: true,
                val14: fs_wild_fungus
              })
            } else {
              this.setData({
                checked1414: true,
                val14: fs_wild_fungus
              })
            }
            if (fs_dishes) {
              this.setData({
                val15: fs_dishes
              })
            }
          }
          if (res.data.data.sanitary) {
            res.data.data.sanitary.sc_water_source.split('，').forEach(i => {
              if (i == "自来水") {
                this.setData({
                  Hchecked1: true,
                })
              } else if (i == "井水") {
                this.setData({
                  Hchecked11: true,
                })
              } else if (i == "荷塘水") {
                this.setData({
                  Hchecked111: true,
                })
              } else if (i == "其他") {
                this.setData({
                  Hchecked1111: true,
                })
              }
            })
            res.data.data.sanitary.sc_disinfection_method.split('，').forEach(i => {
              if (i == "消毒柜") {
                this.setData({
                  Hchecked2: true,
                })
              } else if (i == "煮沸消毒") {
                this.setData({
                  Hchecked22: true,
                })
              } else if (i == "药物消毒") {
                this.setData({
                  Hchecked222: true,
                })
              } else if (i == "其他") {
                this.setData({
                  Hchecked2222: true,
                })
              } else if (i == "未消毒") {
                this.setData({
                  Hchecked22222: true,
                })
              }
            })
            res.data.data.sanitary.sc_toxic_harmful.split('，').forEach(i => {
              if (i == "磷化锌") {
                this.setData({
                  Hchecked3: true,
                })
              } else if (i == "磷化铝") {
                this.setData({
                  Hchecked33: true,
                })
              } else if (i == "亚硝酸盐") {
                this.setData({
                  Hchecked333: true,
                })
              } else if (i == "剧毒农药") {
                this.setData({
                  Hchecked3333: true,
                })
              } else if (i == "醇基燃料") {
                this.setData({
                  Hchecked33333: true,
                })
              } else if (i == "家中不存在有害物质") {
                this.setData({
                  Hchecked333333: true,
                })
              }
            })
          }
          if (res.data.data.auditorium.length != 0) {
            res.data.data.basic.m_longitude = res.data.data.auditorium[0].a_longitude
            res.data.data.basic.m_latitude = res.data.data.auditorium[0].a_latitude
            var hallxss = ''
            res.data.data.auditorium.forEach(i => {
              hallxss += i.ao_name
            })
            var endDate = utils.getTimeLastWeeks(res.data.data.basic.m_start_date, res.data.data.basic.m_holding_days - 1)
            this.setData({
              shows: 2,
              cover: res.data.data.auditorium[0].a_cover_photo,
              a_name: res.data.data.auditorium[0].a_name,
              address: res.data.data.auditorium[0].a_address,
              swipers: res.data.data.auditorium[0].a_scroll_picture.split(','),
              hallxss: hallxss,
              startDate: res.data.data.basic.m_start_date,
              endDate: endDate,
              Family: app.domain + "/img/report/Family.png",
              hall: app.domain + "/img/report/hall-active.png",
              fontColor11: "fontColor",
              fontColor22: "",
            })
          }
          var rex = res.data.data
          if (rex.chef_info.basic.chef_name) {
            app.post('/region/getProvince', {
              province_code: 0
            }).then(res => {
              if (res.data.status == 1) {
                this.setData({
                  province: res.data.data
                })
              }
            }).then(res => {
              app.post('/region/getCity', {
                province_code: rex.chef_info.basic.chef_province
              }).then(res => {
                if (res.data.status == 1) {
                  this.setData({
                    city: res.data.data
                  })
                }
              }).then(res => {
                app.post('/region/getAreas', {
                  city_code: rex.chef_info.basic.chef_city
                }).then(res => {
                  if (res.data.status == 1) {
                    this.setData({
                      area: res.data.data
                    })
                  }
                }).then(res => {
                  app.post('/region/getStreets', {
                    area_code: rex.chef_info.basic.area
                  }).then(res => {
                    if (res.data.status == 1) {
                      this.setData({
                        street: res.data.data
                      })
                    }
                  }).then(res => {
                    app.post('/region/getVillage', {
                      street_code: rex.chef_info.basic.chef_street
                    }).then(res => {
                      if (res.data.status == 1) {
                        this.setData({
                          village: res.data.data
                        })
                      }
                    }).then(res => {
                      var cuisine = ''
                      rex.chef_info.cuisine.forEach(i => {
                        cuisine += i.cuisine_name + '，'
                      })
                      rex.chef_info.basic.cuisine = cuisine.slice(0, cuisine.length - 1)
                      var province = this.data.province.find(i => i.code == rex.chef_info.basic.chef_province).name + '，'
                      var city = this.data.city.find(i => i.code == rex.chef_info.basic.chef_city).name + '，'
                      var area = this.data.area.find(i => i.code == rex.chef_info.basic.chef_area).name + '，'
                      var street = this.data.street.find(i => i.code == rex.chef_info.basic.chef_street) ? this.data.street.find(i => i.code == rex.chef_info.basic.chef_street).name + '，' : ''
                      var village = this.data.village.find(i => i.code == rex.chef_info.basic.chef_village) ? this.data.village.find(i => i.code == rex.chef_info.basic.chef_village).name + '，' : ''
                      var region = (province + city + area + street + village)
                      rex.chef_info.basic.region = region.slice(0, region.length - 1)
                      this.setData({
                        chefIf: rex.chef_info
                      })
                    })
                  })
                })
              })
            })
          }
          this.setData({
            basic: rex.basic,
            val15: rex.basic.m_approval_remark,
            operation: rex.operation,
            ig: rex.ig,
          })
          setTimeout(()=>{
            wx.hideLoading()
          },1000)
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