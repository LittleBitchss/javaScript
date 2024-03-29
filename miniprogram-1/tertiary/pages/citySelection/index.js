// tertiary/pages/citySelection/index.js
var city = require('../../../utils/city');
Page({
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    // tHeight: 0,
    // bHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0, //置顶高度
    scrollTopId: '', //置顶id
    city: "",
    hotcityList: [{
      cityCode: 110100,
      city: '北京市'
    }, {
      cityCode: 310100,
      city: '上海市'
    }, {
      cityCode: 440100,
      city: '广州市'
    }, {
      cityCode: 440300,
      city: '深圳市'
    }, {
      cityCode: 330100,
      city: '杭州市'
    }, {
      cityCode: 320100,
      city: '南京市'
    }, {
      cityCode: 420100,
      city: '武汉市'
    }, {
      cityCode: 410100,
      city: '郑州市'
    }, {
      cityCode: 120100,
      city: '天津市'
    }, {
      cityCode: 610100,
      city: '西安市'
    }, {
      cityCode: 510100,
      city: '成都市'
    }, {
      cityCode: 500000,
      city: '重庆市'
    }],
    flag:0,
    ret:0
  },
  onLoad: function (e) {
    console.log(e);
    // 生命周期函数--监听页面加载
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight;
    var itemH = winHeight / searchLetter.length;
    var tempObj = [];
    for (var i = 0; i < searchLetter.length; i++) {
      var temp = {};
      temp.name = searchLetter[i];
      temp.tHeight = i * itemH;
      temp.bHeight = (i + 1) * itemH;
      tempObj.push(temp)
    }
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: tempObj,
      cityList: cityList,
      flag:e.flag,
      ret:e.ret
    })
    console.log(cityList);
    cityList.forEach(i=>{
      i.cityInfo.find(j=>{
        if(e.citycode==j.code){
          this.setData({
            city:j.city
          })
        }
      })
    })
    wx.setNavigationBarTitle({
      title: '选择城市',
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  clickLetter: function (e) {
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    var city = e.currentTarget.dataset.city
    var citycode = e.currentTarget.dataset.citycode
    this.setData({
      city: city
    })
    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if(this.data.ret){
      console.log(this.data.citys);
      prevPage.setData({
        citys:[this.data.city.slice(0,this.data.city.length-1),this.data.citycode]
      })
    }else{
      if(this.data.flag){
        var cityss = city.slice(0,city.length-1)
        prevPage.setData({
          citys: city,
          cityss:cityss,
          citycode: citycode,
        })
        prevPage.setTitles(cityss)
        prevPage.remove()
        prevPage.ensure()
      }else{
        prevPage.setData({
          city: city,
          citycode: citycode,
        })
      }
    }
    wx.navigateBack({
      delta: 1
    })
  },
  //选择热门城市
  bindHotCity: function (e) {
    var city = e.currentTarget.dataset.city
    var citycode = e.currentTarget.dataset.citycode
    this.setData({
      city: city
    })
    var pages = getCurrentPages(); //  获取页面栈
    var prevPage = pages[pages.length - 2]; // 上一个页面
    if(this.data.ret){
      prevPage.setData({
        citys:[this.data.city.slice(0,this.data.city.length-1),this.data.citycode]
      })
    }else{
      if(this.data.flag){
        var cityss = city.slice(0,city.length-1)
        console.log(cityss);
        prevPage.setData({
          citys: city,
          cityss:cityss,
          citycode: citycode,
        })
        prevPage.setTitles(cityss)
        prevPage.remove()
        prevPage.ensure()
      }else{
        prevPage.setData({
          city: city,
          citycode: citycode,
        })
      }
    }
    wx.navigateBack({
      delta: 1
    })
  }
})