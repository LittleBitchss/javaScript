// secondary/pages/user_orderPay/index.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: app.domain + "/img/report/",
    active:"",
    theDeposit:0.01,
    insurance:0,
    type:1,
    m_id: 0,
    flag:0,
    whereDoes:0
  },
  checkboxChange(e){
    if(e.detail.value.length){
      this.setData({
        active:"user_orderPay_bottom_btns"
      })
    }else{ 
      this.setData({
        active:""
      })
    }
  },
  pay(){
    //下订单并唤起微信支付
    var price = this.data.theDeposit+this.data.insurance||'0.01'; //支付金额
    var openid = wx.getStorageSync('userInfo').openid; //这里传用户openid,怎么获取用户的openid这里就不详细的说了
    var that = this;
    var obj = {
      token:wx.getStorageSync('userInfo').token,
      openid: openid,
      m_id: that.data.m_id,
      title:this.data.type==1?"乡宴押金":"家宴押金",
      mi_id:0,
      chef_id:0,
      type: this.data.type==1?1:3,
      total_price: price
    }
    app.post('/appletpay/addOrder',obj).then(res => {
      if (res.statusCode == 200) {
        //客户单发起微信请求
        wx.requestPayment({
          'appId': 'wx5484c680eaccf84e',
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              flag:1
            })
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/findChef/index'
              })
            }, 1000);
          },
          'fail': function (res) {
            if (res.errMsg == "requestPayment:fail cancel") {
              wx.showToast({
                title: '支付取消',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: '支付失败',
                icon: 'error',
                duration: 1000
              })
            }
          },
          'complete': function (res) {
            
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '支付定金'
    })
    this.setData({
      m_id: options.m_id,
      // insurance: (options.m_insurance_count=='undefined'||options.m_insurance_count==undefined)?0:Number(options.m_insurance_count.slice(0,2)),
      insurance: (options.m_insurance_count=='undefined'||options.m_insurance_count==undefined)?0:0,
      type: options.type,
      whereDoes:options.whereDoes?options.whereDoes:0
    })
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
    if(this.data.flag==0&&this.data.whereDoes==1){
      let pages = getCurrentPages(); // 当前页面
      let beforePage = pages[pages.length - 2]; //前一个页面
      beforePage.goUserOrder();
    }
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