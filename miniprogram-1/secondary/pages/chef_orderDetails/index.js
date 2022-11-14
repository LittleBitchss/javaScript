// secondary/pages/orderDetails/index.js
const app = getApp()
var QQMapWX = require('../../../utils/js/qqmap-wx-jssdk.min');
const qqMapSdk = new QQMapWX({
  key: 'ABNBZ-GKPLS-FOAOJ-6HOP3-GAWZO-NNFDH'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain+"/img/chefs/",
    m_id: "",
    m_chef_id: "",
    latitude: "",
    longitude: "",
    m_address: "",
    m_banquet_number: "",
    m_holding_days: "",
    m_latitude: "",
    m_longitude: "",
    m_phone: "",
    m_phones: "",
    m_start_date: "",
    mt_name: "",
    mi_accept_invitation:"",
    m_matsuri_type:"",
    m_meal_time:"",
    m_remark:""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    setTimeout(()=>{
      wx.showLoading({
        title: '加载中',
      })
    })
    var that = this
    wx.setNavigationBarTitle({
      title: '宴会详情',
    })
    this.setData({
      m_banquet_number: options.m_banquet_number,
      m_holding_days: options.m_holding_days,
      m_phone: options.m_phone.substr(0, 3) + '****' + options.m_phone.toString().substr(7, 11),
      m_phones: options.m_phone,
      m_start_date: options.m_start_date,
      mt_name: options.mt_name,
      latitude: options.m_latitude,
      longitude: options.m_longitude,
      m_id: options.m_id,
      mi_id: options.mi_id,
      mi_accept_invitation: options.mi_accept_invitation,
      m_matsuri_type: options.m_matsuri_type,
      m_meal_time: options.m_meal_time,
      m_remark: options.m_remark
    })
    qqMapSdk.reverseGeocoder({//地址解析
      location: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      success: function (res) {
        //获得地址
        if(options.m_matsuri_type==1&&options.a_name){
          that.setData({
            m_address: res.result.address+'（'+options.a_name+'）'
          })
        }else{
          that.setData({
            m_address: res.result.address
          })
        }
      },
    });
    setTimeout(()=>{
      wx.hideLoading()
    },1000)
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