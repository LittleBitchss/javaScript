// components/banquetWedd_featured/banquetWedd_featured.js
var startX, endX;
var moveFlagX = true; // 判断执行滑动事件
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
    animas: "",
    active1: "active",
    active2: "",
    active3: "",
    // 筛选模块数据
    down1: "../../icon/down.png",
    down2: "../../icon/down.png",
    down3: "../../icon/down.png",
    upAndDown1: "downs",
    upAndDown2: "downs",
    upAndDown3: "downs",
    telescopic1: "",
    telescopic2: "",
    telescopic3: "",
    sorts: [{
        cont: "全区",
        color: "",
        flag: 0
      },
      {
        cont: "500m",
        color: "",
        flag: 0
      },
      {
        cont: "1km",
        color: "",
        flag: 0
      },
      {
        cont: "3km",
        color: "",
        flag: 0
      },
      {
        cont: "5km",
        color: "",
        flag: 0
      },
      {
        cont: "10km",
        color: "",
        flag: 0
      }
    ],
    sortValue: "综合排序",
    sort_show: false,
    fontColor1: "",
    score: [{
        cont: "不限",
        active: "",
        flag: 0
      },
      {
        cont: "浙菜",
        active: "",
        flag: 0
      },
      {
        cont: "鲁菜",
        active: "",
        flag: 0
      },
      {
        cont: "川菜",
        active: "",
        flag: 0
      },
      {
        cont: "湘菜",
        active: "",
        flag: 0
      },
      {
        cont: "闽菜",
        active: "",
        flag: 0
      },
      {
        cont: "苏菜",
        active: "",
        flag: 0
      },
      {
        cont: "徽菜",
        active: "",
        flag: 0
      },
      {
        cont: "粤菜",
        active: "",
        flag: 0
      }
    ],
    scores:[],
    scoreValue: "综合评分",
    score_show: false,
    fontColor2: "",
    classify: [{
        cont: "不限",
        code: '1',
        color: "",
        flag: 0
      },
      {
        cont: "初级(国家职业资格五级)",
        code: '1',
        color: "",
        flag: 0
      },
      {
        cont: "中级(国家职业资格四级)",
        code: '2',
        color: "",
        flag: 0
      },
      {
        cont: "高级(国家职业资格三级)",
        code: '3',
        color: "",
        flag: 0
      },
      {
        cont: "技师(国家职业资格二级)",
        code: '4',
        color: "",
        flag: 0
      },
      {
        cont: "高级技师(国家职业资格一级)",
        code: '5',
        color: "",
        flag: 0
      }
    ],
    classifyValue: "分类",
    classify_show: false,
    fontColor3: "",
    arr:[1,2,3,4,5,6,7,8,9],
    isShow:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 触摸开始事件
    touchStart: function (e) {
      startX = e.touches[0].pageX; // 获取触摸时的原点
      moveFlagX = true;
    },
    // 触摸移动事件
    touchMove: function (e) {
      endX = e.touches[0].pageX; // 获取触摸时的原点
      if (moveFlagX) {
        if (endX - startX > 50) {
          moveFlagX = false;
          if (this.data.animas == "middleToRight") {
            this.setData({
              animas: "rightToMiddle",
              active1: "",
              active2: "active",
              active3: ""
            })
          } else if (this.data.animas == "rightToMiddle") {
            this.setData({
              animas: "middleToLeft",
              active1: "active",
              active2: "",
              active3: ""
            })
          } else if (this.data.animas == "leftToMiddle") {
            this.setData({
              animas: "middleToLeft",
              active1: "active",
              active2: "",
              active3: ""
            })
          }
        }
        // 向左
        if (startX - endX > 50) {
          moveFlagX = false;
          if (this.data.animas == "" || this.data.animas == "middleToLeft") {
            this.setData({
              animas: "leftToMiddle",
              active1: "",
              active2: "active",
              active3: ""
            })
          } else if (this.data.animas == "leftToMiddle") {
            this.setData({
              animas: "middleToRight",
              active1: "",
              active2: "",
              active3: "active"
            })
          } else if (this.data.animas == "rightToMiddle") {
            this.setData({
              animas: "middleToRight",
              active1: "",
              active2: "",
              active3: "active"
            })
          }
        }
      }
    },
    // 触摸结束事件
    touchEnd: function () {
      moveFlagX = true; // 回复滑动事件
    },
    unfold(e) {
      var item = e.currentTarget.dataset.item
      if (item == 1) {
        if (this.data.sort_show) {
          this.setData({
            down1: "../../icon/down.png",
            fontColor1: "",
            upAndDown1: "downs",
            telescopic1: "shrink"
          })
          setTimeout(() => {
            this.setData({
              sort_show: false,
              selectHeight: 50,
            })
          }, 300)
          return
        }
        this.setData({
          down1: "../../icon/down_active.png",
          down2: "../../icon/down.png",
          down3: "../../icon/down.png",
          fontColor1: "fontColor",
          fontColor2: "",
          fontColor3: "",
          upAndDown1: "up",
          upAndDown2: "downs",
          upAndDown3: "downs",
          telescopic1: "stretch",
          score_show: false,
          classify_show: false,
        })
        setTimeout(() => {
          this.setData({
            sort_show: true,
            selectHeight: "",
          })
        }, 200)
      } else if (item == 2) {
        if (this.data.score_show) {
          this.setData({
            down2: "../../icon/down.png",
            fontColor2: "",
            upAndDown2: "downs",
            telescopic2: "shrink"
          })
          setTimeout(() => {
            this.setData({
              score_show: false,
              selectHeight: 50,
              score: this.data.scores
            })
          }, 300)
          return
        }
        this.setData({
          down1: "../../icon/down.png",
          down2: "../../icon/down_active.png",
          down3: "../../icon/down.png",
          fontColor1: "",
          fontColor2: "fontColor",
          fontColor3: "",
          upAndDown1: "downs",
          upAndDown2: "up",
          upAndDown3: "downs",
          telescopic2: "stretch",
          sort_show: false,
          classify_show: false,
        })
        setTimeout(() => {
          this.setData({
            score_show: true,
            selectHeight: "",
          })
        }, 200)
      } else if (item == 3) {
        if (this.data.classify_show) {
          this.setData({
            down3: "../../icon/down.png",
            fontColor3: "",
            upAndDown3: "downs",
            telescopic3: "shrink"
          })
          setTimeout(() => {
            this.setData({
              classify_show: false,
              selectHeight: 50,
            })
          }, 300)
          return
        }
        this.setData({
          down1: "../../icon/down.png",
          down2: "../../icon/down.png",
          down3: "../../icon/down_active.png",
          fontColor1: "",
          fontColor2: "",
          fontColor3: "fontColor",
          upAndDown3: "up",
          upAndDown1: "downs",
          upAndDown2: "downs",
          telescopic3: "stretch",
          sort_show: false,
          score_show: false,
        })
        setTimeout(() => {
          this.setData({
            classify_show: true,
            selectHeight: "",
          })
        }, 200)
      }
    },
    choose(e) {
      var item = e.currentTarget.dataset.item
      var index = e.currentTarget.dataset.index
      if (item == 1) {
        var sorts = JSON.parse(JSON.stringify(this.data.sorts))
        sorts.forEach(i => {
          i.flag = 0
          i.color = ""
        })
        sorts[index].flag = 1
        sorts[index].color = "fontColor"
        this.setData({
          down1: "../../icon/down.png",
          fontColor1: "",
          upAndDown1: "downs",
          telescopic1: "shrink",
          sortValue: this.data.sorts[index].cont == "全区" ? "距离我" : this.data.sorts[index].cont,
          sorts: sorts
        })
        setTimeout(() => {
          this.setData({
            sort_show: false,
            selectHeight: 50,
          })
        }, 300)
      } else if (item == 2) {
        var score = JSON.parse(JSON.stringify(this.data.score))
        if (index == 0) {
          if (score[0].flag == 1) {
            score[0].flag = 0
            score[0].active = ""
          } else if (score[0].flag == 0) {
            score.forEach(i => {
              i.flag = 0
              i.active = ""
            })
            score[0].flag = 1
            score[0].active = "active"
          }
        } else {
          score[0].flag = 0
          score[0].active = ""
          if (score[index].flag == 0) {
            score[index].flag = 1
            score[index].active = "active"
          } else {
            score[index].flag = 0
            score[index].active = ""
          }
        }
        this.setData({
          score: score
        })
      } else if (item == 3) {
        var classify = JSON.parse(JSON.stringify(this.data.classify))
        classify.forEach(i => {
          i.flag = 0
          i.color = ""
        })
        classify[index].flag = 1
        classify[index].color = "fontColor"
        this.setData({
          down3: "../../icon/down.png",
          fontColor3: "",
          upAndDown3: "downs",
          telescopic3: "shrink",
          classifyValue: this.data.classify[index].cont == "不限" ? "厨师等级" : this.data.classify[index].cont,
          classify: classify
        })
        setTimeout(() => {
          this.setData({
            classify_show: false,
            selectHeight: 50,
          })
        }, 300)
      }
    },
    finish() {
      var value = ""
      var score = this.data.score.filter(i => i.flag == 1)
      if (score.length == 0 || score[0].cont == "不限") {
        value = "擅长菜系"
      } else {
        score.forEach(i => {
          if (i.flag == 1) {
            value += i.cont + ","
          }
        })
        value = value.substring(0, value.lastIndexOf(','));
      }
      this.setData({
        down2: "../../icon/down.png",
        fontColor2: "",
        upAndDown2: "downs",
        telescopic2: "shrink",
        scoreValue: value,
        scores: this.data.score
      })
      wx.setStorageSync('score', this.data.score)
      setTimeout(() => {
        this.setData({
          score_show: false,
          selectHeight: 50,
        })
      }, 300)
    },
    close() {
      this.setData({
        down1: "../../icon/down.png",
        fontColor1: "",
        upAndDown1: "downs",
        telescopic1: "shrink",
        down2: "../../icon/down.png",
        fontColor2: "",
        upAndDown2: "downs",
        telescopic2: "shrink",
        down3: "../../icon/down.png",
        fontColor3: "",
        upAndDown3: "downs",
        telescopic3: "shrink"
      })
      setTimeout(() => {
        this.setData({
          sort_show: false,
          score_show: false,
          classify_show: false,
          selectHeight: 50,
          score: this.data.scores
        })
      }, 300)
    },
    scroll(e){
      if(e.detail.scrollTop*2>384){
        this.setData({
          isShow:true
        })
      }else{
        this.setData({
          isShow:""
        })
      }
    }
  }
})