// components/admin_approval/index.js
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
    domain: app.domain + "/img/chef/",
    topss1: "topss",
    topss2: "",
    isShow: 1,
    rowssss: ["", "rewssss1", "rewssss2", "rewssss3"],
    types: [],
    typesValue: "全部",
    types_show: false,
    matsuri_type: 0,

    timeValue1: "开始时间",
    timeValue2: "结束时间",
    timeValue1s: "",
    timeValue2s: "",
    approved: [],
    pending: [],
    isPass: ["", "已通过", "未通过","已取消"],
    m_id: 0,
    page:1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    taggle(e) {
      var item = e.currentTarget.dataset.item
      if (item == 1) {
        this.setData({
          topss1: "topss",
          topss2: "",
          isShow: 1,
          page:1
        })
      } else if (item == 2) {
        wx.showLoading({
          title: '加载中',
        })
        var that = this
        this.setData({
          topss1: "",
          topss2: "topss",
          isShow: 2,
          page:1
        })
        this.requestData(1,1,this.data.matsuri_type,'','',function(data){
          that.setData({
            approved: data
          })
          wx.hideLoading()
        }) 
      }
    },
    unfold() {
      this.setData({
        types_show: !this.data.types_show
      })
    },
    choose(e) {
      var index = e.currentTarget.dataset.index
      this.setData({
        typesValue: this.data.types[index].mt_name,
        types_show: false,
        matsuri_type: index
      })
      var that = this
      this.requestData(1,1,this.data.matsuri_type,this.data.timeValue1s=="开始时间"?'':this.data.timeValue1s,this.data.timeValue2s=="结束时间"?'':this.data.timeValue2s,function(data){
        that.setData({
          approved: data
        })
      }) 
    },
    close() {
      this.setData({
        types_show: false,
      })
    },
    bindDateChange(e) {
      var index = e.currentTarget.dataset.index
      if (index == 1) {
        this.setData({
          timeValue1: e.detail.value,
          timeValue1s: e.detail.value
        })
        if (this.data.timeValue1 != "开始时间" && this.data.timeValue2 != "结束时间") {
          var that = this
          this.requestData(1,1,this.data.matsuri_type,this.data.timeValue1s,this.data.timeValue2s,function(data){
            that.setData({
              approved: data
            })
          }) 
        }
      } else if (index == 2) {
        this.setData({
          timeValue2: e.detail.value,
          timeValue2s: e.detail.value
        })
        if (this.data.timeValue1 != "开始时间" && this.data.timeValue2 != "结束时间") {
          var that = this
          this.requestData(1,1,this.data.matsuri_type,this.data.timeValue1s,this.data.timeValue2s,function(data){
            that.setData({
              approved: data
            })
          }) 
        }
      }
    },
    requestData(page,type,matsuri,start_date='',end_date='',callback) {
      try {
        app.post('/manage/matsuriList', {
          m_token: wx.getStorageSync('admin').m_token,
          page: page,
          type: type,
          matsuri_type: matsuri,
          start_date: start_date,
          end_date: end_date
        }).then(res => {
          if (res.data.status == 1) {
            callback(res.data.data.data)
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
    lower(e) {
      var item = e.currentTarget.dataset.item
      var that = this
      if(item == 1){
        this.setData({
          page: this.data.page + 1
        })
        this.requestData(this.data.page,0,0,'','',function(data){
          wx.showLoading({
            title: '加载中',
          })
          setTimeout(function () {
            wx.hideLoading()
            if(data.length == 0){
              wx.showToast({
                title: '没有了~',
                icon: 'error',
                duration: 1000 //持续的时间
              })
            }else{
              wx.showToast({
                title: '加载成功',
                icon: 'success',
                duration: 1000 //持续的时间
              })
            }
            that.setData({
              pending: that.data.pending.concat(data)
            })
          }, 1000)
        })
      }else if(item == 2){
        this.setData({
          page: this.data.page + 1
        })
        this.requestData(this.data.page,1,this.data.matsuri_type,this.data.timeValue1s=="开始时间"?'':this.data.timeValue1s,this.data.timeValue2s=="结束时间"?'':this.data.timeValue2s,function(data){
          wx.showLoading({
            title: '加载中',
          })
          setTimeout(function () {
            wx.hideLoading()
            if(data.length == 0){
              wx.showToast({
                title: '没有了~',
                icon: 'error',
                duration: 1000 //持续的时间
              })
            }else{
              wx.showToast({
                title: '加载成功',
                icon: 'success',
                duration: 1000 //持续的时间
              })
            }
            that.setData({
              approved: that.data.approved.concat(data)
            })
          }, 1000)
        })
      }
    },
    aaa(){
      var that = this
      this.requestData(1,0,0,'','',function(data){
        setTimeout(()=>{
          wx.hideLoading()
        })
        if(data.length!=0){
          that.setData({
            pending:data
          })
        }else{
          wx.showToast({
            title: '没有了~',
            icon: 'error',
            duration: 1000 //持续的时间
          })
        }
      })
    }
  },
  lifetimes: {
    attached: function () {
      wx.showLoading({
        title: '加载中',
      })
      wx.getStorageSync('types').push({
        mt_id: 0,
        mt_name: "全部"
      })
      var types = wx.getStorageSync('types')
      types.unshift(
        {mt_id: 0, mt_name: "全部"}
      )
      this.setData({
        types:types
      })
      this.aaa()
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})