// components/user_orderFood/user_orderFood.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodsources:Object
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
    checked1414: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      if (this.data.foodsources) {
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
        } = this.data.foodsources
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
