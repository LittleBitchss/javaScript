// components/ingredients/ingredients.js
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
    val1: "",
    val2: "",
    val3: "",
    val4: "",
    val5: "",
    val6: "",
    val7: "",
    val8: "",
    val9: "",
    val10: "",
    val11: "",
    val12: "",
    val13: "",
    val14: "",
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
    foodSource: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    radioChange(e) {
      var index = e.currentTarget.dataset.index
      var val = e.detail.value
      if (index == 0) {
        this.setData({
          val1: val
        })
        if (this.data.val1.length == 1 && this.data.val1[0] == "市场购买" || this.data.val1.length == 2) {
          this.setData({
            val2: "无",
            checked22: true
          })
        } else if (this.data.val1.length == 0) {
          this.setData({
            val2: "",
            checked2: false,
            checked22: false
          })
        }
      } else if (index == 1) {
        this.setData({
          val2: val
        })
      } else if (index == 2) {
        this.setData({
          val3: val
        })
        if (this.data.val3.length == 1 && this.data.val3[0] == "市场购买" || this.data.val3.length == 2) {
          this.setData({
            val4: "无",
            checked44: true
          })
        } else if (this.data.val3.length == 0) {
          this.setData({
            val4: "",
            checked4: false,
            checked44: false
          })
        }
      } else if (index == 3) {
        this.setData({
          val4: val
        })
      } else if (index == 4) {
        this.setData({
          val5: val
        })
        if (val.length == 2) {
          this.setData({
            val6: "不全",
            checked6: false,
            checked66: false,
            checked666: true
          })
        } else if (val.length == 0) {
          this.setData({
            val6: "",
            checked6: false,
            checked66: false,
            checked666: false,
          })
        } else if (val[0] == "散装") {
          this.setData({
            val6: "无",
            checked6: false,
            checked66: true,
            checked666: false
          })
        } else if (val[0] == "瓶装") {
          this.setData({
            val6: "有",
            checked6: true,
            checked66: false,
            checked666: false
          })
        }
      } else if (index == 5) {
        this.setData({
          val6: val
        })
      } else if (index == 6) {
        this.setData({
          val7: val
        })
        if (this.data.val7.length == 2) {
          this.setData({
            val8: "不全",
            checked888: true
          })
        } else if (this.data.val7.length == 0) {
          this.setData({
            val8: "",
            checked8: false,
            checked88: false,
            checked888: false,
          })
        } else if (this.data.val7[0] == "散装") {
          this.setData({
            val8: "无",
            checked88: true
          })
        } else if (this.data.val7[0] == "瓶装") {
          this.setData({
            val8: "有",
            checked8: true
          })
        }
      } else if (index == 7) {
        this.setData({
          val8: val
        })
      } else if (index == 8) {
        this.setData({
          val9: val
        })
        if (this.data.val9.length == 2) {
          this.setData({
            val10: "不全",
            checked101010: true
          })
        } else if (this.data.val9.length == 0) {
          this.setData({
            val10: "",
            checked10: false,
            checked1010: false,
            checked101010: false,
          })
        } else if (this.data.val9[0] == "自制") {
          this.setData({
            val10: "无",
            checked1010: true
          })
        } else if (this.data.val9[0] == "外购") {
          this.setData({
            val10: "有",
            checked10: true
          })
        }
      } else if (index == 9) {
        this.setData({
          val10: val
        })
      } else if (index == 10) {
        this.setData({
          val11: val
        })
      } else if (index == 11) {
        this.setData({
          val12: val
        })
      } else if (index == 12) {
        this.setData({
          val13: val
        })
      } else if (index == 13) {
        this.setData({
          val14: val
        })
      }
    },
    inputs(e) {
      this.setData({
        val15: e.detail.value
      })
    },
    _setObj(params) {
      let flag = true;
      for (var key in params) {
        if (params[key] != '0' && !params[key]) {
          return false; // 终止程序
        }
      }
      return flag;
    },
    nextStep3() {
      var obj = {
        fs_id:0,
        fs_pork: this.data.val1,
        fs_sick_poisoned: this.data.val2,
        fs_vegetables: this.data.val3,
        fs_pesticides: this.data.val4,
        fs_baijiu: this.data.val5,
        fs_baijiu_inspection_certificate: this.data.val6,
        fs_edible_oil: this.data.val7,
        fs_edible_oil_inspection_certificate: this.data.val8,
        fs_drinks: this.data.val9,
        fs_drinks_inspection_certificate: this.data.val10,
        fs_cold_dishes: this.data.val11,
        fs_seafood: this.data.val12,
        fs_erminated_potato: this.data.val13,
        fs_wild_fungus: this.data.val14
      }
      var bol = this._setObj(obj)
      if(bol){
        obj.fs_pork = obj.fs_pork.toString()
        obj.fs_vegetables = obj.fs_vegetables.toString()
        obj.fs_baijiu = obj.fs_baijiu.toString()
        obj.fs_edible_oil = obj.fs_edible_oil.toString()
        obj.fs_drinks = obj.fs_drinks.toString()
        wx.setStorageSync('foodSource', obj)
        this.triggerEvent("nextStep3", {go:4})
      } else {
        wx.showToast({
          title: '请完善信息',
          icon: 'error',
          duration: 1000 //持续的时间
        })
      }    
    },
    previous3() {
      this.triggerEvent("previous3", {
        go: 2
      })
    }
  },
  lifetimes: {
    attached() {
      var foodSource = wx.getStorageSync('foodSource')
      if (foodSource) {
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
        } = foodSource
        fs_pork = fs_pork.indexOf(',') == -1 ? [fs_pork] : fs_pork.split(',')
        fs_vegetables = fs_vegetables.indexOf(',') == -1 ? [fs_vegetables] : fs_vegetables.split(',')
        fs_baijiu = fs_baijiu.indexOf(',') == -1 ? [fs_baijiu] : fs_baijiu.split(',')
        fs_edible_oil = fs_edible_oil.indexOf(',') == -1 ? [fs_edible_oil] : fs_edible_oil.split(',')
        fs_drinks = fs_drinks.indexOf(',') == -1 ? [fs_drinks] : fs_drinks.split(',')
        if(fs_pork.length == 2){
          this.setData({
            checked1: true,
            checked11: true,
            val1: fs_pork
          })
        }else if (fs_pork[0] == "市场购买") {
          this.setData({
            checked1: true,
            val1: [fs_pork[0]]
          })
        } else if (fs_pork[0] == "自家喂养"){
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
        if(fs_vegetables.length == 2){
          this.setData({
            checked3: true,
            checked33: true,
            val3: fs_vegetables
          })
        }else if (fs_vegetables[0] == "市场购买") {
          this.setData({
            checked3: true,
            val3: [fs_vegetables[0]]
          })
        } else if (fs_vegetables[0] == "自家种植"){
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

        if(fs_baijiu.length == 2){
          this.setData({
            checked5: true,
            checked55: true,
            val5: fs_baijiu
          })
        }else if (fs_baijiu[0] == "瓶装") {
          this.setData({
            checked5: true,
            val5: [fs_baijiu[0]]
          })
        } else if (fs_baijiu[0] == "散装"){
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
        } else if(fs_baijiu_inspection_certificate == "无"){
          this.setData({
            checked66: true,
            val6: fs_baijiu_inspection_certificate
          })
        } else{
          this.setData({
            checked666: true,
            val6: fs_baijiu_inspection_certificate
          })
        }

        if(fs_edible_oil.length == 2){
          this.setData({
            checked7: true,
            checked77: true,
            val7: fs_edible_oil
          })
        }else if (fs_edible_oil[0] == "瓶装") {
          this.setData({
            checked7: true,
            val7: [fs_edible_oil[0]]
          })
        } else if (fs_edible_oil[0] == "散装"){
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
        }else{
          this.setData({
            checked888: true,
            val8: fs_edible_oil_inspection_certificate
          })
        }

        if(fs_drinks.length == 2){
          this.setData({
            checked9: true,
            checked99: true,
            val9: fs_drinks
          })
        }else if (fs_drinks[0] == "外购") {
          this.setData({
            checked9: true,
            val9: [fs_drinks[0]]
          })
        } else if (fs_drinks[0] == "自制"){
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
        }else{
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
    },
    detached() {

    },
  }
})