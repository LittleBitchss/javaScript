// components/user_orderHealth/user_orderHealth.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    sanitary:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    checked1: "",
    checked11: "",
    checked111: "",
    checked11111: "",
    checked2: "",
    checked22: "",
    checked222: "",
    checked2222: "",
    checked22222: "",
    checked3: "",
    checked33: "",
    checked333: "",
    checked3333: "",
    checked33333: "",
    checked333333: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    attached() {
      if (this.data.sanitary) {
        this.data.sanitary.sc_water_source.split('，').forEach(i => {
          if (i == "自来水") {
            this.setData({
              checked1: true,
            })
          } else if (i == "井水") {
            this.setData({
              checked11: true,
            })
          } else if (i == "荷塘水") {
            this.setData({
              checked111: true,
            })
          } else if (i == "其他") {
            this.setData({
              checked1111: true,
            })
          }
        })
        this.data.sanitary.sc_disinfection_method.split('，').forEach(i => {
          if (i == "消毒柜") {
            this.setData({
              checked2: true,
            })
          } else if (i == "煮沸消毒") {
            this.setData({
              checked22: true,
            })
          } else if (i == "药物消毒") {
            this.setData({
              checked222: true,
            })
          } else if (i == "其他") {
            this.setData({
              checked2222: true,
            })
          } else if (i == "未消毒") {
            this.setData({
              checked22222: true,
            })
          }
        })
        this.data.sanitary.sc_toxic_harmful.split('，').forEach(i => {
          if (i == "磷化锌") {
            this.setData({
              checked3: true,
            })
          } else if (i == "磷化铝") {
            this.setData({
              checked33: true,
            })
          } else if (i == "亚硝酸盐") {
            this.setData({
              checked333: true,
            })
          } else if (i == "剧毒农药") {
            this.setData({
              checked3333: true,
            })
          } else if (i == "醇基燃料") {
            this.setData({
              checked33333: true,
            })
          } else if (i == "家中不存在有害物质") {
            this.setData({
              checked333333: true,
            })
          }
        })
      }
    },
    detached() {

    },
  }
})